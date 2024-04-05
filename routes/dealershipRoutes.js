// routes/dealershipRoutes.js
const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealershipController');
const { verifyToken, checkUserRole, checkDealershipOwner } = require('../middleware/authMiddleware');

// POST /dealerships - Create a new dealership (admin route)
router.post('/', verifyToken, checkUserRole, dealershipController.createDealership);

// GET /dealerships - Get all dealerships
router.get('/', dealershipController.getAllDealerships);

// GET /dealerships/:id - Get dealership by ID
router.get('/:id', dealershipController.getDealershipById);

// PUT /dealerships/:id/update - Update dealership by ID (owner route)
router.put('/:id/update', verifyToken, checkDealershipOwner, dealershipController.updateDealershipById);

// DELETE /dealerships/:id - Delete dealership by ID (admin route)
router.delete('/:id', verifyToken, checkUserRole, dealershipController.deleteDealershipById);

// More routes as needed...

module.exports = router;
