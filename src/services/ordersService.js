/**
 * Orders Service
 *
 * Business logic for orders operations, including creation
 *
 * @module ordersService
 */

const mongoose = require('mongoose');

const ordersRepository = require('../repositories/ordersRepository');
const productsRepository = require('../repositories/productsRepository');

/**
 * Create a new order
 * @param {Object} data - { userId, product_id, quantity }
 * @returns {Object||null} Created order data
 */
const create = async data => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      const { userId, product_id, quantity } = data;

      const product = await productsRepository.findOne({ _id: product_id });

      if (!product) {
        throw new Error('Product not found');
      }

      await productsRepository.updateOne(
        { _id: product_id },
        { $inc: { stock: -quantity } },
        session
      );

      const total_amount = (quantity * product.price).toFixed(2);

      const order = await ordersRepository.create(
        {
          user_id: userId,
          product: {
            product_id,
            quantity,
            unit_price: product.price
          },
          total_amount
        },
        session
      );

      return order;
    });

    return result;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  create
};
