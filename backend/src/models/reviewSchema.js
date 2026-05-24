import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // AGREEMENT REFERENCE
    agreement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
      required: true,
    },

    // REVIEWER
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // REVIEW TARGET
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // STAR RATING
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // REVIEW COMMENT
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

// PREVENT DUPLICATE REVIEW
reviewSchema.index(
  {
    agreement: 1,
    reviewer: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Review", reviewSchema);
