// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// GET /users/profile - Get user profile (protected route)
router.get('/profile', verifyToken, userController.getUserProfile);

// PUT /users/update - Update user profile (protected route)
router.put('/update', verifyToken, userController.updateUserProfile);

// GET /users/:id - Get user by ID (admin route)
router.get('/:id', verifyToken, userController.getUserById);

// More routes as needed...

module.exports = router;
