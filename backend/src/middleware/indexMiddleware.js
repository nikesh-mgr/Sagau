/**
 * ==========================================================
 * Middleware Index
 * ==========================================================
 *
 * Central export file.
 *
 * Import Example:
 *
 * import {
 *      protect,
 *      isAdmin,
 *      validate
 * } from "../middleware/index.js";
 *
 * ==========================================================
 */

export { protect } from "./authMiddleware.js";

export { isAdmin } from "./adminMiddleware.js";

export { authorizeRoles } from "./roleMiddleware.js";

export { default as validate } from "./validationMiddleware.js";

export {
  uploadProfile,
  uploadPortfolio,
  uploadJob,
  uploadPayment,
} from "./multerMiddleware.js";

export { default as loggerMiddleware } from "./loggerMiddleware.js";

export { default as notFound } from "./notFoundMiddleware.js";

export { default as errorMiddleware } from "./errorMiddleware.js";

export { default as rateLimitMiddleware } from "./rateLimitMiddleware.js";
