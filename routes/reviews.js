const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// POST /books/:id/reviews - Add review
router.post('/books/:id/reviews', protect, addReview);

// PUT /reviews/:id - Update review
router.put('/:id', protect, updateReview);

// DELETE /reviews/:id - Delete review
router.delete('/:id', protect, deleteReview);

module.exports = router;
