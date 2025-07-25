import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, User, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import api from '../api/index'; // Corrected API import path

const AuthPage = () => {
    const [currentPage, setCurrentPage] = useState('signin');
    const [isVisible, setIsVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [signInData, setSignInData] = useState({
        loginIdentifier: '',
        password: ''
    });

    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        try {
            const result = await api.post('/auth/login', signInData);
            setSuccessMessage('Login successful! Welcome back!');
            
            // Directly set the token in localStorage instead of using a context function
            localStorage.setItem('token', result.data.token);
            // It's also good practice to store some user info
            localStorage.setItem('user', JSON.stringify({ username: result.data.username, email: result.data.email }));

            // Redirect to the books page after a short delay
            setTimeout(() => {
                navigate('/books'); 
                // You might want to force a page reload to update the Navbar state
                window.location.reload();
            }, 1000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            setErrors({ general: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        try {
            await api.post('/auth/signup', signUpData);
            setSuccessMessage('Account created successfully! Please sign in.');
            
            setSignUpData({ username: '', email: '', password: '' });
            setTimeout(() => {
                setCurrentPage('signin');
                setSuccessMessage('');
            }, 2000);
            
        } catch (error) {
            const errorMessage = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || 'Something went wrong';
            setErrors({ general: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInChange = (e) => {
        setSignInData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignUpChange = (e) => {
        setSignUpData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        ></div>
                    ))}
                </div>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-30 animate-float"
                        style={{
                            left: `${10 + i * 10}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: '4s'
                        }}
                    ></div>
                ))}
            </div>

            <div className={`max-w-md w-full space-y-8 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-yellow-300/50">
                            <Book className="h-12 w-12 text-gray-700" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                        BookReview Platform
                    </h2>
                    <p className="mt-2 text-gray-600 font-medium">
                        {currentPage === 'signin' ? 'Welcome back to your literary journey' : 'Start your literary journey today'}
                    </p>
                </div>

                <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
                    <button
                        onClick={() => setCurrentPage('signin')}
                        className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                            currentPage === 'signin'
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-700 shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-yellow-600'
                        }`}
                    >
                        <LogIn size={18} />
                        <span>Sign In</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('signup')}
                        className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                            currentPage === 'signup'
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-700 shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-yellow-600'
                        }`}
                    >
                        <UserPlus size={18} />
                        <span>Sign Up</span>
                    </button>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-yellow-200">
                    
                    {errors.general && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg animate-fadeIn">
                            {errors.general}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg animate-fadeIn">
                            {successMessage}
                        </div>
                    )}

                    {currentPage === 'signin' && (
                        <form onSubmit={handleSignIn} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text" name="loginIdentifier" value={signInData.loginIdentifier} onChange={handleSignInChange}
                                        required className="block w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                                        placeholder="Enter username or email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'} name="password" value={signInData.password} onChange={handleSignInChange}
                                        required className="block w-full pl-10 pr-12 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                                        placeholder="Enter password"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-600 transition-colors duration-300">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-gray-700 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? (<div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>) : (<><span>Sign In</span><ArrowRight size={18} /></>)}
                            </button>
                        </form>
                    )}

                    {currentPage === 'signup' && (
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                                    <input type="text" name="username" value={signUpData.username} onChange={handleSignUpChange} required className="block w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300" placeholder="Choose a username" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                                    <input type="email" name="email" value={signUpData.email} onChange={handleSignUpChange} required className="block w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                                    <input type={showPassword ? 'text' : 'password'} name="password" value={signUpData.password} onChange={handleSignUpChange} required minLength={6} className="block w-full pl-10 pr-12 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300" placeholder="Create a password (min 6 characters)" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-600 transition-colors duration-300">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-gray-700 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? (<div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>) : (<><span>Create Account</span><ArrowRight size={18} /></>)}
                            </button>
                        </form>
                    )}
                </div>
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
        </div>
    );
};

export default AuthPage;
