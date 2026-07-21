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

router.post(
  "/",
  protect,
  authorizeRoles("client"),
  createJobValidator,
  validate,
  createJob,
);

router.get("/client/my-jobs", protect, authorizeRoles("client"), getMyJobs);

router.get("/", getAllJobs);
router.get("/:jobId", getSingleJob);

router.put("/:jobId", protect, authorizeRoles("client"), updateJob);
router.delete("/:jobId", protect, authorizeRoles("client"), deleteJob);

router.patch(
  "/:jobId/status",
  protect,
  authorizeRoles("client"),
  updateJobStatus,
);

export default router;
