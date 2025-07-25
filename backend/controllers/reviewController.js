const Review = require('../models/Review');

/**
 * @desc    Get all reviews for the logged-in user
 * @route   GET /api/reviews/myreviews
 * @access  Private
 */
exports.getMyReviews = async (req, res) => {
    try {
       
        const reviews = await Review.find({ user: req.user.id })
            .populate('book', 'title author') 
            .sort({ createdAt: -1 }); 

        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};