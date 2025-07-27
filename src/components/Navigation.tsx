import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaBars, FaTimes, FaUser, FaChartLine, FaDollarSign, FaChartBar } from 'react-icons/fa';

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
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

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
        { path: '/progress', label: 'Progress', icon: FaChartBar },
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
                            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight">
                                Eloquent AI
                            </h1>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSignIn}
                                className="px-6 py-2 bg-white text-black hover:bg-black hover:text-white border border-white rounded-xl font-semibold transition-all duration-300"
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
                        <div className="md:hidden relative" ref={menuRef}>
                            <button
                                className="p-2 text-zinc-300 hover:text-white transition-colors duration-200"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </button>

                            {/* Mobile Navigation Dropdown */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-zinc-700/50 shadow-2xl py-2 z-50"
                                    >
                                        <div className="px-2 space-y-1">
                                            <button
                                                onClick={handleSignIn}
                                                className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200 text-sm"
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                onClick={handleGetStarted}
                                                className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200 text-sm"
                                            >
                                                Get Started
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
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
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNavigation('/dashboard')}
                        style={{ cursor: 'pointer' }}
                    >
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
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
                    <div className="md:hidden relative" ref={menuRef}>
                        <button
                            className="p-2 text-zinc-300 hover:text-white transition-colors duration-200"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>

                        {/* Mobile Navigation Dropdown */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-zinc-700/50 shadow-2xl py-2 z-50"
                                >
                                    <div className="px-2 space-y-1">
                                        {/* Navigation Links */}
                                        {navItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <button
                                                    key={item.path}
                                                    onClick={() => handleNavigation(item.path)}
                                                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                                                        isCurrentPath(item.path)
                                                            ? 'bg-blue-600/20 text-blue-400'
                                                            : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                                                    }`}
                                                >
                                                    <Icon className="text-xs" />
                                                    <span>{item.label}</span>
                                                </button>
                                            );
                                        })}

                                        {/* Back Button (if needed) */}
                                        {showBackButton && (
                                            <>
                                                <div className="border-t border-zinc-700/50 my-1"></div>
                                                <button
                                                    onClick={() => navigate(backButtonPath)}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200 text-sm"
                                                >
                                                    <FaArrowLeft className="text-xs" />
                                                    <span>{backButtonText}</span>
                                                </button>
                                            </>
                                        )}

                                        {/* Logout Button */}
                                        <div className="border-t border-zinc-700/50 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-all duration-200 text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
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
