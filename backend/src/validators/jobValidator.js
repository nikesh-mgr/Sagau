import { body } from "express-validator";

export const createJobValidator = [
  body("title").trim().notEmpty().withMessage("Job title is required"),

  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("budget").isNumeric().withMessage("Budget must be numeric"),

  body("skillsRequired")
    .isArray({ min: 1 })
    .withMessage("At least one skill required"),

  body("location").trim().notEmpty().withMessage("Location required"),

  body("deadline").notEmpty().withMessage("Deadline required"),

  body("category").trim().notEmpty().withMessage("Category required"),
];
