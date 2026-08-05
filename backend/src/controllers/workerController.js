import Worker from "../models/workerSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// =====================================================
// Helper: Convert FormData values to arrays
// =====================================================

const convertToArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// =====================================================
// Create Worker Profile
// =====================================================

export const createWorkerProfile = asyncHandler(async (req, res) => {
  console.log("========== CREATE WORKER ==========");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const existingProfile = await Worker.findOne({
    user: req.user._id,
  });

  if (existingProfile) {
    throw new ApiError(400, "Worker profile already exists");
  }

  const worker = await Worker.create({
    user: req.user._id,

    skills: convertToArray(req.body.skills),

    bio: req.body.bio,

    experience: Number(req.body.experience),

    hourlyRate: Number(req.body.hourlyRate),

    location: req.body.location,

    phone: req.body.phone,

    availability: req.body.availability || "Available",

    portfolio: convertToArray(req.body.portfolio),

    profileImage: req.file ? `/uploads/profiles/${req.file.filename}` : "",
  });

  console.log("Worker created successfully");

  res.status(201).json(new ApiResponse(201, "Worker profile created", worker));
});

// =====================================================
// Get Logged-in Worker Profile
// =====================================================

export const getMyWorkerProfile = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({
    user: req.user._id,
  }).populate("user", "fullName email role");

  if (!worker) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Worker profile not created yet", null));
  }

  res.status(200).json(new ApiResponse(200, "Worker profile fetched", worker));
});

// =====================================================
// Update Worker Profile
// =====================================================

export const updateWorkerProfile = asyncHandler(async (req, res) => {
  console.log("========== UPDATE WORKER PROFILE ==========");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const worker = await Worker.findOne({
    user: req.user._id,
  });

  if (!worker) {
    throw new ApiError(404, "Worker profile not found");
  }

  worker.experience = req.body.experience ?? worker.experience;

  worker.hourlyRate = req.body.hourlyRate ?? worker.hourlyRate;

  worker.location = req.body.location ?? worker.location;

  worker.phone = req.body.phone ?? worker.phone;

  worker.bio = req.body.bio ?? worker.bio;

  worker.availability = req.body.availability ?? worker.availability;

  if (req.body.skills) {
    worker.skills = convertToArray(req.body.skills);
  }

  if (req.body.portfolio) {
    worker.portfolio = convertToArray(req.body.portfolio);
  }

  // Replace image if uploaded

  if (req.file) {
    worker.profileImage = `/uploads/profiles/${req.file.filename}`;
  }

  await worker.save();

  res.status(200).json(new ApiResponse(200, "Worker profile updated", worker));
});

// =====================================================
// Get All Workers
// =====================================================

export const getAllWorkers = asyncHandler(async (req, res) => {
  const { skill, location, availability, rating } = req.query;

  const filter = {};

  if (skill) {
    filter.skills = {
      $regex: skill,
      $options: "i",
    };
  }

  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (availability) {
    filter.availability = availability;
  }

  if (rating) {
    filter.rating = {
      $gte: Number(rating),
    };
  }

  const workers = await Worker.find(filter)

    .populate("user", "fullName email role isActive createdAt")

    .sort({
      createdAt: -1,
    });

  console.log("========== ADMIN WORKERS ==========");
  console.log("Filters:", req.query);
  console.log("Workers Found:", workers.length);

  res.status(200).json(new ApiResponse(200, "Workers fetched", workers));
});

// =====================================================
// Get Worker By ID
// =====================================================

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
