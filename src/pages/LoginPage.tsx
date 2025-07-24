import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login, googleLogin } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/'); // Redirect to dashboard after successful login
        } catch (error: any) {
            setError(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            await googleLogin(credentialResponse.credential);
            navigate('/'); // Redirect to dashboard after successful Google login
        } catch (error: any) {
            setError(error.response?.data?.message || 'An error occurred during Google login');
        }
    };

    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                    
                    <div className="relative p-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-zinc-400 text-lg">
                                Sign in to <span className="text-blue-400 font-semibold">Eloquent AI</span>
                            </p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="space-y-5">
                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Email Address
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Password
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                                >
                                    <p className="text-red-400 text-sm text-center font-medium">
                                        {error}
                                    </p>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                        Signing In...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </motion.button>

                            <div className="relative flex items-center justify-center my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-600/50"></div>
                                </div>
                                <div className="relative bg-slate-800 px-4 text-sm text-slate-400 font-medium">
                                    Or continue with
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <div className="w-full flex justify-center py-4 px-4 border border-slate-600/50 rounded-xl shadow-sm bg-slate-700/30 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        theme="filled_black"
                                        size="large"
                                        width="100%"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="text-center pt-4"
                            >
                                <span className="text-zinc-400">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/signup"
                                        className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-400/30 hover:decoration-blue-300/50 underline-offset-4"
                                    >
                                        Sign up
                                    </Link>
                                </span>
                            </motion.div>
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;