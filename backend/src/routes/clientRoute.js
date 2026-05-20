import express from "express";
import {
  createClientProfile,
  updateClientProfile,
  getMyClientProfile,
  getClientProfile,
} from "../controllers/clientController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createClientProfile);
router.put("/", protect, updateClientProfile);
router.get("/me", protect, getMyClientProfile);
router.get("/:id", protect, getClientProfile);

export default router;
