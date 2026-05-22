import express from "express";

import {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  updateJobStatus,
  getMyJobs,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import { createJobValidator } from "../validators/jobValidator.js";

const router = express.Router();

// CREATE JOB
router.post(
  "/",
  protect,
  authorizeRoles("client"),
  createJobValidator,
  validate,
  createJob,
);

// GET MY JOBS
router.get("/client/my-jobs", protect, authorizeRoles("client"), getMyJobs);

// GET ALL JOBS
router.get("/", getAllJobs);

// GET SINGLE JOB
router.get("/:jobId", getSingleJob);

// UPDATE JOB
router.put("/:jobId", protect, authorizeRoles("client"), updateJob);

// DELETE JOB
router.delete("/:jobId", protect, authorizeRoles("client"), deleteJob);

// UPDATE JOB STATUS
router.patch(
  "/:jobId/status",
  protect,
  authorizeRoles("client"),
  updateJobStatus,
);

export default router;
