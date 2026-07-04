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

/*
POST
/api/reviews/:agreementId
*/

router.post(
  "/:agreementId",
  protect,
  createReviewValidator,
  validate,
  createReview,
);

/*
GET
/api/reviews/worker/:workerId
*/

router.get("/worker/:workerId", getWorkerReviews);

/*
GET
/api/reviews/client/:clientId
*/

router.get("/client/:clientId", getClientReviews);

export default router;
