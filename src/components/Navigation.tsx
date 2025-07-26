import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaArrowLeft, FaBars, FaTimes, FaUser, FaChartLine, FaDollarSign } from 'react-icons/fa';

interface NavigationProps {
    variant?: 'landing' | 'dashboard';
    showBackButton?: boolean;
    backButtonText?: string;
    backButtonPath?: string;
}

const Navigation: React.FC<NavigationProps> = React.memo(({
    variant = 'dashboard',
    showBackButton = false,
    backButtonText = 'Back to Dashboard',
    backButtonPath = '/dashboard'
}) => {
    const { userInfo, logout } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const handleSignIn = () => {
        navigate('/login');
        setIsOpen(false);
    };

    const handleGetStarted = () => {
        navigate('/signup');
        setIsOpen(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    // Navigation items for authenticated users
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: FaChartLine },
        { path: '/profile', label: 'Profile', icon: FaUser },
        { path: '/pricing', label: 'Pricing', icon: FaDollarSign },
    ];

    const isCurrentPath = (path: string) => location.pathname === path;

    if (variant === 'landing') {
        return (
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-700/50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-lg font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                                Eloquent AI
                            </h1>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSignIn}
                                className="px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200"
                            >
                                Sign In
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGetStarted}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300"
                            >
                                Get Started
                            </motion.button>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors duration-200"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden border-t border-zinc-700/50 mt-4 pt-4 pb-4"
                            >
                                <div className="flex flex-col space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSignIn}
                                        className="w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
                                    >
                                        Sign In
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleGetStarted}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300"
                                    >
                                        Get Started
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        );
    }

    // Dashboard variant for authenticated pages
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-50 bg-zinc-900/70 backdrop-blur-2xl border-b border-zinc-700/30 shadow-2xl"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNavigation('/dashboard')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <FaGraduationCap className="text-white text-sm" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            Eloquent AI
                        </h1>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Navigation Links */}
                        <div className="flex items-center space-x-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={item.path}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNavigation(item.path)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                                            isCurrentPath(item.path)
                                                ? 'bg-blue-600/20 border-blue-600/30 text-blue-400'
                                                : 'bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-600/30 text-zinc-300 hover:text-white'
                                        }`}
                                    >
                                        <Icon className="text-sm" />
                                        <span>{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Back Button (if needed) */}
                        {showBackButton && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(backButtonPath)}
                                className="flex items-center space-x-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl border border-zinc-600/30 transition-all duration-300"
                            >
                                <FaArrowLeft className="text-sm" />
                                <span>{backButtonText}</span>
                            </motion.button>
                        )}

                        {/* Logout Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl border border-red-600/30 transition-all duration-300"
                        >
                            Logout
                        </motion.button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-zinc-700/50 mt-4 pt-4 pb-4"
                        >
                            <div className="flex flex-col space-y-3">
                                {/* Navigation Links */}
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.button
                                            key={item.path}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleNavigation(item.path)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                                isCurrentPath(item.path)
                                                    ? 'bg-blue-600/20 border border-blue-600/30 text-blue-400'
                                                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                                            }`}
                                        >
                                            <Icon className="text-sm" />
                                            <span>{item.label}</span>
                                        </motion.button>
                                    );
                                })}

                                {/* Back Button (if needed) */}
                                {showBackButton && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate(backButtonPath)}
                                        className="w-full flex items-center space-x-3 px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
                                    >
                                        <FaArrowLeft className="text-sm" />
                                        <span>{backButtonText}</span>
                                    </motion.button>
                                )}

                                {/* Logout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-600/30 transition-all duration-300"
                                >
                                    Logout
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}, (prevProps, nextProps) => {
    // Only re-render if props actually change
    return prevProps.variant === nextProps.variant &&
           prevProps.showBackButton === nextProps.showBackButton &&
           prevProps.backButtonText === nextProps.backButtonText &&
           prevProps.backButtonPath === nextProps.backButtonPath;
});

export default Navigation;
