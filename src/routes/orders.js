/**
 * Orders Routes
 *
 * Defines all order-related API endpoints.
 * Includes order creation.
 *
 * @module ordersRoutes
 */

const express = require('express');
const { create } = require('../controllers/ordersController');

const { schemaOrder } = require('../middleware/validations/orders');
const { validate } = require('../middleware/validate');

const { auth } = require('../middleware/auth');

const router = express.Router();

// 💳 ORDERS ROUTES
router.post('/', auth, validate(schemaOrder), create); // POST /api/orders - Create a new order

module.exports = router;
