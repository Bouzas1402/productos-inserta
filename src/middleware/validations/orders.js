/**
 * Validation middleware for orders endpoints
 *
 * Provides validation rules for order-related operations
 *
 * @module ordersValidation
 */
const Joi = require('joi');

// Validation schema for creating an order
const schemaOrder = Joi.object({
  product_id: Joi.string().hex().length(24).required(),

  quantity: Joi.number().integer().min(1).required()
})
  .required()
  .unknown(false);

module.exports = {
  schemaOrder
};
