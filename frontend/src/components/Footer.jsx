import React, { useState, useEffect } from 'react';
import { Book, Star, Heart, Coffee } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialIcons = [
    { icon: Book, label: 'Library' },
    { icon: Star, label: 'Reviews' },
    { icon: Heart, label: 'Favorites' },
    { icon: Coffee, label: 'Discussion' }
  ];

  return (
    <footer className={`relative bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 text-gray-800 overflow-hidden transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent transform -skew-x-12 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Light yellow border animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent">
        <div className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Social Icons */}
        <div className="flex justify-center space-x-8 mb-6">
          {socialIcons.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-125"
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <div className="relative">
                  <div className={`p-3 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-lg transition-all duration-300 ${hoveredIcon === index ? 'shadow-yellow-300/50 shadow-2xl' : 'shadow-yellow-200/30'}`}>
                    <IconComponent 
                      size={24} 
                      className={`text-gray-700 transition-all duration-300 ${hoveredIcon === index ? 'animate-bounce' : ''}`} 
                    />
                  </div>
                  {hoveredIcon === index && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold animate-fadeIn">
                      {item.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative line */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          <div className="mx-4">
            <Book className="text-yellow-500 animate-pulse" size={20} />
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            BookReview Platform
          </h3>
          
          <p className="text-gray-600 text-lg font-medium">
            Discover • Review • Share Your Literary Journey
          </p>

          {/* Copyright with light yellow glow effect */}
          <div className="relative inline-block">
            <p className="text-sm text-gray-600 relative z-10 transition-all duration-300 hover:text-yellow-600">
              &copy; {new Date().getFullYear()} BookReview Platform. All rights reserved.
            </p>
            <div className="absolute inset-0 bg-yellow-300 opacity-0 blur-xl transition-opacity duration-300 hover:opacity-20"></div>
          </div>

          {/* Additional links */}
          <div className="flex justify-center space-x-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link, index) => (
              <button
                key={index}
                className="text-gray-600 hover:text-yellow-600 transition-all duration-300 transform hover:scale-110 hover:underline underline-offset-4 decoration-yellow-400"
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s'
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;