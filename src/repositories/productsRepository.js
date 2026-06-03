const Products = require('./models/Products');

/**
 * Create a new product remittance
 * @param {Object} data - Product remittance data
 * @returns {Object|null} Created product remittance document or null if creation fails
 * @throws {Error} If creation fails
 */
const create = async data => {
  try {
    const product = new Products(data);
    return await product.save();
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

/**
 * Find single product with conditions
 * @param {Object} conditions - MongoDB query conditions
 * @param {Object} options - Query options { select?}
 * @returns {Object|null} Product document or null
 * @throws {Error} If the query fails.
 */
const findOne = async (conditions = {}, options = {}) => {
  try {
    const { select } = options;

    let query = Products.findOne(conditions);

    if (select) query = query.select(select);

    return await query.exec();
  } catch (error) {
    throw new Error(`Error finding product: ${error.message}`);
  }
};

/**
 * Find all products without pagination
 * @param {Object} [conditions={}] - MongoDB query conditions
 * @param {Object} [options={}] - Query options { select?}
 * @returns {Array} Array of products
 * @throws {Error} If the query fails.
 */
const findAll = async (conditions = {}, options = {}) => {
  try {
    const { select } = options;

    let query = Products.find(conditions);

    if (select) query = query.select(options.select);

    return await query.exec();
  } catch (error) {
    throw new Error(`Error finding all products: ${error.message}`);
  }
};

/**
 * Find all products without pagination
 * @param {Object} [conditions={}] - MongoDB query conditions
 * @param {Object} [data={}] - Data to update
 * @returns {Object|null} Updated product document or null
 * @throws {Error} If the query fails.
 */
const updateOne = async (conditions = {}, data) => {
  try {
    let query = Products.findOneAndUpdate(conditions, data, {
      new: true,
      runValidators: true
    });

    return await query.exec();
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  updateOne
};
