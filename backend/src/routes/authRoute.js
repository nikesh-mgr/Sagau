import express from "express";

import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";

const router = express.Router();

// REGISTER
router.post("/register", registerValidator, validate, register);

// LOGIN
router.post("/login", loginValidator, validate, login);

// CURRENT USER
router.get("/me", protect, getMe);

// LOGOUT
router.post("/logout", protect, logout);

export default router;
