import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Tag, Plus, ArrowLeft, Sparkles } from 'lucide-react';
import api from '../api/index';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // Real API call to the backend
            const response = await api.post('/books', { title, author, genre });
            setSuccess('Book added successfully!');

            // Clear form and navigate to the new book's detail page after a short delay
            setTimeout(() => {
                navigate(`/book/${response.data._id}`);
            }, 1500);

        } catch (err) {
            // Handle errors from the backend
            const errorMessage = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to add book. Please try again.';
            setError(errorMessage);
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page in history
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Back button */}
                    <button
                        onClick={handleBack}
                        className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    {/* Main form container */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-yellow-200/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 to-transparent rounded-3xl"></div>
                        
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl mb-4 shadow-lg">
                                    <Plus className="w-8 h-8 text-gray-700" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-2">
                                    <span>Add New Book</span>
                                    <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                                </h2>
                                <p className="text-gray-600 text-sm">Expand your digital library</p>
                            </div>

                            {/* Success and Error Messages */}
                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title field */}
                                <div className="relative">
                                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'title' ? 'text-yellow-600' : 'text-gray-400'}`}>
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Book Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onFocus={() => setFocusedField('title')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/80 border-2 rounded-xl text-gray-800 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:scale-105 ${focusedField === 'title' ? 'border-yellow-400 shadow-lg shadow-yellow-400/25 bg-white' : 'border-gray-200 focus:border-yellow-400'}`}
                                        required
                                    />
                                </div>

                                {/* Author field */}
                                <div className="relative">
                                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'author' ? 'text-yellow-600' : 'text-gray-400'}`}>
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Author Name"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        onFocus={() => setFocusedField('author')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/80 border-2 rounded-xl text-gray-800 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:scale-105 ${focusedField === 'author' ? 'border-yellow-400 shadow-lg shadow-yellow-400/25 bg-white' : 'border-gray-200 focus:border-yellow-400'}`}
                                        required
                                    />
                                </div>

                                {/* Genre field */}
                                <div className="relative">
                                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'genre' ? 'text-yellow-600' : 'text-gray-400'}`}>
                                        <Tag className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Genre"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        onFocus={() => setFocusedField('genre')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/80 border-2 rounded-xl text-gray-800 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:scale-105 ${focusedField === 'genre' ? 'border-yellow-400 shadow-lg shadow-yellow-400/25 bg-white' : 'border-gray-200 focus:border-yellow-400'}`}
                                        required
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !title || !author || !genre}
                                    className={`w-full py-4 rounded-xl font-semibold text-gray-800 transition-all duration-300 transform relative overflow-hidden group ${isSubmitting || !title || !author || !genre ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 hover:shadow-2xl shadow-lg'}`}
                                >
                                    <div className="relative z-10 flex items-center justify-center space-x-2">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-gray-600 border-t-gray-800 rounded-full animate-spin"></div>
                                                <span>Adding Book...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" />
                                                <span>Add to Library</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {/* Button shine effect */}
                                    {!isSubmitting && title && author && genre && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    )}
                                </button>
                            </form>

                            {/* Progress indicator */}
                            <div className="mt-6 flex justify-center space-x-2">
                                {[title, author, genre].map((field, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${field ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer text */}
                    <p className="text-center text-gray-600 text-sm mt-6">
                        Building your personal digital library, one book at a time ✨
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
