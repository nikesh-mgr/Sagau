import express from "express";

import {
  createClientProfile,
  getMyClientProfile,
  updateClientProfile,
} from "../controllers/clientController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import { clientProfileValidator } from "../validators/profileValidator.js";

import { uploadProfile } from "../middleware/multerMidddleware.js";

const router = express.Router();

// =====================================================
// Create Client Profile
// =====================================================

router.post(
  "/create-profile",
  protect,
  authorizeRoles("client"),
  uploadProfile.single("profileImage"),
  clientProfileValidator,
  validate,
  createClientProfile,
);

// =====================================================
// Get Client Profile
// =====================================================

router.get("/profile", protect, authorizeRoles("client"), getMyClientProfile);

// =====================================================
// Update Client Profile
// =====================================================

router.put(
  "/profile/update",
  protect,
  authorizeRoles("client"),
  uploadProfile.single("profileImage"),
  updateClientProfile,
);

export default router;
