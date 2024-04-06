
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/register - Register a new user
router.post('/register', authController.registerUser);

// POST /auth/login - Login user and generate JWT token
router.post('/login', authController.loginUser);

// POST /auth/logout - Logout user (invalidate JWT token)
router.post('/logout', authController.logoutUser);

module.exports = router;
