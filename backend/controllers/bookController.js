const Book = require('../models/Book');
const Review = require('../models/Review');
const { validationResult } = require('express-validator');

exports.addBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, author, genre } = req.body;
        const newBook = new Book({ title, author, genre });
        const book = await newBook.save();
        res.status(201).json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt'; 
    const order = req.query.order === 'asc' ? 1 : -1; 

    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.author) filter.author = { $regex: req.query.author, $options: 'i' }; 

    try {
        const books = await Book.find(filter)
            .sort({ [sortBy]: order })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalBooks = await Book.countDocuments(filter);

        res.json({
            books,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        const reviews = await Review.find({ book: req.params.id }).populate('user', 'username');
        res.json({ book, reviews });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.addReviewToBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
 
        const existingReview = await Review.findOne({ book: req.params.id, user: req.user.id });
        if (existingReview) {
            return res.status(400).json({ msg: 'You have already reviewed this book' });
        }

        const { rating, reviewText } = req.body;
        const newReview = new Review({
            rating,
            reviewText,
            book: req.params.id,
            user: req.user.id 
        });

        await newReview.save();
       
        const updatedBook = await Book.findById(req.params.id);
        const reviews = await Review.find({ book: req.params.id }).populate('user', 'username');

        res.status(201).json({ book: updatedBook, reviews });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
