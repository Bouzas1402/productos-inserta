/**
 * Orders Service
 *
 * Business logic for auth to public routes, including login and register.
 *
 * @module authService
 */

const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/helpers');

/**
 * Authenticate user and create session
 * @param {Object} user - Authenticated user object
 * @param {Object} clientInfo - Client metadata (IP, country, browser, etc.)
 * @returns {Object} Token and user data
 */
const login = async user => {
  try {
    const { _id: userId, email, role } = user;

    const token = await generateToken({
      userId,
      email,
      role
    });

    return {
      token,
      user
    };
  } catch (error) {
    throw new Error('Error during login');
  }
};

/**
 * Register new user without role assignment, CUSTOMER_ROLE is default
 * @param {Object} data - User data (email, password)
 * @returns {Object} Token and user data
 */
const register = async data => {
  try {
    const { email, password } = data;

    const user = await userRepository.create({ email, password });

    const token = await generateToken({
      userId: user.id,
      email,
      role: user.role
    });

    return { user, token };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

module.exports = { login, register };
