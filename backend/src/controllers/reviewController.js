import Review from "../models/reviewSchema.js";
import Agreement from "../models/agreementSchema.js";
import Worker from "../models/workerSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";

// Create a review
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
      "Reviews can only be submitted after agreement completion",
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
    agreement: agreement._id,

    reviewer: req.user._id,

    reviewee,

    rating,

    comment,
  });

  await createNotification({
    receiver: reviewee,

    sender: req.user._id,

    type: "NEW_REVIEW",

    message: "You received a new review",

    relatedId: review._id,
  });

  // Update worker rating only if worker received review

  if (isClient) {
    const worker = await Worker.findOne({
      user: agreement.worker,
    });

    if (worker) {
      const reviews = await Review.find({
        reviewee: agreement.worker,
      });

      const totalReviews = reviews.length;

      const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);

      const averageRating =
        totalReviews === 0
          ? 0
          : Number((totalRating / totalReviews).toFixed(1));

      worker.rating = averageRating;

      worker.totalReviews = totalReviews;

      worker.reputationScore = Number(
        (averageRating * totalReviews).toFixed(1),
      );

      await worker.save();
    }
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Review submitted successfully", review));
});

// Get reviews for a worker

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

  res.status(200).json(
    new ApiResponse(200, "Worker reviews fetched successfully", {
      averageRating: worker.rating,
      totalReviews: worker.totalReviews,
      reputationScore: worker.reputationScore,
      reviews,
    }),
  );
});

// Get reviews for a client

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
            reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews
          ).toFixed(1),
        );

  res.status(200).json(
    new ApiResponse(200, "Client reviews fetched successfully", {
      averageRating,
      totalReviews,
      reviews,
    }),
  );
});

// Get reviews of agreement

export const getAgreementReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    agreement: req.params.agreementId,

    reviewer: req.user._id,
  }).populate("reviewee", "fullName email");

  res
    .status(200)
    .json(new ApiResponse(200, "Agreement reviews fetched", reviews));
});

// FIXED: Get reviews created by logged in user
export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    reviewer: req.user._id,
  })
    .populate("reviewee", "fullName email role")
    .populate({
      path: "agreement",
      populate: {
        path: "job",
        select: "title budget",
      },
    })
    .sort({
      createdAt: -1,
    });

  const formattedReviews = await Promise.all(
    reviews.map(async (review) => {
      let revieweeProfile = null;

      // If reviewee is worker
      if (review.reviewee.role === "worker") {
        revieweeProfile = await Worker.findOne({
          user: review.reviewee._id,
        }).select("profileImage skills rating totalReviews location");
      }

      return {
        ...review.toObject(),

        revieweeProfile,
      };
    }),
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "My reviews fetched successfully", formattedReviews),
    );
});
