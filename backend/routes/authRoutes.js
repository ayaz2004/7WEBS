const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/signup', [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], signup);

router.post('/login', [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Password is required').exists()
], login);

module.exports = router;

const express_book = require('express');
const router_book = express_book.Router();
const { protect } = require('../middleware/authMiddleware');
const { body: body_book } = require('express-validator');
const {
    addBook,
    getAllBooks,
    getBookById,
    addReviewToBook
} = require('../controllers/bookController');

router_book.post('/', [protect, [
    body_book('title', 'Title is required').not().isEmpty(),
    body_book('author', 'Author is required').not().isEmpty(),
    body_book('genre', 'Genre is required').not().isEmpty(),
]], addBook);

router_book.get('/', getAllBooks);

router_book.get('/:id', getBookById);

router_book.post('/:id/reviews', [protect, [
    body_book('rating', 'Rating is required and must be a number from 1 to 5').isInt({ min: 1, max: 5 }),
    body_book('reviewText', 'Review text is required').not().isEmpty()
]], addReviewToBook);

module.exports = router_book;
