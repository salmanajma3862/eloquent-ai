import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCrown, FaChartLine, FaRocket } from 'react-icons/fa';
import Navigation from '../components/Navigation';

const ProfilePage: React.FC = () => {
    const { userInfo } = useUserStore();
    const navigate = useNavigate();



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
                duration: 0.5,
                ease: "easeOut"
            }
        }
    } as const;

    if (!userInfo) {
        navigate('/login');
        return null;
    }

    const isFreeUser = userInfo.subscription?.plan === 'free';
    const testsRemaining = isFreeUser ? Math.max(0, 3 - userInfo.totalSessions) : null;

    return (
        <div className="min-h-screen bg-black text-zinc-200">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

            {/* Navigation */}
            <Navigation variant="dashboard" showBackButton={true} backButtonText="Back to Dashboard" />

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
            >
                {/* Page Header */}
                <motion.div
                    variants={cardVariants}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        Your Profile
                    </h2>
                    <p className="text-zinc-400 text-xl">
                        Manage your account and track your progress
                    </p>
                </motion.div>

                {/* Account Details Card */}
                <motion.div
                    variants={cardVariants}
                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8 mb-8"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <FaUser className="text-white text-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-100">Account Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Full Name</label>
                            <div className="flex items-center space-x-3 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                                <FaUser className="text-zinc-400" />
                                <span className="text-zinc-200 font-medium">{userInfo.name}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Email Address</label>
                            <div className="flex items-center space-x-3 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                                <FaEnvelope className="text-zinc-400" />
                                <span className="text-zinc-200 font-medium">{userInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Subscription & Usage Card */}
                <motion.div
                    variants={cardVariants}
                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8 mb-8"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${isFreeUser ? 'from-yellow-600 to-orange-600' : 'from-purple-600 to-pink-600'} rounded-xl flex items-center justify-center`}>
                            <FaCrown className="text-white text-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-100">Subscription & Usage</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Current Plan</label>
                            <div className={`flex items-center space-x-3 p-4 rounded-xl border ${isFreeUser ? 'bg-yellow-600/10 border-yellow-600/30' : 'bg-purple-600/10 border-purple-600/30'}`}>
                                <FaCrown className={isFreeUser ? 'text-yellow-400' : 'text-purple-400'} />
                                <span className={`font-bold ${isFreeUser ? 'text-yellow-200' : 'text-purple-200'}`}>
                                    {isFreeUser ? 'Free Tier' : 'Premium'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Usage Statistics</label>
                            <div className="flex items-center space-x-3 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                                <FaChartLine className="text-zinc-400" />
                                <span className="text-zinc-200 font-medium">
                                    {isFreeUser 
                                        ? `Tests Taken (this week): ${userInfo.totalSessions} / 3`
                                        : `Total Tests Taken: ${userInfo.totalSessions}`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    {isFreeUser && (
                        <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-600/30 rounded-xl p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <h4 className="text-yellow-200 font-bold text-lg mb-2">Upgrade to Premium</h4>
                                    <p className="text-yellow-300/80 mb-4">
                                        {testsRemaining === 0
                                            ? "You've used all your free tests. Upgrade for unlimited practice!"
                                            : `You have ${testsRemaining} free test${testsRemaining === 1 ? '' : 's'} remaining.`
                                        }
                                    </p>
                                    <ul className="text-yellow-300/70 text-sm space-y-1">
                                        <li>• Unlimited IELTS practice tests</li>
                                        <li>• Advanced AI feedback and analysis</li>
                                        <li>• Priority support</li>
                                        <li>• Progress tracking and insights</li>
                                    </ul>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/pricing">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                                        >
                                            <FaRocket />
                                            <span>Upgrade Now</span>
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
