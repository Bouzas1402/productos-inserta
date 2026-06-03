const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

/**
 * Validate a password against stored hash with dual format support
 * Validates a plain text password against a stored hash, supporting both modern bcrypt
 * format and legacy SHA1+salt format for backward compatibility. This allows seamless
 * authentication for users with old password hashes while maintaining security for new users.
 * @param {string} plainPassword - Plain text password to validate
 * @param {string} storedHash - Stored password hash (either bcrypt or SHA1+salt format)
 * @returns {boolean} - Promise resolving to true if password matches, false otherwise
 */
const validatePassword = async (plainPassword, storedHash) => {
  try {
    const isMatchBcrypt = await bcrypt.compare(plainPassword, storedHash);

    if (isMatchBcrypt) return true;

    const salt = 'DOlG93b0qyJfIxfs2guToUubWwvopR2G0FgaC9mi';
    const stringpass = `${salt}${plainPassword}`;
    const legacyHash = require('sha1')(stringpass);

    if (legacyHash === storedHash) return true;

    return false;
  } catch (error) {
    return false;
  }
};

/**
 * Generate a signed JWT for a user payload.
 *
 * Creates a JWT containing `userId`, `email` and `role` and signs it using
 * application config settings (`JWT_SECRET`, `JWT_EXPIRE`, `JWT_ISSUER`, `JWT_AUDIENCE`).
 *
 * @param {Object} data - Payload for token generation.
 * @param {string} data.userId - User identifier to include in the token.
 * @param {string} data.email - User email to include in the token.
 * @param {string} data.role - User role to include in the token.
 * @returns {Promise<string>} Resolves to the signed JWT string.
 * @throws {Error} If token generation fails.
 */
const generateToken = async data => {
  try {
    const { userId, email, role } = data;
    const token = jwt.sign({ userId, email, role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE
    });
    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

/**
 * Hash a password using bcrypt with configurable salt rounds
 * Creates a secure hash of the provided password using bcrypt algorithm with salt.
 * The salt rounds are configured in the application config to balance security and performance.
 * @param {string} password - Plain text password to hash
 * @returns {string} - Promise resolving to the hashed password

 */
const hashPassword = async password => {
  const salt = await bcrypt.genSalt(Number(config.BCRYPT_SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  validatePassword,
  generateToken,
  hashPassword
};
