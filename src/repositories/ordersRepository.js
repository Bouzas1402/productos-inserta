const Orders = require('./models/Orders');

/**
 * Create a new order record
 * @param {Object} data - Order data to create
 * @returns {Document} Created order document
 * @throws {Error} If creation fails
 */
const create = async data => {
  try {
    const order = new Orders(data);

    return await order.save();
  } catch (error) {
    throw new Error(`Error creating order record: ${error.message}`);
  }
};

module.exports = {
  create
};
