import mongoose from "mongoose";

import Application from "../models/applicationSchema.js";
import Job from "../models/jobSchema.js";
import Worker from "../models/workerSchema.js";
import Agreement from "../models/agreementSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";
// Apply to a job
export const applyToJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { bidAmount, proposalText, estimatedDays } = req.body;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.status !== "OPEN") {
    throw new ApiError(400, "Applications closed for this job");
  }

  if (job.client.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot apply to your own job");
  }

  const alreadyApplied = await Application.findOne({
    job: jobId,
    worker: req.user._id,
  });

  if (alreadyApplied) {
    throw new ApiError(409, "You already applied to this job");
  }

  const application = await Application.create({
    job: jobId,
    worker: req.user._id,
    bidAmount,
    proposalText,
    estimatedDays,
  });
  await createNotification({
    receiver: job.client,

    sender: req.user._id,

    type: "APPLICATION_RECEIVED",

    message: `${req.user.fullName} applied for your job "${job.title}"`,

    relatedId: application._id,
  });
  res
    .status(201)
    .json(
      new ApiResponse(201, "Application submitted successfully", application),
    );
});

// Get logged-in worker's applications
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

// Get all applications for a job
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
    .sort({ createdAt: -1 });

  // Attach worker profile to each application
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

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Applications fetched successfully",
        formattedApplications,
      ),
    );
});

// Update application status
// Update application status
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const normalizedStatus = status.toUpperCase();

  if (!["ACCEPTED", "REJECTED"].includes(normalizedStatus)) {
    throw new ApiError(400, "Invalid application status");
  }

  // Find application
  const application = await Application.findById(req.params.id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // Find related job
  const job = await Job.findById(application.job);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Check ownership
  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this application",
    );
  }

  // Prevent duplicate action
  if (application.status !== "PENDING") {
    throw new ApiError(400, "Application already processed");
  }

  /*
  ==========================================
  REJECT APPLICATION
  ==========================================
  */

  if (normalizedStatus === "REJECTED") {
    application.status = "REJECTED";

    await application.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Application rejected successfully", application),
      );
  }

  /*
  ==========================================
  ACCEPT APPLICATION
  ==========================================
  */

  application.status = "ACCEPTED";

  await application.save();

  // Reject other applicants

  await Application.updateMany(
    {
      job: job._id,
      _id: {
        $ne: application._id,
      },
      status: "PENDING",
    },
    {
      $set: {
        status: "REJECTED",
      },
    },
  );

  // Update job

  job.status = "IN_PROGRESS";

  job.selectedWorker = application.worker;

  await job.save();

  /*
  ==========================================
  CREATE AGREEMENT
  ==========================================
  */

  let agreement = await Agreement.findOne({
    job: job._id,
    worker: application.worker,
  });

  if (!agreement) {
    agreement = await Agreement.create({
      /*
      REFERENCES
      */

      job: job._id,

      client: job.client,

      worker: application.worker,

      /*
      JOB SNAPSHOT
      REQUIRED BY AGREEMENT SCHEMA
      */

      jobTitle: job.title,

      jobDescription: job.description,

      jobCategory: job.category,

      /*
      AGREEMENT DETAILS
      */

      agreedBudget: application.bidAmount,

      proposalText: application.proposalText,

      estimatedDays: application.estimatedDays,

      status: "ACTIVE",

      workerCompleted: false,

      clientCompleted: false,
    });
  }

  /*
  ==========================================
  NOTIFICATIONS
  ==========================================
  */

  await createNotification({
    receiver: application.worker,

    sender: req.user._id,

    type: "APPLICATION_ACCEPTED",

    message: `Your proposal for "${job.title}" has been accepted.`,

    relatedId: job._id,
  });

  await createNotification({
    receiver: job.client,

    sender: application.worker,

    type: "AGREEMENT_CREATED",

    message: `Agreement created for "${job.title}".`,

    relatedId: agreement._id,
  });

  await createNotification({
    receiver: application.worker,

    sender: job.client,

    type: "AGREEMENT_CREATED",

    message: `Your agreement for "${job.title}" is ready.`,

    relatedId: agreement._id,
  });

  const updatedApplication = await Application.findById(application._id)
    .populate("worker", "fullName email")
    .populate("job", "title budget status");

  return res.status(200).json(
    new ApiResponse(200, "Application accepted successfully", {
      application: updatedApplication,

      agreement,
    }),
  );
});
// Get all applications for client's jobs
export const getClientApplications = asyncHandler(async (req, res) => {
  const clientJobs = await Job.find({
    client: req.user._id,
  }).select("_id");

  const jobIds = clientJobs.map((job) => job._id);

  const applications = await Application.find({
    job: {
      $in: jobIds,
    },
  })
    .populate("worker", "fullName email")
    .populate({
      path: "job",
      select: "title description budget location category status deadline",
    })
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

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Client applications fetched",
        formattedApplications,
      ),
    );
});
