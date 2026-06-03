/**
 * Authentication Service
 *
 * Handles core authentication operations, including user registration, login,
 *
 * @module authService
 */

const userRepository = require('../../repositories/userRepository');
const { generateToken } = require('../../utils/helpers');

/**
 * Authenticate user and create session
 * @param {Object} user - { userId, email, role }
 * @returns {Object} Token and user data
 */
const login = async user => {
  try {
    const { id: userId, email, role } = user;

    const token = await generateToken({
      userId,
      email,
      role
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    };
  } catch (error) {
    throw new Error('Error during login');
  }
};

/**
 * Register new user with role assignment
 * The administrator can choose the role of the created user.
 * @param {Object} data - { email, password, role }
 * @returns {Object} Token and user data
 */

const register = async data => {
  try {
    const { email, password, role } = data;

    const user = await userRepository.create({ email, password, role });

    const token = await generateToken({
      userId: user.id,
      email,
      role
    });

    return { user, token };
  } catch (error) {
    throw new Error(`Error creating admin user: ${error.message}`);
  }
};

module.exports = { login, register };
