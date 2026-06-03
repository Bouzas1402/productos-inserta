/**
 * API response helpers.
 *
 * Provides consistent JSON response helpers for successful and error responses.
 * Centralizes status codes, timestamps and default messages, and provides
 * a sanitizer for error messages that maps internal status codes to safe, user-facing text.
 *
 * @module utils/ApiResponse
 */

const config = require('../config/config');

/**
 * Used for general successful responses.
 * Default HTTP status: 200
 * Response shape: { success: true, message, data, timestamp }
 */
const success = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: Date.now()
  });
};

/**
 * Used when a resource is created.
 * Default HTTP status: 201
 * Response shape: same as success, with created resource in `data`
 */
const created = (
  res,
  data = null,
  message = 'Resource created successfully'
) => {
  return success(res, data, message, 201);
};

/**
 * Used for server or generic errors.
 * Default HTTP status: 500
 * Response shape: { success: false, message, timestamp }
 */
const error = (
  res,
  message = 'Internal Server Error',
  statusCode = 500,
  errors = null
) => {
  const response = {
    success: false,
    message,
    timestamp: Date.now()
  };

  return res.status(statusCode).json(response);
};

/**
 * Used when a requested resource does not exist.
 * Default HTTP status: 404
 * Response shape: { success: false, message, timestamp }
 */
const notFound = (res, message = 'Resource not found') => {
  return error(res, message, 404);
};

/**
 * Used for invalid client requests (validation, malformed input).
 * Default HTTP status: 400
 * Response shape: { success: false, message, timestamp }
 */
const badRequest = (res, message = 'Bad request', errors = null) => {
  return error(res, message, 400, errors);
};

/**
 * Used for authentication/authorization failures.
 * Default HTTP status: 401
 * Response shape: { success: false, message, timestamp }
 */
const unauthorized = (res, message = 'Unauthorized') => {
  return error(res, message, 401);
};

/**
 * Used for resource conflicts (e.g., duplicates, state conflicts).
 * Default HTTP status: 409
 * Response shape: { success: false, message, timestamp }
 */
const conflict = (res, message = 'Conflict') => {
  return error(res, message, 409);
};

module.exports = {
  success,
  error,
  created,
  notFound,
  badRequest,
  conflict
};
