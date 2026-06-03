/**
 * Products Routes
 *
 * Defines all product-related API endpoints.
 * Includes get all products.
 *
 * @module productsRoutes
 */

const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/productsController');

// 📦 PRODUCTS ROUTES
router.get('/', getAll); // GET /api/products

module.exports = router;
