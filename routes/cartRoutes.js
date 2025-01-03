// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');

const router = express.Router();

// Add product to cart
router.post('/', addToCart);

// Get cart for a user
router.get('/:userId', getCart);

module.exports = router;