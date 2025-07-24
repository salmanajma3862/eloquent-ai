import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { getSessionAnalysis } from '../lib/api';

interface AnalysisData {
    overallBandScore: number;
    wordCount: number;
    wordsPerMinute: number;
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
    improvedText: string;
}

const AnalysisPage: React.FC = () => {
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { token } = useUserStore();
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!token) {
                navigate('/login');
                return;
            }

            if (!sessionId) {
                setError('No session ID provided');
                setIsLoading(false);
                return;
            }

            try {
                const response = await getSessionAnalysis(token, sessionId);
                setAnalysis(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch analysis. Please try again later.');
                console.error('Analysis fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalysis();
    }, [token, sessionId, navigate]);

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
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
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
                {isLoading ? (
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-8 text-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 mx-auto mb-6 border-4 border-blue-600 border-t-transparent rounded-full"
                        />
                        <h2 className="text-3xl font-bold text-zinc-100 mb-4">Analysis in Progress</h2>
                        <p className="text-xl text-zinc-300">Loading your results...</p>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-red-500/30 shadow-xl p-8 text-center"
                    >
                        <div className="text-red-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Error Loading Results</h2>
                        <p className="text-zinc-300 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </motion.div>
                ) : analysis && (
                    <>
                        {/* Overall Score Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-8 mb-8 text-center"
                        >
                            <h2 className="text-2xl font-bold text-zinc-100 mb-6">IELTS Speaking Band Score</h2>
                            <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
                                <div className="relative text-4xl font-bold text-zinc-100">
                                    {analysis.overallBandScore}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-400">{analysis.fluencyAndCoherence.score}</div>
                                    <div className="text-sm text-zinc-300">Fluency & Coherence</div>
                                </div>
                                <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-400">{analysis.lexicalResource.score}</div>
                                    <div className="text-sm text-zinc-300">Lexical Resource</div>
                                </div>
                                <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-400">{analysis.grammaticalRangeAndAccuracy.score}</div>
                                    <div className="text-sm text-zinc-300">Grammar</div>
                                </div>
                                <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-green-400">{analysis.wordsPerMinute}</div>
                                    <div className="text-sm text-zinc-300">Words/Min</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Two-Column Layout */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Left Column: Detailed Feedback */}
                            <div className="space-y-6">
                                {/* Fluency and Coherence */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-zinc-100">Fluency and Coherence</h3>
                                        <div className="text-2xl font-bold text-blue-400">
                                            {analysis.fluencyAndCoherence.score}
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {analysis.fluencyAndCoherence.feedback}
                                    </p>
                                </motion.div>

                                {/* Lexical Resource */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-zinc-100">Lexical Resource</h3>
                                        <div className="text-2xl font-bold text-blue-400">
                                            {analysis.lexicalResource.score}
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {analysis.lexicalResource.feedback}
                                    </p>
                                </motion.div>

                                {/* Grammatical Range and Accuracy */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-zinc-100">Grammatical Range and Accuracy</h3>
                                        <div className="text-2xl font-bold text-blue-400">
                                            {analysis.grammaticalRangeAndAccuracy.score}
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {analysis.grammaticalRangeAndAccuracy.feedback}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Right Column: Improved Text */}
                            <div className="space-y-6">
                                {/* Band 9 Suggested Version */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-6"
                                >
                                    <h3 className="text-xl font-semibold text-zinc-100 mb-4">Band 9 Suggested Version</h3>
                                    <div className="bg-zinc-800/30 rounded-xl p-4">
                                        <p className="text-zinc-200 leading-relaxed italic">
                                            "{analysis.improvedText}"
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Statistics */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-6"
                                >
                                    <h3 className="text-xl font-semibold text-zinc-100 mb-4">Performance Statistics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
                                            <div className="text-2xl font-bold text-green-400">{analysis.wordCount}</div>
                                            <div className="text-sm text-zinc-300">Total Words</div>
                                        </div>
                                        <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
                                            <div className="text-2xl font-bold text-green-400">{analysis.wordsPerMinute}</div>
                                            <div className="text-sm text-zinc-300">Words/Min</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-700/30 p-6 mt-8"
                        >
                            <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                                🎯 Next Steps
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-zinc-300">
                                <div>
                                    <h4 className="font-medium text-zinc-100 mb-2">Continue Improving</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Practice the areas highlighted in your feedback</li>
                                        <li>• Try different topics to build versatility</li>
                                        <li>• Focus on incorporating the suggested improvements</li>
                                        <li>• Track your progress over time</li>
                                    </ul>
                                </div>
                                <div className="text-center md:text-right">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('/test')}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mt-4 font-medium"
                                    >
                                        Take Another Test
                                    </motion.button>
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
