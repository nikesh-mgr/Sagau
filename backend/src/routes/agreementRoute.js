import express from "express";

import {
  getMyAgreements,
  getSingleAgreement,
  updateAgreementStatus,
} from "../controllers/agreementController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL AGREEMENTS
router.get("/", protect, getMyAgreements);

// GET SINGLE AGREEMENT
router.get("/:agreementId", protect, getSingleAgreement);

// UPDATE AGREEMENT STATUS
router.patch("/:agreementId/status", protect, updateAgreementStatus);

export default router;
