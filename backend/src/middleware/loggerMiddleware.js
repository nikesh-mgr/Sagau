import logger from "../utils/logger.js";

/**
 * ==========================================================
 * Request Logger Middleware
 * ==========================================================
 *
 * Logs every incoming request.
 *
 * Helpful during development.
 *
 * ==========================================================
 */

const loggerMiddleware = (req, res, next) => {
  logger.info("====================================");

  logger.info(`Method : ${req.method}`);

  logger.info(`Route  : ${req.originalUrl}`);

  logger.info(`IP     : ${req.ip}`);

  if (req.user) {
    logger.info(`User   : ${req.user.fullName} (${req.user.role})`);
  }

  if (Object.keys(req.params).length) {
    logger.debug(req.params);
  }

  if (Object.keys(req.query).length) {
    logger.debug(req.query);
  }

  if (Object.keys(req.body).length) {
    logger.debug(req.body);
  }

  logger.info("====================================");

  next();
};

export default loggerMiddleware;
