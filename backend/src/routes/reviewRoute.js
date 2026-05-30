import express from "express";

import {
  createReview,
  getWorkerReviews,
  getClientReviews,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import { createReviewValidator } from "../validators/reviewValidator.js";

const router = express.Router();

router.post(
  "/:agreementId",
  protect,
  createReviewValidator,
  validate,
  createReview,
);

router.get("/worker/:workerId", getWorkerReviews);

router.get("/client/:clientId", getClientReviews);

export default router;
