const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Please provide an author'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Please provide a genre'],
        trim: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);