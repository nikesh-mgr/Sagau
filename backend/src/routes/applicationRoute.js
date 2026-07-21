import express from "express";

import {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  getClientApplications,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/apply/:jobId", protect, authorizeRoles("worker"), applyToJob);

router.get("/me", protect, authorizeRoles("worker"), getMyApplications);

router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("client"),
  getJobApplications,
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("client"),
  updateApplicationStatus,
);
router.get("/client", protect, authorizeRoles("client"), getClientApplications);
export default router;
