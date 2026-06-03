/**
 * Orders Controller
 *
 * Manages order operation including creation.
 *
 * @module ordersController
 */

const ApiResponse = require('../utils/ApiResponse');
const ordersService = require('../services/ordersService');

/**
 * Create a new order
 * @route POST /api/orders/create
 * @access Private (customer and admin role)
 */
const create = async (req, res) => {
  try {
    const userId = req.user._id;
    const { body } = req;

    const result = await ordersService.create({
      ...body,
      userId
    });

    return ApiResponse.created(res, result, 'Order created successfully');
  } catch (error) {
    if (error.message.includes('Product not found')) {
      return ApiResponse.notFound(res, 'Product not found');
    }
    if (error.message.includes('Insufficient stock')) {
      return ApiResponse.conflict(res, 'Insufficient stock');
    }
    return ApiResponse.error(res, 'Error retrieving transactions');
  }
};

module.exports = {
  create
};
