/**
 * Authentication Routes
 *
 * Defines all authentication-related API endpoints.
 * Including user registration, login.
 *
 * @module authRoutes
 */

const express = require('express');
const { login, register } = require('../controllers/authController');
const {
  schemaLogin,
  schemaRegister
} = require('../middleware/validations/auth');
const { authenticateLocal } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

// 🔐 AUTHENTICATION ROUTES (PUBLIC)
router.post('/register', validate(schemaRegister), register); // GET /api/auth/register
router.post('/login', validate(schemaLogin), authenticateLocal, login); // POST /api/auth/login

module.exports = router;
