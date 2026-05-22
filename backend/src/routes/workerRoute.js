import express from "express";

import {
  createWorkerProfile,
  getMyWorkerProfile,
  updateWorkerProfile,
  getAllWorkers,
  getWorkerById,
} from "../controllers/workerController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import { workerProfileValidator } from "../validators/profileValidator.js";

const router = express.Router();

// CREATE PROFILE
router.post(
  "/create-profile",
  protect,
  authorizeRoles("worker"),
  workerProfileValidator,
  validate,
  createWorkerProfile,
);

// GET MY PROFILE
router.get("/profile", protect, authorizeRoles("worker"), getMyWorkerProfile);

// UPDATE PROFILE
router.put(
  "/profile/update",
  protect,
  authorizeRoles("worker"),
  updateWorkerProfile,
);

// MARKETPLACE
router.get("/", getAllWorkers);

// SINGLE WORKER
router.get("/:workerId", getWorkerById);

export default router;
