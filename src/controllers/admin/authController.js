/**
 * Authentication Admin Controller
 *
 * Handles admin authentication operations including registration.
 *
 * @module authController
 */

const ApiResponse = require('../../utils/ApiResponse');

const authService = require('../../services/admin/authService');

/**
 * @desc    Register user
 * @route   POST /api/admin/auth/register
 * @access  Private (Admin only)
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
  register
};
