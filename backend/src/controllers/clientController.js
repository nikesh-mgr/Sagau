import Client from "../models/clientSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// =====================================================
// Create Client Profile
// =====================================================

export const createClientProfile = asyncHandler(async (req, res) => {
  console.log("========== CREATE CLIENT ==========");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const existingProfile = await Client.findOne({
    user: req.user._id,
  });

  if (existingProfile) {
    throw new ApiError(400, "Client profile already exists");
  }

  const client = await Client.create({
    user: req.user._id,

    address: req.body.address,

    phone: req.body.phone,

    profileImage: req.file
      ? `/uploads/profiles/${req.file.filename}`
      : "",
  });

  console.log("Client profile created successfully");

  res
    .status(201)
    .json(new ApiResponse(201, "Client profile created", client));
});


// =====================================================
// Get Logged-in Client Profile
// =====================================================

export const getMyClientProfile = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    user: req.user._id,
  }).populate(
    "user",
    "fullName email role",
  );

  if (!client) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Client profile not created yet",
          null,
        ),
      );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Client profile fetched",
        client,
      ),
    );
});


// =====================================================
// Update Client Profile
// =====================================================

export const updateClientProfile = asyncHandler(async (req, res) => {
  console.log("========== UPDATE CLIENT PROFILE ==========");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);


  const client = await Client.findOne({
    user: req.user._id,
  });


  if (!client) {
    throw new ApiError(404, "Client profile not found");
  }


  client.address =
    req.body.address ?? client.address;


  client.phone =
    req.body.phone ?? client.phone;


  if (req.file) {
    client.profileImage =
      `/uploads/profiles/${req.file.filename}`;
  }


  await client.save();


  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Client profile updated",
        client,
      ),
    );
});