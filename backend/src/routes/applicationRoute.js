import express from "express";

import {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import { applyJobValidator } from "../validators/applicationValidator.js";

const router = express.Router();

// APPLY TO JOB
router.post(
  "/:jobId",
  protect,
  authorizeRoles("worker"),
  applyJobValidator,
  validate,
  applyToJob,
);

// GET MY APPLICATIONS
router.get(
  "/my-applications",
  protect,
  authorizeRoles("worker"),
  getMyApplications,
);

// GET APPLICATIONS OF JOB
router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("client"),
  getJobApplications,
);

// ACCEPT / REJECT APPLICATION
router.patch(
  "/:applicationId",
  protect,
  authorizeRoles("client"),
  updateApplicationStatus,
);

export default router;
