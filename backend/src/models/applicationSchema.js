import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // JOB REFERENCE
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // WORKER REFERENCE
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // BID AMOUNT
    bidAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    // PROPOSAL MESSAGE
    proposalText: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },

    // DELIVERY ESTIMATION
    estimatedDays: {
      type: Number,
      required: true,
      min: 1,
    },

    // APPLICATION STATUS
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

// PREVENT DUPLICATE APPLICATIONS
applicationSchema.index(
  {
    job: 1,
    worker: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Application", applicationSchema);
