import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check authentication status from localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token) {
            setIsAuthenticated(true);
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, []);

    // Component for non-authenticated users
    const UnauthenticatedHome = () => (
        <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Discover Your
                            <span className="block bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                                Next Great Read
                            </span>
                        </h1>
                        <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of book lovers in the ultimate reading community. Rate, review, and discover books that will transform your world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link 
                                to="/auth" 
                                className="bg-white text-amber-800 hover:bg-yellow-50 hover:text-amber-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                            >
                                Start Your Journey
                            </Link>
                            <Link 
                                to="/auth" 
                                className="border-2 border-white text-white hover:bg-white hover:text-amber-800 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BookReview?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to enhance your reading experience
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vast Library</h3>
                            <p className="text-gray-600">Explore thousands of books across all genres, from classics to latest releases.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Reviews</h3>
                            <p className="text-gray-600">Rate and review books with our intelligent system that helps you find your perfect match.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community</h3>
                            <p className="text-gray-600">Connect with fellow readers, share recommendations, and discover new perspectives.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-yellow-500 to-amber-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin?</h2>
                    <p className="text-xl text-yellow-100 mb-8">
                        Join our community today and start your literary adventure
                    </p>
                    <Link 
                        to="/auth" 
                        className="bg-white text-amber-800 hover:bg-yellow-50 hover:text-amber-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>
        </div>
    );

    // Component for authenticated users
    const AuthenticatedHome = () => (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
            {/* Welcome Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Welcome back{user?.username ? `, ${user.username}` : ''}! 📚
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Ready to discover your next favorite book or share your latest read?
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <Link to="/books" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Books</h3>
                            <p className="text-gray-600 text-sm">Explore our vast collection</p>
                        </Link>
                        <Link to="/add-book" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Book</h3>
                            <p className="text-gray-600 text-sm">Share a new discovery</p>
                        </Link>
                        <Link to="/my-reviews" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Reviews</h3>
                            <p className="text-gray-600 text-sm">View your contributions</p>
                        </Link>
                        <Link to="/recommendations" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">For You</h3>
                            <p className="text-gray-600 text-sm">Personalized picks</p>
                        </Link>
                    </div>

                    {/* Featured Content */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Recently Added Books */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
                                <Link to="/books" className="text-yellow-600 hover:text-yellow-700 font-medium">View all</Link>
                            </div>
                            <div className="space-y-4">
                                {/* Placeholder for recent books */}
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">📖</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">Latest Book Title</h4>
                                        <p className="text-sm text-gray-600">by Author Name</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-400">★★★★☆</span>
                                            <span className="text-xs text-gray-500 ml-2">4.2 rating</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Your Activity */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Your Activity</h2>
                                <Link to="/my-reviews" className="text-yellow-600 hover:text-yellow-700 font-medium">View profile</Link>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">Books Reviewed</p>
                                        <p className="text-2xl font-bold text-yellow-600">0</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">Books Added</p>
                                        <p className="text-2xl font-bold text-amber-600">0</p>
                                    </div>
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    return isAuthenticated ? <AuthenticatedHome /> : <UnauthenticatedHome />;
};

export default Home;
