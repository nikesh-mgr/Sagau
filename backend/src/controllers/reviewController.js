import Review from "../models/reviewSchema.js";
import Agreement from "../models/agreementSchema.js";
import User from "../models/userSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// CREATE REVIEW
export const createReview = asyncHandler(async (req, res) => {
  const { agreementId } = req.params;

  const { rating, comment } = req.body;

  // FIND AGREEMENT
  const agreement = await Agreement.findById(agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  // AGREEMENT MUST BE COMPLETED
  if (agreement.status !== "COMPLETED") {
    throw new ApiError(400, "Review allowed only after agreement completion");
  }

  // ONLY PARTICIPANTS CAN REVIEW
  const isParticipant =
    agreement.client.toString() === req.user._id.toString() ||
    agreement.worker.toString() === req.user._id.toString();

  if (!isParticipant) {
    throw new ApiError(403, "Unauthorized access");
  }

  // PREVENT DUPLICATE REVIEW
  const alreadyReviewed = await Review.findOne({
    agreement: agreementId,
    reviewer: req.user._id,
  });

  if (alreadyReviewed) {
    throw new ApiError(409, "You already reviewed this agreement");
  }

  // DETERMINE REVIEW TARGET
  let reviewee;

  if (req.user._id.toString() === agreement.client.toString()) {
    reviewee = agreement.worker;
  } else {
    reviewee = agreement.client;
  }

  // CREATE REVIEW
  const review = await Review.create({
    agreement: agreementId,
    reviewer: req.user._id,
    reviewee,
    rating,
    comment,
  });

  // UPDATE USER RATING
  const reviews = await Review.find({
    reviewee,
  });

  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  await User.findByIdAndUpdate(reviewee, {
    rating: avgRating.toFixed(1),
    totalReviews: reviews.length,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Review submitted successfully", review));
});

// GET WORKER REVIEWS
export const getWorkerReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    reviewee: req.params.workerId,
  })
    .populate("reviewer", "fullName role")
    .sort({
      createdAt: -1,
    });

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  res.status(200).json(
    new ApiResponse(200, "Worker reviews fetched successfully", {
      totalReviews: reviews.length,
      averageRating: avgRating,
      reviews,
    }),
  );
});

// GET CLIENT REVIEWS
export const getClientReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    reviewee: req.params.clientId,
  })
    .populate("reviewer", "fullName role")
    .sort({
      createdAt: -1,
    });

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  res.status(200).json(
    new ApiResponse(200, "Client reviews fetched successfully", {
      totalReviews: reviews.length,
      averageRating: avgRating,
      reviews,
    }),
  );
});
