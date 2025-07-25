const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMyReviews } = require('../controllers/reviewController');

router.get('/myreviews', protect, getMyReviews);

module.exports = router;