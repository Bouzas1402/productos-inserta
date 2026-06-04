const Orders = require('./models/Orders');

/**
 * Create a new order record
 * @param {Object} data - Order data to create
 * @param {Object} [session] - session mongoose
 * @returns {Document} Created order document
 * @throws {Error} If creation fails
 */
const create = async (data, session = null) => {
  try {
    const order = new Orders(data);

    return await order.save({ session });
  } catch (error) {
    throw new Error(`Error creating order record: ${error.message}`);
  }
};

module.exports = {
  create
};
