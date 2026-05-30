import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    hourlyRate: {
      type: Number,
      required: true,
      min: 1,
    },

    location: {
      type: String,
      required: true,
    },

    availability: {
      type: String,
      enum: ["Available", "Busy", "Not Available"],
      default: "Available",
    },

    portfolio: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    reputationScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Worker", workerSchema);
