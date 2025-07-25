import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Star, Calendar, MessageSquare } from 'lucide-react';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMyReviews = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/reviews/myreviews');
            setReviews(response.data);
        } catch (err) {
            setError('Failed to fetch your reviews. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMyReviews();
    }, [fetchMyReviews]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const renderStars = (rating) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    size={16}
                    className={index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-4">
                        Your Contributions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A collection of all the wonderful reviews you've shared with the community.
                    </p>
                </div>

                {loading && <p className="text-center text-gray-500">Loading your reviews...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div 
                                    key={review._id} 
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-yellow-200/50 transition-all duration-300 transform hover:-translate-y-1 p-6"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                        <Link to={`/book/${review.book._id}`} className="group/booklink">
                                            <h3 className="text-2xl font-bold text-gray-800 group-hover/booklink:text-amber-600 transition-colors">{review.book.title}</h3>
                                            <p className="text-sm text-gray-500">by {review.book.author}</p>
                                        </Link>
                                        <div className="flex items-center space-x-2 mt-2 sm:mt-0 text-xs text-gray-500">
                                            <Calendar size={14} />
                                            <span>{formatDate(review.createdAt)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center mb-4">
                                        {renderStars(review.rating)}
                                        <span className="ml-3 font-semibold text-gray-700">{review.rating}/5</span>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed italic">"{review.reviewText}"</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 bg-white/50 rounded-2xl">
                                <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-700">You haven't written any reviews yet.</h3>
                                <p className="text-gray-500 mt-2">
                                    <Link to="/books" className="text-amber-600 hover:underline font-medium">Explore the library</Link> and share your thoughts on a book!
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;