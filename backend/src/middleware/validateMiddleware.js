import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  // Return validation errors if any
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

export default validate;