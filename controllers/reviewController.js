const Review = require('../models/Review');
const Book = require('../models/Book');

// Add a review for a book
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const exists = await Review.findOne({ book: bookId, user: req.user._id });
  if (exists) return res.status(400).json({ message: 'Already reviewed' });
  const review = await Review.create({ book: bookId, user: req.user._id, rating, comment });
  res.status(201).json(review);
};

// Update a review (only by owner)
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || !review.user.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });
  review.rating = req.body.rating ?? review.rating;
  review.comment = req.body.comment ?? review.comment;
  await review.save();
  res.json(review);
};

// Delete a review (only by owner)
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || !review.user.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });
  await review.remove();
  res.json({ message: 'Review deleted' });
};
