import mongoose from "mongoose";

import Application from "../models/applicationSchema.js";
import Job from "../models/jobSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// APPLY TO JOB
export const applyToJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const { bidAmount, proposalText, estimatedDays } = req.body;

  // VALID OBJECT ID
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // FIND JOB
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // ONLY OPEN JOBS
  if (job.status !== "OPEN") {
    throw new ApiError(400, "Applications closed for this job");
  }

  // WORKER CANNOT APPLY OWN JOB
  if (job.client.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot apply to your own job");
  }

  // CHECK DUPLICATE APPLICATION
  const alreadyApplied = await Application.findOne({
    job: jobId,
    worker: req.user._id,
  });

  if (alreadyApplied) {
    throw new ApiError(409, "You already applied to this job");
  }

  // CREATE APPLICATION
  const application = await Application.create({
    job: jobId,
    worker: req.user._id,
    bidAmount,
    proposalText,
    estimatedDays,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "Application submitted successfully", application),
    );
});

// GET MY APPLICATIONS
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    worker: req.user._id,
  })
    .populate({
      path: "job",
      select: "title description budget location status deadline",
    })
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(200, "Applications fetched successfully", applications),
    );
});

// GET APPLICATIONS FOR A JOB
export const getJobApplications = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // OWNER CHECK
  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only view your job applications");
  }

  const applications = await Application.find({
    job: jobId,
  })
    .populate("worker", "fullName email role rating")
    .sort({
      createdAt: -1,
    });

  res
    .status(200)
    .json(
      new ApiResponse(200, "Applications fetched successfully", applications),
    );
});

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;

  const { status } = req.body;

  // VALID STATUS
  const allowedStatuses = ["ACCEPTED", "REJECTED"];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid application status");
  }

  const application = await Application.findById(applicationId).populate("job");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // OWNER CHECK
  if (application.job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  // UPDATE APPLICATION
  application.status = status;

  await application.save();

  // AUTO ASSIGN WORKER
  if (status === "ACCEPTED") {
    // REJECT OTHER APPLICATIONS
    await Application.updateMany(
      {
        job: application.job._id,
        _id: {
          $ne: application._id,
        },
      },
      {
        status: "REJECTED",
      },
    );

    // UPDATE JOB
    await Job.findByIdAndUpdate(application.job._id, {
      status: "IN_PROGRESS",
      selectedWorker: application.worker,
    });

    // CREATE AGREEMENT
    await Agreement.create({
      job: application.job._id,
      client: application.job.client,
      worker: application.worker,
    });
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `Application ${status.toLowerCase()} successfully`,
        application,
      ),
    );
});
