/**
 * Validation middleware for products endpoints
 *
 * Provides validation rules for products
 *
 * @module productsValidation
 */
const Joi = require('joi');

// Validation schema for creating a product
const schemaCreateProduct = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 100 characters long',
    'any.required': 'Name is required'
  }),
  description: Joi.string().max(500).messages({
    'string.max': 'Description must be at most 500 characters long'
  }),
  price: Joi.number()
    .min(1)
    .precision(2)
    .messages({
      'number.min': 'Price must be a positive number',
      'number.precision': 'Price must have at most 2 decimal places'
    })
    .required(),
  stock: Joi.number().integer().min(1).required().messages({
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock must be at least 1',
    'any.required': 'Stock is required'
  })
}).required();

module.exports = {
  schemaCreateProduct
};
