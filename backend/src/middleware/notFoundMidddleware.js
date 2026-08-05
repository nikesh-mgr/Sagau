import ApiError from "../utils/ApiError.js";

/**
 * ==========================================================
 * Not Found Middleware
 * ==========================================================
 *
 * Handles unknown routes.
 *
 * Must be placed AFTER all routes.
 *
 * Example:
 *
 * app.use(notFound);
 *
 * ==========================================================
 */

const notFound = (req, res, next) => {
  next(
    new ApiError(
      404,
      `Route not found: ${req.originalUrl}`
    )
  );
};

export default notFound;