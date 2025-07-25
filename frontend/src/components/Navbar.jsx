import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, Home, Library, Plus, User, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const updateAuthState = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setIsAuthenticated(true);
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
                setUser(null);
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        updateAuthState();
        window.addEventListener('authChange', updateAuthState);
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('authChange', updateAuthState);
        };
    }, []);

    const handleLogout = () => {
        // Clear authentication data from storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Close any open menus
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
        
        // Navigate to the home page
        navigate('/');

        // Force a full page reload. This is the most reliable way to ensure
        // all components reset their state and reflect the logged-out status.
        window.location.reload();
    };

    const navItems = isAuthenticated 
        ? [
            { name: 'Home', path: '/', icon: Home },
            { name: 'Library', path: '/books', icon: Library },
            { name: 'Add Book', path: '/add-book', icon: Plus },
        ]
        : [
            { name: 'Home', path: '/', icon: Home },
            { name: 'Library', path: '/books', icon: Library },
            { name: 'Sign In', path: '/auth', icon: User },
        ];

    const isActivePath = (path) => location.pathname === path;

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-yellow-200' : 'bg-gradient-to-r from-yellow-50 via-white to-amber-50'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400">
                <div className="h-full bg-gradient-to-r from-yellow-300 to-amber-500 animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                                <Book className="text-white" size={20} />
                            </div>
                            <div className="absolute inset-0 bg-yellow-400 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">BookReview</h1>
                            <p className="text-xs text-gray-500 -mt-1">Platform</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = isActivePath(item.path);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${isActive ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white shadow-lg' : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'}`}
                                >
                                    <IconComponent size={18} />
                                    <span>{item.name}</span>
                                    {isActive && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-amber-400 rounded-full"></div>}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                        <User className="text-yellow-600" size={14} />
                                    </div>
                                    {/* Correctly display username */}
                                    <span className="hidden sm:block text-sm font-medium">{user?.username || 'User'}</span>
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-yellow-200 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            {/* Correctly display username and email */}
                                            <p className="text-sm font-medium text-gray-900 truncate">{user?.username || 'User'}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                                        </div>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <LogOut size={16} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : null}
                        <button
                            className="md:hidden p-2 rounded-2xl bg-yellow-100 hover:bg-yellow-200 transition-colors duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-yellow-200 shadow-lg">
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = isActivePath(item.path);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white' : 'text-gray-700 hover:bg-yellow-100'}`}
                                    >
                                        <IconComponent size={20} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {(isUserMenuOpen || isMobileMenuOpen) && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsMobileMenuOpen(false);
                    }}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
