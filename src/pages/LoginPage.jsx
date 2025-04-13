import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    // Check if user is already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Use the AuthContext login function
            const result = await login(email, password);
            
            if (result.success) {
                // Navigation will be handled by the useEffect when isAuthenticated changes
                setLoading(false);
            } else {
                setError(result.message || 'Invalid email or password');
                setLoading(false);
            }
        } catch (err) {
            setError('An error occurred during login');
            setLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert('Password reset functionality would be implemented here.');
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        alert('Sign up functionality would be implemented here.');
    };

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    return (
        <div className="w-full min-h-screen bg-indigo-700 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Logo */}
            <div className="text-white text-4xl font-bold mb-8">KLERO</div>
            
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
                    {/* Email Input */}
                    <div className="mb-4">
                        <div className="flex">
                            <div className="bg-yellow-400 p-2 sm:p-3 rounded-l-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                className="flex-1 p-2 sm:p-3 bg-blue-50 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-black text-sm sm:text-base"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-2">
                        <div className="flex">
                            <div className="bg-yellow-400 p-2 sm:p-3 rounded-l-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                className="flex-1 p-2 sm:p-3 bg-blue-50 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-black text-sm sm:text-base"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mb-4 sm:mb-6">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-colors duration-200 transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleSignUp}
                            className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                            Don't have an account? Sign up
                        </button>
                    </div>
                </form>
            </div>

            {/* Support Chat Button */}
            <div className="fixed bottom-4 right-4">
                <button
                    onClick={toggleChat}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            </div>

            {/* Chat Bubble - Conditionally visible */}
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
                        />
                        <button
                            className="bg-indigo-600 text-white p-2 rounded-r-md"
                            onClick={() => alert('Your message has been sent to support.')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

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

export default LoginPage;