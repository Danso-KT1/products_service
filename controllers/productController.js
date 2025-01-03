const Product = require('../models/Product');
const { indexProduct, searchProducts } = require('../services/elasticsearchService');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        await indexProduct(product);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const results = await searchProducts(req.query.q);
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
};