/**
 * Authentication Routes
 *
 * Defines all authentication-related API endpoints for admin users.
 * Includes user registration.
 *
 * @module authRoutes
 */

const express = require('express');
const { register } = require('../../controllers/admin/authController');

const { schemaRegisterAdmin } = require('../../middleware/validations/auth');
const { validate } = require('../../middleware/validate');

const router = express.Router();

// 🔐 AUTHENTICATION ROUTES FOR ADMIN USERS
router.post('/register', validate(schemaRegisterAdmin), register); // POST /api/admin/auth/register

module.exports = router;
