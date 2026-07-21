import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    agreement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
      required: true,
    },

    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate reviews for the same agreement
reviewSchema.index(
  {
    agreement: 1,
    reviewer: 1,
  },
  {
    unique: true,
  },
);

// Optimize review lookup by reviewee
reviewSchema.index({
  reviewee: 1,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
