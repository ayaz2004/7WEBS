import React from 'react';
import { Star, Tag } from 'lucide-react';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.round(rating);
    const emptyStars = totalStars - fullStars;

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            ))}
        </div>
    );
};

const BookCard = ({ book, onSelectBook }) => (
    <div 
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-yellow-200/50 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1" 
        onClick={() => onSelectBook(book._id)}
    >
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-amber-600 transition-colors">{book.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">by {book.author}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 bg-amber-100 px-3 py-1 rounded-full">
                    <Tag size={14} className="text-amber-600" />
                    <span className="text-xs font-semibold text-amber-800">{book.genre}</span>
                </div>
                <div className="flex items-center">
                    <StarRating rating={book.averageRating} />
                    <span className="text-gray-500 ml-2 text-xs">({book.reviewCount})</span>
                </div>
            </div>
        </div>
    </div>
);

export default BookCard;