<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
>>>>>>> origin/master

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
<<<<<<< HEAD
    const navigate = useNavigate();

    // Pre-defined credentials
    const VALID_USERNAME = "chanchal";
    const VALID_PASSWORD = "pass@123";

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation
        if (!username || !password) {
=======
    const [chatMessage, setChatMessage] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    // Check if user is already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log("Login attempt:", username, password); // Debug

        // Basic validation
        if (!username.trim() || !password.trim()) {
>>>>>>> origin/master
            setError('Please enter both username and password');
            setLoading(false);
            return;
        }

<<<<<<< HEAD
        // Simulate API call with timeout
        setTimeout(() => {
            // Check credentials against pre-defined values
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                // Set authentication state
                localStorage.setItem('isAuthenticated', 'true');
                // Navigate to dashboard using React Router
                navigate('/dashboard');
            } else {
                setError('Invalid username or password');
                setLoading(false);
            }
        }, 800); // Simulate network delay
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert('Password reset functionality would be implemented here.');
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        alert('Sign up functionality would be implemented here.');
    };

    const handleChatSubmit = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            alert('Your message has been sent to support.');
            // Clear the input field if you add a state for it
=======
        // Use the AuthContext login function
        const result = login(username, password);
        
        if (result.success) {
            console.log("Login successful"); // Debug
            setLoading(false);
            // Navigation will be handled by the useEffect when isAuthenticated changes
        } else {
            console.log("Login failed"); // Debug
            setError(result.message);
            setLoading(false);
>>>>>>> origin/master
        }
    };

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    return (
<<<<<<< HEAD
        <div className="w-full min-h-screen bg-indigo-700 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Logo */}
            <div className="flex justify-center mb-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="w-full px-4 md:px-0">
                    <img src="/Klero Image.png" alt="Klero" className="w-full h-auto" />
                </div>
            </div>
            
            {/* Login Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-1">Sign in</h1>
                <p className="text-center text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">to access Klero</p>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    {error && <div className="mb-4 text-red-500 text-xs sm:text-sm text-center">{error}</div>}

                    {/* Username Input */}
                    <div className="mb-4">
                        <div className="flex">
                            <div className="bg-yellow-400 p-2 sm:p-3 rounded-l-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
=======
        <div className="min-h-screen bg-indigo-700 flex flex-col items-center justify-center p-4">
            {/* Logo/Title */}
            <div className="text-white text-4xl font-bold mb-8 text-center">KLERO</div>
            
            {/* Login Card */}
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-2">Sign in</h1>
                <p className="text-center text-gray-500 mb-6">to access Klero</p>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin}>
                    {/* Username Input */}
                    <div className="mb-4">
                        <div className="flex">
                            <div className="bg-yellow-400 p-3 rounded-l-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
>>>>>>> origin/master
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
<<<<<<< HEAD
                                className="flex-1 p-2 sm:p-3 bg-blue-50 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-black text-sm sm:text-base"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
=======
                                className="flex-1 p-3 bg-blue-50 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
>>>>>>> origin/master
                            />
                        </div>
                    </div>

                    {/* Password Input */}
<<<<<<< HEAD
                    <div className="mb-2">
                        <div className="flex">
                            <div className="bg-yellow-400 p-2 sm:p-3 rounded-l-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
=======
                    <div className="mb-6">
                        <div className="flex">
                            <div className="bg-yellow-400 p-3 rounded-l-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
>>>>>>> origin/master
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                            <input
                                type="password"
<<<<<<< HEAD
                                className="flex-1 p-2 sm:p-3 bg-blue-50 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-black text-sm sm:text-base"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
=======
                                className="flex-1 p-3 bg-blue-50 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
>>>>>>> origin/master
                            />
                        </div>
                    </div>

<<<<<<< HEAD
                    {/* Forgot Password Link */}
                    <div className="mb-4 sm:mb-6">
                        <a 
                            href="#" 
                            className="text-indigo-600 text-xs sm:text-sm hover:text-indigo-800 hover:underline transition-colors duration-200" 
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-end mb-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-colors duration-200 transform hover:scale-105"
=======
                    {/* Login Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-6 py-3 rounded text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
>>>>>>> origin/master
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </div>
<<<<<<< HEAD

                    {/* Sign Up Link */}
                    <div className="text-center text-gray-600 text-xs sm:text-sm">
                        Don't have an account? <a 
                            href="#" 
                            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </a>
                    </div>
                </form>
            </div>

            {/* Chat Button - Always visible */}
            <div className="fixed bottom-4 right-4 z-50">
                <button 
                    onClick={toggleChat}
                    className="bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
=======
                </form>

                {/* Forgot Password / Sign Up */}
                <div className="mt-4 flex justify-between text-sm">
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                        Forgot password?
                    </a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                        Sign Up
                    </a>
                </div>
            </div>

            {/* Chat Button */}
            <div className="fixed bottom-4 right-4">
                <button 
                    onClick={toggleChat}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
>>>>>>> origin/master
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            </div>

<<<<<<< HEAD
            {/* Chat Bubble - Conditionally visible */}
            {chatVisible && (
                <div className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 animate-fade-in">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg mb-2 sm:mb-4 max-w-xs">
                        <p className="text-xs sm:text-sm text-black">Welcome back, let us know if you have any questions.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-1 sm:p-2 flex items-center">
                        <input
                            type="text"
                            className="bg-white flex-1 p-1.5 sm:p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-black text-xs sm:text-sm"
                            placeholder="Write a message..."
                            onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(e)}
                        />
                        <button 
                            className="bg-white ml-1 sm:ml-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                            onClick={handleChatSubmit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
=======
            {/* Chat Window */}
            {chatVisible && (
                <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
                    <div className="mb-4">
                        <p className="text-sm">Welcome back, let us know if you have any questions.</p>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Write a message..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <button 
                            className="bg-indigo-600 text-white p-2 rounded-r-md"
                            onClick={() => {
                                if (chatMessage.trim()) {
                                    // Here you would typically send the message to a backend
                                    console.log('Message sent:', chatMessage);
                                    setChatMessage('');
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
>>>>>>> origin/master
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

<<<<<<< HEAD
// Add this at the end of your CSS file or in your Tailwind config
const customStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
`;

=======
>>>>>>> origin/master
export default LoginPage;