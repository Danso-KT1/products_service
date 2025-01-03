// index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const errorMiddleware = require('./middleware/auth'); // Error handling middleware
const { connectRabbitMQ } = require('./services/rabbitmqService');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3004;

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Connect to RabbitMQ
connectRabbitMQ();

// Define Routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});