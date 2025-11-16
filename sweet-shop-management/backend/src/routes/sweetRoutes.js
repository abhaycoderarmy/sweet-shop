const express = require('express');
const router = express.Router();
const {
  getAllSweets,
  getSweet,
  createSweet,
  updateSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetController');
const { sweetCreateValidation, sweetUpdateValidation, searchValidation } = require('../utils/validators');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllSweets);
router.get('/search', searchValidation, searchSweets);
router.get('/:id', getSweet);

// Protected routes (authenticated users)
// Accept multipart/form-data with optional `image` file
router.post('/', protect, upload.single('image'), sweetCreateValidation, createSweet);
router.put('/:id', protect, upload.single('image'), sweetUpdateValidation, updateSweet);
router.post('/:id/purchase', protect, purchaseSweet);

// Admin only routes
router.delete('/:id', protect, adminOnly, deleteSweet);
router.post('/:id/restock', protect, adminOnly, restockSweet);

module.exports = router;