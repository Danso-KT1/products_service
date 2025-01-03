const Cart = require('../models/Cart');

// Add product to cart
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error adding to cart', error: error.message });
    }
};

// Get cart items for a user
const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

module.exports = { addToCart, getCart };