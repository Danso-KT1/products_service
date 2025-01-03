// routes/productRoutes.js
const express = require('express');
const { createProduct, searchProducts } = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Search for products
router.get('/search', searchProducts);

module.exports = router;