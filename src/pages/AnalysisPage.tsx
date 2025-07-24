import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import api from '../lib/api';

interface AnalysisResult {
    fluencyScore: number;
    grammarScore: number;
    vocabularyScore: number;
    overallScore: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
}

const AnalysisPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { token } = useUserStore();
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!token) {
                navigate('/login');
                return;
            }

            // Log the session ID for debugging and future use in Slice 3
            if (sessionId) {
                console.log('Analysis page loaded for session:', sessionId);
            }

            try {
                // Get the most recent session analysis
                // TODO: In Slice 3, use sessionId to fetch specific session analysis
                const response = await api.get('/api/test/latest-analysis', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAnalysisResult(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load analysis results. Please try again later.');
                console.error('Analysis fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [token, navigate]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            }
        }
    } as const;

    const itemVariants = {
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
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Back to Dashboard
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
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                {/* Analysis Results */}
                {loading ? (
                    <motion.div
                        variants={itemVariants}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl p-8 text-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 mx-auto mb-6 border-4 border-blue-600 border-t-transparent rounded-full"
                        />
                        <h2 className="text-3xl font-bold text-white mb-4">Analysis in Progress</h2>
                        <p className="text-xl text-slate-300">Loading your results...</p>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        variants={itemVariants}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-500/30 shadow-xl p-8 text-center"
                    >
                        <div className="text-red-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Error Loading Results</h2>
                        <p className="text-slate-300 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </motion.div>
                ) : analysisResult && (
                    <>
                        {/* Scores Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl p-8 mb-8"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Speaking Assessment Results</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-400">{analysisResult.fluencyScore.toFixed(1)}</div>
                                    <div className="text-sm text-slate-300">Fluency</div>
                                </div>
                                <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-400">{analysisResult.grammarScore.toFixed(1)}</div>
                                    <div className="text-sm text-slate-300">Grammar</div>
                                </div>
                                <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-400">{analysisResult.vocabularyScore.toFixed(1)}</div>
                                    <div className="text-sm text-slate-300">Vocabulary</div>
                                </div>
                                <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-green-400">{analysisResult.overallScore.toFixed(1)}</div>
                                    <div className="text-sm text-slate-300">Overall</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-700/30 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Feedback</h3>
                                <p className="text-slate-200 leading-relaxed mb-6">{analysisResult.feedback}</p>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-green-400 mb-2">Strengths</h4>
                                        <ul className="space-y-2">
                                            {analysisResult.strengths.map((strength, index) => (
                                                <li key={index} className="flex items-start space-x-2 text-slate-300">
                                                    <span className="text-green-400">✓</span>
                                                    <span>{strength}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-yellow-500 mb-2">Areas for Improvement</h4>
                                        <ul className="space-y-2">
                                            {analysisResult.improvements.map((improvement, index) => (
                                                <li key={index} className="flex items-start space-x-2 text-slate-300">
                                                    <span className="text-yellow-500">→</span>
                                                    <span>{improvement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Next Steps */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">
                                🎯 Next Steps
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                                <div>
                                    <h4 className="font-medium text-white mb-2">Practice More</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Try different topics to build versatility</li>
                                        <li>• Focus on areas needing improvement</li>
                                        <li>• Track your progress over time</li>
                                    </ul>
                                </div>
                                <div className="text-center md:text-right">
                                    <button
                                        onClick={() => navigate('/test')}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mt-4"
                                    >
                                        Take Another Test
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default AnalysisPage;
