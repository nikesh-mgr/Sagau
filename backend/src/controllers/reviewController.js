import Review from "../models/reviewSchema.js";
import Agreement from "../models/agreementSchema.js";
import Worker from "../models/workerSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/* ==========================================================
   CREATE REVIEW
========================================================== */

export const createReview = asyncHandler(async (req, res) => {
  const { agreementId } = req.params;
  const { rating, comment } = req.body;

  const agreement = await Agreement.findById(agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  if (agreement.status !== "COMPLETED") {
    throw new ApiError(
      400,
      "Reviews can only be submitted after the agreement is completed",
    );
  }

  const isClient = agreement.client.toString() === req.user._id.toString();

  const isWorker = agreement.worker.toString() === req.user._id.toString();

  if (!isClient && !isWorker) {
    throw new ApiError(403, "Unauthorized");
  }

  const alreadyReviewed = await Review.findOne({
    agreement: agreementId,
    reviewer: req.user._id,
  });

  if (alreadyReviewed) {
    throw new ApiError(409, "You have already reviewed this agreement");
  }

  const reviewee = isClient ? agreement.worker : agreement.client;

  const review = await Review.create({
    agreement: agreementId,
    reviewer: req.user._id,
    reviewee,
    rating,
    comment,
  });

  /*
  ==========================================================
      UPDATE WORKER REPUTATION
  ==========================================================
  */

  const worker = await Worker.findOne({
    user: reviewee,
  });

  if (worker) {
    const reviews = await Review.find({
      reviewee,
    });

    const totalReviews = reviews.length;

    const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);

    const averageRating =
      totalReviews === 0 ? 0 : Number((totalRating / totalReviews).toFixed(1));

    worker.rating = averageRating;

    worker.totalReviews = totalReviews;

    worker.reputationScore = Number((averageRating * totalReviews).toFixed(1));

    await worker.save();
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Review submitted successfully", review));
});

/* ==========================================================
   GET WORKER REVIEWS
========================================================== */

export const getWorkerReviews = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.workerId);

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  const reviews = await Review.find({
    reviewee: worker.user,
  })
    .populate("reviewer", "fullName role")
    .sort({
      createdAt: -1,
    });

  return res.status(200).json(
    new ApiResponse(200, "Worker reviews fetched successfully", {
      averageRating: worker.rating,
      totalReviews: worker.totalReviews,
      reputationScore: worker.reputationScore,
      reviews,
    }),
  );
});

/* ==========================================================
   GET CLIENT REVIEWS
========================================================== */

export const getClientReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    reviewee: req.params.clientId,
  })
    .populate("reviewer", "fullName role")
    .sort({
      createdAt: -1,
    });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1),
        );

  return res.status(200).json(
    new ApiResponse(200, "Client reviews fetched successfully", {
      averageRating,
      totalReviews,
      reviews,
    }),
  );
});
