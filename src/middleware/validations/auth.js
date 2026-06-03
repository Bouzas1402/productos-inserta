/**
 * Validation middleware for authentication endpoints
 *
 * Provides validation rules for authentication
 *
 * @module authValidation
 */

const Joi = require('joi');
const { roles } = require('../../staticData/staticData');

// Schema for user login payload
const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
    'string.empty': 'Email is required'
  }),

  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required'
  })
})
  .required()
  .unknown(false);

// Schema for user registration payload
const schemaRegister = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required'
  })
}).unknown(false);

// Schema for admin registration payload (includes role)
const schemaRegisterAdmin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required'
  }),
  role: Joi.string()
    .valid(...roles)
    .required()
    .messages({
      'any.only': `Role must be one of the following: ${roles.join(', ')}`,
      'any.required': 'Role is required',
      'string.empty': 'Role is required'
    })
})
  .required()
  .unknown(false);

module.exports = {
  schemaLogin,
  schemaRegister,
  schemaRegisterAdmin
};
