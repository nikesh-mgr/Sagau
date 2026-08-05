import rateLimit from "express-rate-limit";

/**
 * ==========================================================
 * Rate Limiter
 * ==========================================================
 *
 * Prevents
 *
 * - Brute Force
 * - Spam
 * - API Abuse
 *
 * ==========================================================
 */

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,

    message: "Too many requests. Please try again later.",
  },
});

export default rateLimitMiddleware;
