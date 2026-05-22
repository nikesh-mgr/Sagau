import { body } from "express-validator";

export const applyJobValidator = [
  body("bidAmount").isNumeric().withMessage("Bid amount must be numeric"),

  body("proposalText")
    .trim()
    .isLength({ min: 20 })
    .withMessage("Proposal must be at least 20 characters"),

  body("estimatedDays")
    .isNumeric()
    .withMessage("Estimated days must be numeric"),
];
