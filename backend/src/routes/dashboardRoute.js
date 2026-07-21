import express from "express";
import { getWorkerDashboard } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.get("/", protect, authorizeRoles("worker"), getWorkerDashboard);
export default router;
