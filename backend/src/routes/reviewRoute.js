import express from "express";
import {
  createReview,
  getUserReviews,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReview);

router.get("/:userId", getUserReviews);

export default router;
