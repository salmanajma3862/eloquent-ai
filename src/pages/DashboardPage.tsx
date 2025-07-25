import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaRocket, FaTrophy, FaChartLine, FaClock, FaFileAlt, FaUser, FaIdCard, FaPlay } from 'react-icons/fa';
import { getUserSessions } from '../lib/api';
import SessionCard from '../components/SessionCard';

interface Session {
    _id: string;
    topicText: string;
    createdAt: string;
    analysis?: {
        overallBandScore: number;
    };
    status: string;
    audioUrl?: string;
}

const DashboardPage: React.FC = () => {
    const { userInfo, logout, token } = useUserStore();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Determine if the practice button should be disabled (freemium logic)
    const isPracticeDisabled = userInfo?.subscription?.plan === 'free' && userInfo?.totalSessions >= 3;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Fetch user sessions on component mount
    useEffect(() => {
        const fetchSessions = async () => {
            if (!token || !userInfo) {
                navigate('/login');
                return;
            }

            try {
                const response = await getUserSessions(token);
                setSessions(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch session history.');
                console.error('Sessions fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessions();
    }, [token, userInfo, navigate]);

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

    // Early return if userInfo is not available
    if (!userInfo) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-zinc-100">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
                />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-50 bg-zinc-900/70 backdrop-blur-2xl border-b border-zinc-700/30 shadow-2xl"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <FaGraduationCap className="text-white text-lg" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
                                Eloquent AI
                            </h1>
                        </motion.div>
                        <div className="flex items-center space-x-4">
                            <div className="text-zinc-300 font-medium text-lg">
                                {userInfo?.name}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
            >
                {/* Hero Welcome Section */}
                <motion.div
                    variants={cardVariants}
                    className="bg-gradient-to-br from-zinc-900/60 via-zinc-800/40 to-zinc-900/60 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-2xl p-8 lg:p-12 mb-8 text-center relative overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-3 scale-105" />
                    </div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="mb-8"
                        >
                            <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                                Welcome back, {userInfo?.name}!
                            </h2>
                            <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                                Ready to elevate your IELTS speaking skills? Your journey to excellence continues here.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quick Stats Overview */}
                <motion.div
                    variants={cardVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    {[
                        {
                            value: sessions.length,
                            label: "Total Tests",
                            icon: FaFileAlt,
                            gradient: "from-blue-600 to-indigo-600"
                        },
                        {
                            value: sessions.filter(s => s.analysis?.overallBandScore).length > 0
                                ? (sessions.filter(s => s.analysis?.overallBandScore).reduce((acc, s) => acc + (s.analysis?.overallBandScore || 0), 0) / sessions.filter(s => s.analysis?.overallBandScore).length).toFixed(1)
                                : "N/A",
                            label: "Average Score",
                            icon: FaChartLine,
                            gradient: "from-emerald-600 to-green-600"
                        },
                        {
                            value: sessions.filter(s => s.status === 'completed').length,
                            label: "Completed",
                            icon: FaTrophy,
                            gradient: "from-yellow-600 to-orange-600"
                        }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 text-center group hover:border-zinc-600/50 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="text-white text-lg" />
                            </div>
                            <div className="text-3xl font-bold text-zinc-100 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-zinc-400 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    variants={cardVariants}
                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8 mb-8 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        className="mb-6"
                    >
                        <FaRocket className="text-4xl text-blue-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-zinc-100 mb-2">Ready for Your Next Challenge?</h3>
                        <p className="text-zinc-400">Take another IELTS speaking test and track your improvement</p>
                    </motion.div>

                    <motion.button
                        whileHover={{
                            scale: isPracticeDisabled ? 1 : 1.05,
                            boxShadow: isPracticeDisabled ? undefined : "0 20px 40px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={{ scale: isPracticeDisabled ? 1 : 0.95 }}
                        disabled={isPracticeDisabled}
                        onClick={() => navigate('/test')}
                        className={`px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg relative overflow-hidden group ${
                            isPracticeDisabled
                                ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed shadow-zinc-500/25'
                                : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-blue-500/25'
                        }`}
                    >
                        {!isPracticeDisabled && (
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        )}
                        <span className="relative flex items-center justify-center space-x-2">
                            <FaPlay />
                            <span>Start New Practice Session</span>
                        </span>
                    </motion.button>
                    {isPracticeDisabled && (
                        <p className="text-zinc-400 mt-4 text-sm">
                            You have used all your free tests. Upgrade to premium for unlimited practice!
                        </p>
                    )}
                </motion.div>

                {/* Test History Section */}
                <motion.div
                    variants={cardVariants}
                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8 mb-8"
                >
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                            <FaClock className="text-white" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-zinc-100">Your Test History</h3>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/30 p-6 animate-pulse"
                                >
                                    <div className="h-4 bg-zinc-700 rounded mb-4"></div>
                                    <div className="h-3 bg-zinc-700 rounded mb-2"></div>
                                    <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 text-center"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.5, repeat: 3 }}
                                className="text-red-400 mb-6"
                            >
                                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.div>
                            <h4 className="text-xl font-bold text-zinc-100 mb-4">Error Loading History</h4>
                            <p className="text-red-400 mb-6">{error}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg"
                            >
                                Try Again
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && sessions.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 border border-zinc-700/30 rounded-2xl p-12 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mb-8"
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaRocket className="text-3xl text-white" />
                                </div>
                                <h4 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Begin Your Journey?</h4>
                                <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto">
                                    You haven't completed any tests yet. Take your first IELTS speaking test and discover your potential!
                                </p>
                            </motion.div>
                            <motion.button
                                whileHover={{
                                    scale: isPracticeDisabled ? 1 : 1.05,
                                    boxShadow: isPracticeDisabled ? undefined : "0 20px 40px rgba(59, 130, 246, 0.4)"
                                }}
                                whileTap={{ scale: isPracticeDisabled ? 1 : 0.95 }}
                                disabled={isPracticeDisabled}
                                onClick={() => navigate('/test')}
                                className={`px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg relative overflow-hidden group ${
                                    isPracticeDisabled
                                        ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white'
                                }`}
                            >
                                {!isPracticeDisabled && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                )}
                                <span className="relative flex items-center space-x-2">
                                    <FaPlay />
                                    <span>Take Your First Test</span>
                                </span>
                            </motion.button>
                            {isPracticeDisabled && (
                                <p className="text-zinc-400 mt-4 text-sm">
                                    You have used all your free tests. Upgrade to premium for unlimited practice!
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Sessions List */}
                    {!isLoading && !error && sessions.length > 0 && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {sessions.map((session) => (
                                <motion.div key={session._id} variants={cardVariants}>
                                    <Link to={`/analysis/${session._id}`}>
                                        <SessionCard session={session} />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Account Information */}
                <motion.div
                    variants={cardVariants}
                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <FaUser className="text-white" />
                        </div>
                        <h4 className="text-xl lg:text-2xl font-bold text-zinc-100">Account Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <FaUser className="text-white text-sm" />
                                </div>
                                <p className="text-sm text-zinc-400 font-medium">Email Address</p>
                            </div>
                            <p className="text-zinc-200 font-semibold text-lg">{userInfo?.email}</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                    <FaIdCard className="text-white text-sm" />
                                </div>
                                <p className="text-sm text-zinc-400 font-medium">User ID</p>
                            </div>
                            <p className="text-zinc-200 font-mono text-sm break-all">{userInfo?._id}</p>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DashboardPage;