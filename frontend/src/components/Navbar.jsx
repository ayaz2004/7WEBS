import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, Home, Library, Plus, User, Menu, X, Search, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
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

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-yellow-200' 
        : 'bg-gradient-to-r from-yellow-50 via-white to-amber-50'
    }`}>
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400">
        <div className="h-full bg-gradient-to-r from-yellow-300 to-amber-500 animate-pulse"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                <Book className="text-white" size={20} />
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-yellow-400 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                BookReview
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side - Search and User Menu */}
          <div className="flex items-center space-x-4">
            
            {/* Search Button */}
            <button className="hidden sm:flex items-center space-x-2 bg-yellow-100 hover:bg-yellow-200 text-gray-700 px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <Search size={16} />
              <span className="text-sm">Search</span>
            </button>

            {/* User Menu (Authenticated) */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <User className="text-yellow-600" size={14} />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-yellow-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    
                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 hover:bg-yellow-50 transition-colors duration-200">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-2xl bg-yellow-100 hover:bg-yellow-200 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white'
                        : 'text-gray-700 hover:bg-yellow-100'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Search */}
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-yellow-100 transition-colors duration-300">
                <Search size={20} />
                <span>Search Books</span>
              </button>

              {/* Mobile User Menu (if authenticated) */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-4 py-2 mb-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-yellow-100 transition-colors duration-300">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition-colors duration-300"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {(isUserMenuOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        ></div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;