import express from "express";

import {
  createProfile,
  updateProfile,
  getMyProfile,
  getWorkerProfile,
} from "../controllers/workerController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", protect, createProfile);

router.put("/profile", protect, updateProfile);

router.get("/profile/me", protect, getMyProfile);

router.get("/profile/:id", protect, getWorkerProfile);

export default router;
