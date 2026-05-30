import Review from "../models/reviewSchema.js";
import Agreement from "../models/agreementSchema.js";
import Worker from "../models/workerSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createReview = asyncHandler(async (req, res) => {
  const { agreementId } = req.params;

  const { rating, comment } = req.body;

  const agreement = await Agreement.findById(agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  if (agreement.status !== "COMPLETED") {
    throw new ApiError(400, "Review allowed only after agreement completion");
  }

  const isParticipant =
    agreement.client.toString() === req.user._id.toString() ||
    agreement.worker.toString() === req.user._id.toString();

  if (!isParticipant) {
    throw new ApiError(403, "Unauthorized access");
  }

  const existingReview = await Review.findOne({
    agreement: agreementId,
    reviewer: req.user._id,
  });

  if (existingReview) {
    throw new ApiError(409, "You already reviewed this agreement");
  }

  let reviewee;

  if (req.user._id.toString() === agreement.client.toString()) {
    reviewee = agreement.worker;
  } else {
    reviewee = agreement.client;
  }

  if (reviewee.toString() === req.user._id.toString()) {
    throw new ApiError(400, "Cannot review yourself");
  }

  const review = await Review.create({
    agreement: agreementId,
    reviewer: req.user._id,
    reviewee,
    rating,
    comment,
  });

  // UPDATE WORKER STATS ONLY

  const workerProfile = await Worker.findOne({
    user: reviewee,
  });

  if (workerProfile) {
    const reviews = await Review.find({
      reviewee,
    });

    const totalReviews = reviews.length;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    const averageRating =
      totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0;

    const reputationScore = averageRating * totalReviews;

    workerProfile.rating = averageRating;
    workerProfile.totalReviews = totalReviews;
    workerProfile.reputationScore = reputationScore;

    await workerProfile.save();
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Review submitted successfully", review));
});

export const getWorkerReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    reviewee: req.params.workerId,
  })
    .populate("reviewer", "fullName role")
    .sort({
      createdAt: -1,
    });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? Number(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1),
        )
      : 0;

  return res.status(200).json(
    new ApiResponse(200, "Worker reviews fetched successfully", {
      totalReviews,
      averageRating,
      reviews,
    }),
  );
});

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
    totalReviews > 0
      ? Number(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1),
        )
      : 0;

  return res.status(200).json(
    new ApiResponse(200, "Client reviews fetched successfully", {
      totalReviews,
      averageRating,
      reviews,
    }),
  );
});
