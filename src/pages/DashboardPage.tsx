import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
    const { userInfo, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
                delayChildren: 0.2,
                when: "beforeChildren"
            }
        }
    } as const;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "tween",
                duration: 0.5,
                ease: "easeOut"
            }
        }
    } as const;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/70 backdrop-blur-xl border-b border-slate-700/50 shadow-lg"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                Eloquent AI
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-slate-300 font-medium">
                                {userInfo?.name}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 shadow-lg shadow-blue-500/25"
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                        
                        <div className="relative px-6 py-8 sm:p-8">
                            {/* Welcome Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                                    Welcome back, {userInfo?.name}!
                                </h2>
                                <p className="text-slate-400 text-lg">
                                    Ready to improve your IELTS speaking skills? Let's continue your journey.
                                </p>
                            </motion.div>
                            
                            {/* Action Cards */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                            >
                                <motion.div
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                            <div className="w-6 h-6 bg-blue-400 rounded-full animate-pulse" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Start Practice
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-6">
                                            Begin your IELTS speaking practice session with AI-powered feedback
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/25"
                                        >
                                            Start Now
                                        </motion.button>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                                            <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            View Progress
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-6">
                                            Track your improvement and see detailed analytics of your performance
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-green-500/25"
                                        >
                                            View Progress
                                        </motion.button>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                            <div className="w-6 h-6 bg-purple-400 rounded-full animate-pulse" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Settings
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-6">
                                            Customize your learning experience and preferences
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
                                        >
                                            Settings
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            {/* Account Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 p-6 rounded-xl"
                            >
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                                    Account Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-400">Email Address</p>
                                        <p className="text-slate-200 font-medium">{userInfo?.email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-400">User ID</p>
                                        <p className="text-slate-200 font-mono text-sm">{userInfo?._id}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;