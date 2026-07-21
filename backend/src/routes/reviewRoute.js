import express from "express";

import {
  createReview,
  getWorkerReviews,
  getClientReviews,
  getAgreementReviews,
  getMyReviews,
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
router.get("/agreement/:agreementId", protect, getAgreementReviews);
router.get("/my", protect, getMyReviews);
export default router;
