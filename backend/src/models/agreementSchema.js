import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema(
  {
    // =====================================================
    // References
    // =====================================================

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =====================================================
    // Job Snapshot
    // =====================================================

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    jobCategory: {
      type: String,
      required: true,
    },

    jobLocation: {
      type: String,
      default: "",
    },

    // =====================================================
    // Accepted Offer Snapshot
    // =====================================================

    agreedBudget: {
      type: Number,
      required: true,
    },

    estimatedDays: {
      type: Number,
      required: true,
    },

    proposalText: {
      type: String,
      required: true,
    },

    // =====================================================
    // Agreement Status
    // =====================================================

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
      default: "ACTIVE",
    },

    // =====================================================
    // Completion Workflow
    // =====================================================

    workerCompleted: {
      type: Boolean,
      default: false,
    },

    workerCompletedAt: {
      type: Date,
      default: null,
    },

    clientCompleted: {
      type: Boolean,
      default: false,
    },

    clientCompletedAt: {
      type: Date,
      default: null,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Agreement = mongoose.model("Agreement", agreementSchema);

export default Agreement;
