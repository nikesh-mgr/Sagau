import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bidAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    proposalText: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },

    estimatedDays: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent a worker from applying to the same job more than once
applicationSchema.index(
  {
    job: 1,
    worker: 1,
  },
  {
    unique: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
