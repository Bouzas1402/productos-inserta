/**
 * Products Admin Controller
 *
 * Handles product management operations including creation.
 *
 * @module productsController
 */

const ApiResponse = require('../../utils/ApiResponse');
const productsService = require('../../services/admin/productsService');

/**
 * @desc   Create a new product
 * @route   POST /api/admin/products
 * @access   Private (Admin only)
 */
const create = async (req, res) => {
  try {
    const { body } = req;
    const result = await productsService.create(body);

    return ApiResponse.created(res, result, 'Product created successfully');
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      return ApiResponse.conflict(res, 'Product already exists');
    }
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  create
};
