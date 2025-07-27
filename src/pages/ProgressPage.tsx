import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaArrowLeft } from 'react-icons/fa';
import { useUserStore } from '../store/userStore';
import { getUserSessions } from '../lib/api';
import Navigation from '../components/Navigation';
import ProgressChart from '../components/ProgressChart';

interface Session {
    _id: string;
    user: string;
    topicText: string;
    audioUrl: string;
    durationInSeconds: number;
    transcribedText: string;
    analysis?: {
        overallBandScore: number;
        wordCount?: number;
        wordsPerMinute?: number;
        fluencyAndCoherence: {
            score: number;
            feedback: string;
        };
        lexicalResource: {
            score: number;
            feedback: string;
        };
        grammaticalRangeAndAccuracy: {
            score: number;
            feedback: string;
        };
        improvedText?: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
}

const ProgressPage: React.FC = () => {
    const { token } = useUserStore();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSessions = async () => {
            if (!token) return;

            try {
                setIsLoading(true);
                const response = await getUserSessions(token);
                setSessions(response.data);
                setError('');
            } catch (err) {
                console.error('Error fetching sessions:', err);
                setError('Failed to load progress data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessions();
    }, [token]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
            }
        }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    } as const;

    // Filter sessions with analysis data for the chart
    const sessionsWithAnalysis = sessions.filter(session =>
        session.analysis?.overallBandScore && session.status === 'completed'
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
            {/* Static Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
            </div>

            {/* Navigation */}
            <Navigation variant="dashboard" showBackButton={true} backButtonText="Back to Dashboard" backButtonPath="/dashboard" />

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 py-8 lg:py-12"
            >
                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-12 px-4 sm:px-6 lg:px-8"
                >
                    <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-6">
                        Your Progress Over Time
                    </h1>
                    <p className="text-lg text-zinc-300">
                        Track your IELTS Speaking improvement across all scoring criteria and see how far you've come.
                    </p>
                </motion.div>

                {/* Progress Chart Section */}
                <motion.div variants={itemVariants}>
                    {isLoading ? (
                        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-2xl p-12 text-center">
                            <motion.div
                                animate={{ 
                                    rotate: 360,
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "linear" 
                                }}
                                className="w-16 h-16 mx-auto mb-6 border-4 border-blue-600 border-t-transparent rounded-full"
                            />
                            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Loading Your Progress</h2>
                            <p className="text-zinc-300">Analyzing your journey...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-red-500/30 shadow-2xl p-12 text-center">
                            <div className="text-red-400 mb-6">
                                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Unable to Load Progress</h2>
                            <p className="text-zinc-300 mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 font-semibold"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : sessionsWithAnalysis.length < 2 ? (
                        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-2xl p-12 text-center">
                            <div className="text-zinc-400 mb-6">
                                <FaChartLine className="w-16 h-16 mx-auto" />
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Start Your Progress Journey</h2>
                            <p className="text-zinc-300 mb-8">
                                Complete at least 2 speaking tests to see your progress chart and track your improvement over time.
                            </p>
                            <div className="bg-zinc-800/30 rounded-xl p-6">
                                <div className="text-lg font-semibold text-zinc-200 mb-2">
                                    Tests Completed: {sessionsWithAnalysis.length}/2
                                </div>
                                <div className="w-full bg-zinc-700 rounded-full h-3">
                                    <div 
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${(sessionsWithAnalysis.length / 2) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ProgressChart sessions={sessionsWithAnalysis} />
                    )}
                </motion.div>

                {/* Additional Stats Section */}
                {sessionsWithAnalysis.length >= 2 && (
                    <motion.div
                        variants={itemVariants}
                        className="mt-12 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            {
                                title: "Total Practice Time",
                                value: `${Math.round(sessions.reduce((total, session) => total + (session.durationInSeconds || 0), 0) / 60)} min`,
                                icon: "⏱️",
                                color: "text-blue-400"
                            },
                            {
                                title: "Average Score",
                                value: (sessionsWithAnalysis.reduce((sum, session) => sum + (session.analysis?.overallBandScore || 0), 0) / sessionsWithAnalysis.length).toFixed(1),
                                icon: "📊",
                                color: "text-green-400"
                            },
                            {
                                title: "Best Performance",
                                value: Math.max(...sessionsWithAnalysis.map(s => s.analysis?.overallBandScore || 0)).toFixed(1),
                                icon: "🏆",
                                color: "text-yellow-400"
                            },
                            {
                                title: "Consistency",
                                value: sessionsWithAnalysis.length >= 3 ? "Good" : "Building",
                                icon: "🎯",
                                color: "text-purple-400"
                            }
                        ].map((stat, index) => (
                            <div key={index} className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 text-center">
                                <div className="text-3xl mb-3">{stat.icon}</div>
                                <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-zinc-400 text-sm">
                                    {stat.title}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ProgressPage;
