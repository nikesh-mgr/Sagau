import Job from "../models/jobSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// CREATE JOB
export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    client: req.user._id,

    title: req.body.title,
    description: req.body.description,
    budget: req.body.budget,
    skillsRequired: req.body.skillsRequired,
    location: req.body.location,
    deadline: req.body.deadline,
    category: req.body.category,
  });

  res.status(201).json(new ApiResponse(201, "Job created successfully", job));
});

// GET ALL JOBS
export const getAllJobs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const { search, category, location, minBudget, maxBudget, status } =
    req.query;

  const filter = {};

  // SEARCH
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // CATEGORY
  if (category) {
    filter.category = category;
  }

  // LOCATION
  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    };
  }

  // STATUS
  if (status) {
    filter.status = status;
  }

  // BUDGET FILTER
  if (minBudget || maxBudget) {
    filter.budget = {};

    if (minBudget) {
      filter.budget.$gte = Number(minBudget);
    }

    if (maxBudget) {
      filter.budget.$lte = Number(maxBudget);
    }
  }

  const jobs = await Job.find(filter)
    .populate("client", "fullName email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, "Jobs fetched successfully", {
      jobs,
      pagination: {
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
      },
    }),
  );
});

// GET SINGLE JOB
export const getSingleJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId).populate(
    "client",
    "fullName email role",
  );

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  res.status(200).json(new ApiResponse(200, "Job fetched successfully", job));
});

// UPDATE JOB
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // OWNER CHECK
  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can update only your jobs");
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Job updated successfully", updatedJob));
});

// DELETE JOB
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // OWNER CHECK
  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can delete only your jobs");
  }

  await job.deleteOne();

  res.status(200).json(new ApiResponse(200, "Job deleted successfully"));
});

// UPDATE JOB STATUS
export const updateJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED"];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // OWNER CHECK
  if (job.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can update only your jobs");
  }

  job.status = status;

  await job.save();

  res.status(200).json(new ApiResponse(200, "Job status updated", job));
});

// GET MY JOBS
export const getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({
    client: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "Client jobs fetched", jobs));
});
