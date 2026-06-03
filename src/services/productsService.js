/**
 * Orders Service
 *
 * Business logic for products, including get all.
 *
 * @module productsService
 */

const productsRepository = require('../repositories/productsRepository');

/**
 * Get all products  for users (version 2 only)
 * @param {Object} query={} - { price?, stock? }
 * @returns {Array} Array of products
 */
const getAll = async (query = {}) => {
  const conditions = {};
  try {
    const { stock, price } = query;

    if (stock) conditions.stock = stock;
    if (price) conditions.price = price;

    return await productsRepository.findAll(conditions);
  } catch (err) {
    throw new Error(`Service error retrieving products: ${err.message}`);
  }
};

module.exports = {
  getAll
};
