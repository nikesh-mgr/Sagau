import Worker from "../models/workerSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// CREATE WORKER PROFILE
export const createWorkerProfile = asyncHandler(async (req, res) => {
  // CHECK EXISTING PROFILE
  const existingProfile = await Worker.findOne({
    user: req.user._id,
  });

  if (existingProfile) {
    throw new ApiError(400, "Worker profile already exists");
  }

  // CREATE PROFILE
  const worker = await Worker.create({
    user: req.user._id,
    skills: req.body.skills,
    bio: req.body.bio,
    experience: req.body.experience,
    hourlyRate: req.body.hourlyRate,
    location: req.body.location,
    availability: req.body.availability,
    portfolio: req.body.portfolio,
  });

  res.status(201).json(new ApiResponse(201, "Worker profile created", worker));
});

// GET MY PROFILE
export const getMyWorkerProfile = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({
    user: req.user._id,
  }).populate("user", "fullName email role");

  if (!worker) {
    throw new ApiError(404, "Worker profile not found");
  }

  res.status(200).json(new ApiResponse(200, "Worker profile fetched", worker));
});

// UPDATE WORKER PROFILE
export const updateWorkerProfile = asyncHandler(async (req, res) => {
  const updatedProfile = await Worker.findOneAndUpdate(
    {
      user: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedProfile) {
    throw new ApiError(404, "Worker profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Worker profile updated", updatedProfile));
});

// GET ALL WORKERS
export const getAllWorkers = asyncHandler(async (req, res) => {
  const { skill, location } = req.query;

  const filter = {};

  // FILTER BY SKILL
  if (skill) {
    filter.skills = {
      $regex: skill,
      $options: "i",
    };
  }

  // FILTER BY LOCATION
  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    };
  }

  const workers = await Worker.find(filter)
    .populate("user", "fullName email role")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "Workers fetched", workers));
});

// GET SINGLE WORKER
export const getWorkerById = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.workerId).populate(
    "user",
    "fullName email role",
  );

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  res.status(200).json(new ApiResponse(200, "Worker fetched", worker));
});
