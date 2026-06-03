/**
 * Products Controller
 *
 * Manages product operations including get all products.
 *
 * @module productsController
 */

const ApiResponse = require('../utils/ApiResponse');
const productsService = require('../services/productsService');

/**
 * @desc    Get all products for users
 * @route   GET /api/products
 * @access  Public
 */
const getAll = async (req, res) => {
  try {
    const { query } = req;
    const products = await productsService.getAll(query);

    return ApiResponse.success(
      res,
      products,
      'Products remittances retrieved successfully'
    );
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  getAll
};
