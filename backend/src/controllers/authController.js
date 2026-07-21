import User from "../models/userSchema.js";

import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Return only the required user fields
const formatUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});

// Register a new user
export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role,
  });

  const token = generateToken(user._id);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      token,
      user: formatUser(user),
    }),
  );
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account blocked");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json(
    new ApiResponse(200, "Login successful", {
      token,
      user: formatUser(user),
    }),
  );
});

// Get logged-in user
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Logout successful"));
});
