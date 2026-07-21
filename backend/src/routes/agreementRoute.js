import express from "express";

import {
  getMyAgreements,
  getSingleAgreement,
  updateAgreementStatus,
} from "../controllers/agreementController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyAgreements);

router.get("/:agreementId", protect, getSingleAgreement);

router.patch("/:agreementId/status", protect, updateAgreementStatus);

export default router;
