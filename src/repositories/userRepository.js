const User = require('./models/Users');

/**
 * Create new user
 * @param {Object} userData - User data to create
 * @returns {Object} Created user document
 * @throws {Error} If creation fails.
 */
const create = async userData => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Find single user with conditions
 * @param {Object} conditions - MongoDB query conditions
 * @param {Object} options - Query options { select? }
 * @returns {Object|null} Found user document, or null if not found.
 * @throws {Error} If the query fails. */
const findOne = async (conditions, options = {}) => {
  try {
    const { select } = options;
    let query = User.findOne(conditions);

    if (select) query = query.select(select);

    const result = await query.exec();

    if (!result) return null;

    return result.toObject();
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

module.exports = {
  create,
  findOne
};
