const Book = require('../models/Book');
const Review = require('../models/Review');

// Add new book
exports.addBook = async (req, res) => {
  const book = await Book.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(book);
};

// Get books with pagination and filters
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = new RegExp(genre, 'i');
  const books = await Book.find(filter).skip((page - 1) * limit).limit(parseInt(limit));
  const count = await Book.countDocuments(filter);
  res.json({ total: count, page, pages: Math.ceil(count / limit), data: books });
};

// Get book by ID with reviews and average rating
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ book: book._id }).populate('user', 'username');
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)).toFixed(2);
  res.json({ book, averageRating: avgRating, reviews });
};

// Search books by title or author
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Query required' });
  const regex = new RegExp(query, 'i');
  const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
  res.json({ count: books.length, data: books });
};