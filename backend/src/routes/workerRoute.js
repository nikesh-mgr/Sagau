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
import { uploadProfile } from "../middleware/multerMidddleware.js";
import { workerProfileValidator } from "../validators/profileValidator.js";

const router = express.Router();
router.post(
  "/create-profile",
  protect,
  authorizeRoles("worker"),
  uploadProfile.single("profileImage"),
  workerProfileValidator,
  validate,
  createWorkerProfile,
);
router.get(
  "/profile",
  (req, res, next) => {
    console.log("✅ /workers/profile route reached");
    next();
  },
  protect,
  authorizeRoles("worker"),
  getMyWorkerProfile,
);
router.put(
  "/profile/update",
  protect,
  authorizeRoles("worker"),
  uploadProfile.single("profileImage"),
  updateWorkerProfile,
);

router.get("/", getAllWorkers);
router.get("/:workerId", getWorkerById);

export default router;
