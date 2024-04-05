// utils/authUtils.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Generate JWT token
exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// More utility functions as needed...
