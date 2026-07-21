import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    skillsRequired: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED", "EXPIRED"],
      default: "OPEN",
    },

    selectedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    expiresAt: {
      type: Date,
      default: function () {
        return this.deadline;
      },
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
