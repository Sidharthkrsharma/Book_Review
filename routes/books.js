const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks
} = require('../controllers/bookController');

// Authenticated users can add books
router.post('/', protect, addBook);

// Public routes
router.get('/search', searchBooks);
router.get('/', getBooks);
router.get('/:id', getBookById);


module.exports = router;
