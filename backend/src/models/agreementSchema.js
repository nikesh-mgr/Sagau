import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema(
  {
    // JOB REFERENCE
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // CLIENT
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // WORKER
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // AGREEMENT STATUS
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
      default: "ACTIVE",
    },

    // START DATE
    startedAt: {
      type: Date,
      default: Date.now,
    },

    // COMPLETION DATE
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Agreement", agreementSchema);
