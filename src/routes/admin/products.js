/**
 * Products Routes
 *
 * Defines all product-related API endpoints for admin users.
 * Includes create products.
 *
 * @module productsRoutes
 */

const express = require('express');
const router = express.Router();

const { create } = require('../../controllers/admin/productsController');

const {
  schemaCreateProduct
} = require('../../middleware/validations/products');
const { validate } = require('../../middleware/validate');

// 📦 Products Routes for Amin
router.post('/', validate(schemaCreateProduct), create); // POST /api/admin/products

module.exports = router;
