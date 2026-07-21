import User from "../models/userSchema.js";
import Job from "../models/jobSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

// Get single user
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

// Activate / deactivate user
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isActive = isActive;

  await user.save();

  res.status(200).json(new ApiResponse(200, "User status updated", user));
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await user.deleteOne();

  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});

// Get all jobs
export const getAllAdminJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate("client", "fullName email")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "Jobs fetched successfully", jobs));
});
