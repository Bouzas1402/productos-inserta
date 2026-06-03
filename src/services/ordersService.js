/**
 * Orders Service
 *
 * Business logic for orders operations, including creation
 *
 * @module ordersService
 */

const ordersRepository = require('../repositories/ordersRepository');
const productsRepository = require('../repositories/productsRepository');

/**
 * Create a new order
 * @param {Object} data - { userId, product_id, quantity }
 * @returns {Object||null} Created order data
 */
const create = async data => {
  try {
    const { userId, product_id, quantity } = data;
    const product = await productsRepository.findOne({ _id: product_id });

    if (!product) throw new Error('Product not found');

    const total_amount = quantity * product.price;

    const order = await ordersRepository.create({
      user_id: userId,
      product: { product_id, quantity, unit_price: product.price },
      total_amount
    });

    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};

module.exports = {
  create
};
