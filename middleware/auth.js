// products-service/middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken; // Export the function directly