/**
 * Authentication Controller
 *
 * Handles user authentication operations including registration, login,
 *
 * @module authController
 */

const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/authService');

/**
 * @desc    Login user using Passport Local Strategy
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { user } = req;

    const responseData = await authService.login(user);

    return ApiResponse.success(res, responseData, 'Login successful');
  } catch (error) {
    return ApiResponse.error(res, 'Error during login');
  }
};

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { body } = req;
    const result = await authService.register(body);

    return ApiResponse.success(res, result, 'Email verified successfully');
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      return ApiResponse.conflict(res, 'User already exists');
    }

    return ApiResponse.error(res, 'Error creating user');
  }
};

module.exports = {
  login,
  register
};
