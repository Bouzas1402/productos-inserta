const express = require('express');
const { authAdmin } = require('../../middleware/auth');

const authRoutes = require('./auth');
const productsRoutes = require('./products');

const router = express.Router();

// 🔒 GLOBAL MIDDLEWARE FOR ALL ADMIN ROUTES
// All routes that go through /api/admin/* require admin privileges
router.use(authAdmin); // Must be authenticated as admin

// 📋 ADMIN SUBROUTES
router.use('/auth', authRoutes); // /api/admin/auth/*
router.use('/products', productsRoutes); // /api/admin/products/*

module.exports = router;
