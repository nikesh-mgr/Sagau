import express from "express";

import {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// WORKER APPLIES TO JOB
router.post("/apply", protect, authorizeRoles("worker"), applyToJob);

// WORKER GETS OWN APPLICATIONS
router.get("/me", protect, authorizeRoles("worker"), getMyApplications);

// CLIENT GETS JOB APPLICATIONS
router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("client"),
  getJobApplications,
);

// CLIENT ACCEPTS / REJECTS APPLICATION
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("client"),
  updateApplicationStatus,
);

export default router;
