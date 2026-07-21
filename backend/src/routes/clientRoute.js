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

const router = express.Router();

router.post(
  "/create-profile",
  protect,
  authorizeRoles("client"),
  clientProfileValidator,
  validate,
  createClientProfile,
);

router.get("/profile", protect, authorizeRoles("client"), getMyClientProfile);

router.put(
  "/profile/update",
  protect,
  authorizeRoles("client"),
  updateClientProfile,
);

export default router;
