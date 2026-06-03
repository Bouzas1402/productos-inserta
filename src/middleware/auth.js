const passport = require('passport');
const ApiResponse = require('../utils/ApiResponse');

/**
 * JWT authentication middleware for general users.
 *
 * Uses Passport 'jwt' strategy (no sessions). On success assigns the
 * authenticated user to `req.user` and calls `next()`.
 *
 * Error responses:
 * - 500 Internal Server Error
 *   Example body:
 *   { "success": false, "error": "Authentication error" }
 *
 * - 401 Unauthorized (invalid or missing token / user not found)
 *   Example body:
 *   { "success": false, "error": "No valid token, authorization denied" }
 *
 * @function auth
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Authentication error'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No valid token, authorization denied'
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

/**
 * Local authentication middleware for login.
 *
 * Uses Passport 'local' strategy (no sessions). On success assigns the
 * authenticated user to `req.user` and calls `next()`.
 *
 * Error responses:
 * - 500 Internal Server Error
 *   Example body:
 *   { "success": false, "error": "Authentication error" }
 *
 * - 401 Unauthorized (invalid credentials)
 *   Delegates to `ApiResponse.unauthorized(res, message)`.
 *   Typical example body (depending on ApiResponse implementation):
 *   { "success": false, "error": "Invalid credentials" }
 *
 * @function authenticateLocal
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
const authenticateLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Authentication error'
      });
    }

    if (!user) {
      return ApiResponse.unauthorized(
        res,
        info?.message || 'Invalid credentials'
      );
    }

    req.user = user;
    next();
  })(req, res, next);
};

/**
 * JWT authentication middleware for admins.
 *
 * Uses Passport 'jwt-admin' strategy (no sessions). On success assigns the
 * authenticated user to `req.user` and calls `next()`.
 *
 * Error responses:
 * - 500 Internal Server Error
 *   Example body:
 *   { "success": false, "error": "Authentication error" }
 *
 * - 401 Unauthorized (invalid or missing token / user not found)
 *   Example body:
 *   { "success": false, "error": "No valid token, authorization denied" }
 *
 * @function authAdmin
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
const authAdmin = (req, res, next) => {
  passport.authenticate(
    'jwt-admin',
    { session: false },
    async (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Authentication error'
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'No valid token, authorization denied'
        });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

module.exports = {
  auth,
  authAdmin,
  authenticateLocal
};
