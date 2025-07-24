const mongoose = require('mongoose');
const Book = require('./Book');

const ReviewSchema = new mongoose.Schema({
    reviewText: {
        type: String,
        required: [true, 'Please provide review text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide a rating between 1 and 5']
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

ReviewSchema.statics.calculateAverageRating = async function(bookId) {
    const stats = await this.aggregate([
        {
            $match: { book: bookId }
        },
        {
            $group: {
                _id: '$book',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        if (stats.length > 0) {
            await Book.findByIdAndUpdate(bookId, {
                reviewCount: stats[0].nRating,
                averageRating: stats[0].avgRating.toFixed(1) 
            });
        } else {
            await Book.findByIdAndUpdate(bookId, {
                reviewCount: 0,
                averageRating: 0
            });
        }
    } catch (err) {
        console.error(err);
    }
};

ReviewSchema.post('save', function() {
    this.constructor.calculateAverageRating(this.book);
});

ReviewSchema.post('remove', function() {
    this.constructor.calculateAverageRating(this.book);
});

module.exports = mongoose.model('Review', ReviewSchema);
