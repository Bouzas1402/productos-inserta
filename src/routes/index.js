const express = require('express');

const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const products = require('./products');
const orders = require('./orders');

const router = express.Router();

// API routes
router.use('/auth', authRoutes); // /api/auth/* (public routes for authentication, register and login)
router.use('/admin', adminRoutes); // /api/admin/* (admin routes)
router.use('/products', products); // /api/products/* (routes for products)
router.use('/orders', orders); // /api/orders/* (routes for orders)

module.exports = router;
