import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getAllAdminJobs,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);

router.get("/users/:userId", protect, isAdmin, getUserById);

router.patch("/users/:userId/status", protect, isAdmin, updateUserStatus);

router.delete("/users/:userId", protect, isAdmin, deleteUser);

router.get("/jobs", protect, isAdmin, getAllAdminJobs);

export default router;
