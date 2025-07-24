const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const {
    addBook,
    getAllBooks,
    getBookById,
    addReviewToBook
} = require('../controllers/bookController');

router.post('/', [protect, [
    body('title', 'Title is required').not().isEmpty(),
    body('author', 'Author is required').not().isEmpty(),
    body('genre', 'Genre is required').not().isEmpty(),
]], addBook);

router.get('/', getAllBooks);

router.get('/:id', getBookById);


router.post('/:id/reviews', [protect, [
    body('rating', 'Rating is required and must be a number from 1 to 5').isInt({ min: 1, max: 5 }),
    body('reviewText', 'Review text is required').not().isEmpty()
]], addReviewToBook);

module.exports = router;
