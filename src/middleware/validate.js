/**
 * Middleware factory that validates req.body against a Joi schema.
 * @param {Object} schema - Joi schema object (must implement validate).
 * @returns {Function} Express middleware function (req, res, next).
 * @throws {Error} If validation fails, responds with 400 and error details.
 */
const validate = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  validate
};
