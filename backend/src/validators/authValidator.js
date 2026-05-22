import { body } from "express-validator";

// REGISTER VALIDATION
export const registerValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role").isIn(["client", "worker", "admin"]).withMessage("Invalid role"),
];

// LOGIN VALIDATION
export const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),

  body("password").notEmpty().withMessage("Password is required"),
];
