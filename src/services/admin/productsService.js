/**
 * Orders Service
 *
 * Business logic for products, including creation.
 *
 * @module productsService
 */

const productsRepository = require('../../repositories/productsRepository');

/**
 * Get product by ID
 * @param {Object} data - { name, description?, price, stock }
 * @returns {Object||null} Product data
 */
const create = async data => {
  const prd = {};
  try {
    const { name, description, price, stock } = data;
    prd.name = name;
    if (description) prd.description = description;
    prd.price = price;
    prd.stock = stock;

    const product = await productsRepository.create(prd);

    return product;
  } catch (err) {
    throw new Error(`Error creating product: ${err.message}`);
  }
};

module.exports = {
  create
};
