import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
import { FaRocket, FaTrophy, FaChartLine, FaClock, FaFileAlt, FaPlay } from 'react-icons/fa';
import { getUserSessions } from '../lib/api';
import SessionCard from '../components/SessionCard';

import Navigation from '../components/Navigation';

interface Session {
    _id: string;
    topicText: string;
    createdAt: string;
    analysis?: {
        overallBandScore: number;
    };
    status: string;
    audioUrl?: string;
    suggestedAudioUrl?: string;
}

const DashboardPage: React.FC = () => {
    const { userInfo, token } = useUserStore();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Determine if the practice button should be disabled (freemium logic)
    const isPracticeDisabled = userInfo?.subscription?.plan === 'free' && userInfo?.totalSessions >= 3;

    // Memoize expensive calculations
    const stats = useMemo(() => {
        const scoredSessions = sessions.filter(s => s.analysis?.overallBandScore);
        const completedSessions = sessions.filter(s => s.status === 'completed');

        const averageScore = scoredSessions.length > 0
            ? (scoredSessions.reduce((acc, s) => acc + (s.analysis?.overallBandScore || 0), 0) / scoredSessions.length).toFixed(1)
            : "N/A";

        return {
            totalTests: sessions.length,
            averageScore,
            completedTests: completedSessions.length
        };
    }, [sessions]);

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
            {/* Static Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
            </div>

            {/* Navigation */}
            <Navigation variant="dashboard" />

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 py-8 lg:py-12"
            >
                {/* Hero Welcome Section */}
                <motion.div
                    variants={cardVariants}
                    className="bg-gradient-to-br from-zinc-900/60 via-zinc-800/40 to-zinc-900/60 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-2xl p-8 lg:p-12 mb-8 mx-4 sm:mx-6 lg:mx-8 text-center relative overflow-hidden"
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
                            <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                                Welcome back, {userInfo?.name}!
                            </h2>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                Ready to elevate your IELTS speaking skills?
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quick Stats Overview */}
                <motion.div
                    variants={cardVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mx-4 sm:mx-6 lg:mx-8"
                >
                    {[
                        {
                            value: stats.totalTests,
                            label: "Total Tests",
                            icon: FaFileAlt,
                            gradient: "from-blue-600 to-indigo-600"
                        },
                        {
                            value: stats.averageScore,
                            label: "Average Score",
                            icon: FaChartLine,
                            gradient: "from-emerald-600 to-green-600"
                        },
                        {
                            value: stats.completedTests,
                            label: "Completed",
                            icon: FaTrophy,
                            gradient: "from-yellow-600 to-orange-600"
                        }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 text-center group hover:border-zinc-600/50 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
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
                        </div>
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
                        <FaRocket className="text-3xl text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-zinc-100 mb-2">Ready for Your Next Challenge?</h3>
                        <p className="text-zinc-400">Take another IELTS speaking test and track your improvement</p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        {isPracticeDisabled ? (
                            <Link to="/pricing" className="w-full md:w-auto">
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full md:w-auto px-6 py-3 rounded-xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg relative overflow-hidden group bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-700 hover:from-yellow-700 hover:via-yellow-800 hover:to-orange-800 text-white shadow-yellow-500/25"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center justify-center space-x-2">
                                        <FaTrophy />
                                        <span>Upgrade to Premium</span>
                                    </span>
                                </motion.button>
                            </Link>
                        ) : (
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/test')}
                                className="w-full md:w-auto px-6 py-3 rounded-xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg relative overflow-hidden group bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-blue-500/25"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                <span className="relative flex items-center justify-center space-x-2">
                                    <FaPlay />
                                    <span>Start New Practice Session</span>
                                </span>
                            </motion.button>
                        )}
                    </div>
                    {isPracticeDisabled && (
                        <p className="text-zinc-400 mt-4 text-sm">
                            You have used all your free tests. Upgrade to premium for unlimited practice!
                        </p>
                    )}
                </motion.div>

                {/* Progress Link Section */}
                {!isLoading && sessions.length >= 2 && sessions.some(s => s.analysis?.overallBandScore) && (
                    <motion.div
                        variants={cardVariants}
                        className="mb-8 mx-4 sm:mx-6 lg:mx-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/progress')}
                            className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8 cursor-pointer hover:border-blue-500/50 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FaChartLine className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-300 transition-colors duration-300">
                                            View Your Progress
                                        </h3>
                                        <p className="text-zinc-400 mt-1">
                                            Track your improvement across all IELTS criteria
                                        </p>
                                    </div>
                                </div>
                                <div className="text-zinc-400 group-hover:text-blue-400 transition-colors duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Quick Stats Preview */}
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                    <div className="text-lg font-bold text-blue-400">
                                        {sessions.filter(s => s.analysis?.overallBandScore).length}
                                    </div>
                                    <div className="text-zinc-500 text-xs">Tests</div>
                                </div>
                                <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                    <div className="text-lg font-bold text-green-400">
                                        {sessions.filter(s => s.analysis?.overallBandScore).length > 0
                                            ? Math.max(...sessions.filter(s => s.analysis?.overallBandScore).map(s => s.analysis?.overallBandScore || 0)).toFixed(1)
                                            : 'N/A'
                                        }
                                    </div>
                                    <div className="text-zinc-500 text-xs">Best Score</div>
                                </div>
                                <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                    <div className="text-lg font-bold text-purple-400">
                                        {sessions.filter(s => s.analysis?.overallBandScore).length > 1
                                            ? (() => {
                                                const validSessions = sessions.filter(s => s.analysis?.overallBandScore).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                                                const improvement = (validSessions[validSessions.length - 1].analysis?.overallBandScore || 0) - (validSessions[0].analysis?.overallBandScore || 0);
                                                return `${improvement >= 0 ? '+' : ''}${improvement.toFixed(1)}`;
                                            })()
                                            : 'N/A'
                                        }
                                    </div>
                                    <div className="text-zinc-500 text-xs">Growth</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Empty State - Standalone for new users */}
                {!isLoading && !error && sessions.length === 0 && (
                    <motion.div
                        variants={cardVariants}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 border border-zinc-700/30 rounded-2xl p-12 mx-4 sm:mx-6 lg:mx-8 text-center mb-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-8"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaRocket className="text-2xl text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-100 mb-4">Ready to Begin Your Journey?</h4>
                            <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">
                                Take your first IELTS speaking test and discover your potential!
                            </p>
                        </motion.div>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            {isPracticeDisabled ? (
                                <Link to="/pricing" className="w-full md:w-auto">
                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full md:w-auto px-6 py-3 rounded-xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg relative overflow-hidden group bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-700 hover:from-yellow-700 hover:via-yellow-800 hover:to-orange-800 text-white"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center space-x-2">
                                            <FaTrophy />
                                            <span>Upgrade to Premium</span>
                                        </span>
                                    </motion.button>
                                </Link>
                            ) : (
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/test')}
                                    className="w-full md:w-auto px-6 py-3 rounded-xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg relative overflow-hidden group bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center space-x-2">
                                        <FaPlay />
                                        <span>Take Your First Test</span>
                                    </span>
                                </motion.button>
                            )}
                        </div>
                        {isPracticeDisabled && (
                            <p className="text-zinc-400 mt-4 text-sm">
                                You have used all your free tests. Upgrade to premium for unlimited practice!
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Test History Title - Only show when there are sessions */}
                {!isLoading && !error && sessions.length > 0 && (
                    <motion.div
                        variants={cardVariants}
                        className="mx-4 sm:mx-6 lg:mx-8 mb-8"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <FaClock className="text-white" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-zinc-100">Your Test History</h3>
                        </div>
                    </motion.div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-6 lg:mx-8 mb-8">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-800/50 rounded-xl p-6 animate-pulse"
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
                        className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 mx-4 sm:mx-6 lg:mx-8 mb-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
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
                            className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl border border-red-600/30 transition-all duration-300"
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                )}



                {/* Sessions List - Free from parent container */}
                {!isLoading && !error && sessions.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-6 lg:mx-8"
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
        </div>
    );
};

export default DashboardPage;