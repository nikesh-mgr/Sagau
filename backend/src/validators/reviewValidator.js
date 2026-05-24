import { body } from "express-validator";

export const createReviewValidator = [
  body("rating")
    .isNumeric()
    .withMessage("Rating must be numeric")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters"),
];
