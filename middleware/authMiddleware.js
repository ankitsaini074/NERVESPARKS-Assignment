// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/userModel');
const Dealership = require('../models/dealershipModel');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    
    // Add the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

// Middleware to check user role
exports.checkUserRole = async (req, res, next) => {
  const { role } = req.user;

  if (role === 'admin') {
    next(); // Allow access for admin
  } else {
    res.status(403).json({ message: 'Access denied. User is not an admin.' });
  }
};

// Middleware to check dealership owner
exports.checkDealershipOwner = async (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.user;

  try {
    const dealership = await Dealership.findById(id);
    if (!dealership) {
      return res.status(404).json({ message: 'Dealership not found' });
    }

    if (dealership.owner_id !== user_id) {
      return res.status(403).json({ message: 'Access denied. User is not the owner of this dealership.' });
    }

    next(); // Allow access for dealership owner
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
