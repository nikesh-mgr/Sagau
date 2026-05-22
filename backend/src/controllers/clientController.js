import Client from "../models/clientSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// CREATE CLIENT PROFILE
export const createClientProfile = asyncHandler(async (req, res) => {
  // CHECK EXISTING PROFILE
  const existingProfile = await Client.findOne({
    user: req.user._id,
  });

  if (existingProfile) {
    throw new ApiError(400, "Client profile already exists");
  }

  // CREATE PROFILE
  const client = await Client.create({
    user: req.user._id,
    address: req.body.address,
    phone: req.body.phone,
  });

  res.status(201).json(new ApiResponse(201, "Client profile created", client));
});

// GET MY CLIENT PROFILE
export const getMyClientProfile = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    user: req.user._id,
  }).populate("user", "fullName email role");

  if (!client) {
    throw new ApiError(404, "Client profile not found");
  }

  res.status(200).json(new ApiResponse(200, "Client profile fetched", client));
});

// UPDATE CLIENT PROFILE
export const updateClientProfile = asyncHandler(async (req, res) => {
  const updatedProfile = await Client.findOneAndUpdate(
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
    throw new ApiError(404, "Profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Client profile updated", updatedProfile));
});
