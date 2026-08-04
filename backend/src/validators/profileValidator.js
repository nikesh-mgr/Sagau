import { body } from "express-validator";

// =====================================================
// WORKER PROFILE VALIDATION
// =====================================================

export const workerProfileValidator = [
  body("skills").notEmpty().withMessage("At least one skill is required"),

  body("bio")
    .trim()
    .isLength({ min: 20 })
    .withMessage("Bio must be at least 20 characters"),

  body("experience").isNumeric().withMessage("Experience must be a number"),

  body("hourlyRate").isNumeric().withMessage("Hourly rate must be a number"),

  body("location").trim().notEmpty().withMessage("Location required"),

  body("phone").trim().notEmpty().withMessage("Phone number required"),
];

// =====================================================
// CLIENT PROFILE VALIDATION
// =====================================================

export const clientProfileValidator = [
  body("address").trim().notEmpty().withMessage("Address is required"),

  body("phone").trim().notEmpty().withMessage("Phone number required"),
];
