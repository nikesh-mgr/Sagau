import mongoose from "mongoose";

import Application from "../models/applicationSchema.js";
import Job from "../models/jobSchema.js";
import Worker from "../models/workerSchema.js";
import Agreement from "../models/agreementSchema.js";
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

  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  const applications = await Application.find({
    job: jobId,
  })
    .populate("worker", "fullName email")
    .sort({
      createdAt: -1,
    });

  const formattedApplications = await Promise.all(
    applications.map(async (application) => {
      const workerProfile = await Worker.findOne({
        user: application.worker._id,
      });

      return {
        ...application.toObject(),

        workerProfile,
      };
    }),
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Applications fetched successfully",
        formattedApplications,
      ),
    );
});
// UPDATE APPLICATION STATUS
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const normalizedStatus = status.toUpperCase();

  // VALID STATUS
  const allowedStatuses = ["ACCEPTED", "REJECTED"];

  if (!allowedStatuses.includes(normalizedStatus)) {
    throw new ApiError(400, "Invalid application status");
  }

  // FIND APPLICATION
  const application = await Application.findById(req.params.id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // FIND JOB SEPARATELY
  const job = await Job.findById(application.job);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // ONLY CLIENT CAN UPDATE
  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  // UPDATE APPLICATION
  application.status = normalizedStatus;

  await application.save();

  // IF ACCEPTED
  if (normalizedStatus === "ACCEPTED") {
    // REJECT OTHER APPLICATIONS
    await Application.updateMany(
      {
        job: job._id,
        _id: {
          $ne: application._id,
        },
      },
      {
        status: "REJECTED",
      },
    );

    // UPDATE JOB
    job.status = "IN_PROGRESS";

    job.selectedWorker = application.worker;

    await job.save();

    // PREVENT DUPLICATE AGREEMENT
    const existingAgreement = await Agreement.findOne({
      job: job._id,
    });

    if (!existingAgreement) {
      // CREATE AGREEMENT
      await Agreement.create({
        job: job._id,
        client: job.client,
        worker: application.worker,
      });
    }
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Application updated successfully", application),
    );
});
