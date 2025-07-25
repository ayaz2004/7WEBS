import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, Star, Calendar, Tag, User, Edit3, MessageCircle, ArrowLeft } from 'lucide-react';
import api from '../api/index';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Check if the user is logged in by looking for the token
    const isAuthenticated = !!localStorage.getItem('token');

    const fetchBookDetails = useCallback(async () => {
        try {
            const res = await api.get(`/books/${id}`);
            setBook(res.data.book);
            setReviews(res.data.reviews.reverse()); // Show newest reviews first
        } catch (err) {
            console.error('Error fetching book', err);
            setError('Could not load book details. Please try again later.');
        }
    }, [id]);

    useEffect(() => {
        setIsVisible(true);
        fetchBookDetails();
    }, [id, fetchBookDetails]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('You must be logged in to submit a review.');
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await api.post(`/books/${id}/reviews`, { rating, reviewText });
            // Update state with the fresh data from the backend
            setBook(res.data.book);
            setReviews(res.data.reviews.reverse());
            setReviewText('');
            setRating(5);
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderStars = (currentRating, interactive = false, size = 20) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={size}
                className={`transition-all duration-200 ${interactive ? 'cursor-pointer' : ''} ${
                    index < (interactive ? (hoveredStar || currentRating) : currentRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                } ${interactive ? 'hover:scale-110' : ''}`}
                onMouseEnter={() => interactive && setHoveredStar(index + 1)}
                onMouseLeave={() => interactive && setHoveredStar(0)}
                onClick={() => interactive && setRating(index + 1)}
            />
        ));
    };

    if (error) {
        return <div className="text-center text-red-500 py-20">{error}</div>;
    }

    if (!book) {
        return <div className="text-center text-gray-500 py-20">Loading book...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent transform -skew-x-12 animate-pulse"></div>
            </div>

            <div className={`relative z-10 max-w-6xl mx-auto px-6 py-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-all duration-300 group"
                >
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* Book Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-200 p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200 to-transparent rounded-bl-full opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200 to-transparent rounded-tr-full opacity-50"></div>
                    
                    <div className="relative z-10 grid md:grid-cols-3 gap-8 items-start">
                        {/* Book Cover Placeholder */}
                        <div className="md:col-span-1">
                            <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-8 aspect-[3/4] flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                                <div className="text-center text-white">
                                    <Book size={60} className="mx-auto mb-4" />
                                    <p className="font-bold text-lg">{book.title}</p>
                                </div>
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-4 leading-tight">
                                    {book.title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
                                        <User size={16} className="text-yellow-600" />
                                        <span className="text-gray-700 font-medium">{book.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-full">
                                        <Tag size={16} className="text-amber-600" />
                                        <span className="text-gray-700 font-medium">{book.genre}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
                                        <Calendar size={16} className="text-orange-600" />
                                        <span className="text-gray-700 font-medium">{formatDate(book.createdAt)}</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                        <Book className="mr-2 text-yellow-600" size={20} />
                                        Average Rating
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        {renderStars(book.averageRating, false, 24)}
                                        <span className="text-lg font-bold text-gray-700">{book.averageRating.toFixed(1)}</span>
                                        <span className="text-gray-500">({book.reviewCount} reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Add Review Form */}
                    {isAuthenticated && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-200 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-200 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-6 flex items-center">
                                    <Edit3 className="mr-3 text-yellow-600" size={24} />
                                    Share Your Thoughts
                                </h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-3">Your Rating</label>
                                        <div className="flex items-center space-x-2">
                                            {renderStars(rating, true, 28)}
                                            <span className="ml-4 text-lg font-medium text-gray-600">{rating} star{rating !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-3">Your Review</label>
                                        <textarea 
                                            value={reviewText} 
                                            onChange={(e) => setReviewText(e.target.value)} 
                                            placeholder="Share your thoughts about this book..."
                                            className="w-full p-4 border-2 border-yellow-200 rounded-2xl focus:border-yellow-400 focus:outline-none resize-none h-32 bg-yellow-50/50 transition-all duration-300"
                                            required 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <MessageCircle size={20} />
                                                <span>Submit Review</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Reviews List */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-200 p-8 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-200 to-transparent rounded-tr-full opacity-50"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-6 flex items-center">
                                <MessageCircle className="mr-3 text-yellow-600" size={24} />
                                Community Reviews
                            </h3>
                            <div className="space-y-6 max-h-96 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <MessageCircle className="text-yellow-600" size={24} />
                                        </div>
                                        <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your thoughts!</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review._id} className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200 transform transition-all duration-300 hover:scale-102 hover:shadow-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-2">
                                                    {renderStars(review.rating, false, 16)}
                                                    <span className="text-sm font-medium text-gray-600">{review.rating}/5</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                    <Calendar size={12} />
                                                    <span>{formatDate(review.createdAt)}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed mb-3">{review.reviewText}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
                                                <User size={14} />
                                                <span>by {review.user.username}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #fef3c7; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
                .hover\\:scale-102:hover { transform: scale(1.02); }
            `}</style>
        </div>
    );
};

export default BookDetail;
