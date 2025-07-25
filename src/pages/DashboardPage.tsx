import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
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
        <div className="min-h-screen bg-black">
            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-700/50 shadow-lg"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                                Eloquent AI
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-zinc-300 font-medium">
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
                        className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden"
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
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-3">
                                    Welcome back, {userInfo?.name}!
                                </h2>
                                <p className="text-zinc-400 text-lg">
                                    Ready to improve your IELTS speaking skills? Let's continue your journey.
                                </p>
                            </motion.div>
                            
                            {/* Quick Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-8"
                            >
                                <motion.button
                                    whileHover={{ scale: isPracticeDisabled ? 1 : 1.05 }}
                                    whileTap={{ scale: isPracticeDisabled ? 1 : 0.95 }}
                                    disabled={isPracticeDisabled}
                                    onClick={() => navigate('/test')}
                                    className={`px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg ${
                                        isPracticeDisabled
                                            ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed shadow-zinc-500/25'
                                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/25'
                                    }`}
                                >
                                    Start New Practice Session
                                </motion.button>
                                {isPracticeDisabled && (
                                    <p className="text-zinc-400 mt-3 text-sm">
                                        You have used all your free tests. Upgrade to premium for unlimited practice!
                                    </p>
                                )}
                            </motion.div>

                            {/* Test History Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mb-8"
                            >
                                <h3 className="text-2xl font-bold text-zinc-100 mb-6">Your Test History</h3>

                                {/* Loading State */}
                                {isLoading && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-6 animate-pulse">
                                                <div className="h-4 bg-zinc-700 rounded mb-4"></div>
                                                <div className="h-3 bg-zinc-700 rounded mb-2"></div>
                                                <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Error State */}
                                {error && !isLoading && (
                                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">
                                        <p className="text-red-400 mb-4">{error}</p>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}

                                {/* Empty State */}
                                {!isLoading && !error && sessions.length === 0 && (
                                    <div className="bg-zinc-900/30 border border-zinc-700/50 rounded-xl p-8 text-center">
                                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <div className="w-8 h-8 bg-blue-400 rounded-full" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-zinc-100 mb-2">No tests yet</h4>
                                        <p className="text-zinc-400 mb-6">
                                            You haven't completed any tests yet. Start your first one now!
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: isPracticeDisabled ? 1 : 1.05 }}
                                            whileTap={{ scale: isPracticeDisabled ? 1 : 0.95 }}
                                            disabled={isPracticeDisabled}
                                            onClick={() => navigate('/test')}
                                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                                                isPracticeDisabled
                                                    ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                                            }`}
                                        >
                                            Take Your First Test
                                        </motion.button>
                                        {isPracticeDisabled && (
                                            <p className="text-zinc-400 mt-3 text-sm">
                                                You have used all your free tests. Upgrade to premium for unlimited practice!
                                            </p>
                                        )}
                                    </div>
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 p-6 rounded-xl"
                            >
                                <h4 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                                    Account Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-zinc-400">Email Address</p>
                                        <p className="text-zinc-200 font-medium">{userInfo?.email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-zinc-400">User ID</p>
                                        <p className="text-zinc-200 font-mono text-sm">{userInfo?._id}</p>
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