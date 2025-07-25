import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaSpinner, FaMicrophone, FaChartLine, FaBookOpen, FaGraduationCap, FaClock, FaFileAlt, FaRocket, FaTrophy } from 'react-icons/fa';
import { useUserStore } from '../store/userStore';
import { getSessionAnalysis } from '../lib/api';
import api from '../lib/api';

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

interface SessionData {
    _id: string;
    user: string;
    topicText: string;
    audioUrl: string;
    durationInSeconds: number;
    transcribedText: string;
    analysis: AnalysisData;
    suggestedAudioUrl?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const AnalysisPage: React.FC = () => {
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { token, userInfo } = useUserStore();
    const [session, setSession] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Determine if the practice button should be disabled (freemium logic)
    const isPracticeDisabled = userInfo?.subscription?.plan === 'free' && userInfo?.totalSessions >= 3;

    // New state for on-demand audio generation
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

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
                setSession(response.data);
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

    // Handle on-demand audio generation
    const handleGenerateAudio = async () => {
        if (!sessionId || !token) return;

        setIsGenerating(true);
        try {
            const response = await api.get(`/api/tts/${sessionId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
                responseType: 'blob'
            });

            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setGeneratedAudioUrl(audioUrl);
        } catch (error) {
            console.error("Failed to generate audio", error);
            setError('Failed to generate audio. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Play audio when generated audio changes
    useEffect(() => {
        if (generatedAudioUrl && audioRef.current) {
            audioRef.current.play();
        }
    }, [generatedAudioUrl]);

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

    const getBandScoreColor = (score: number) => {
        if (score >= 8) return 'from-emerald-500 to-green-600';
        if (score >= 7) return 'from-blue-500 to-indigo-600';
        if (score >= 6) return 'from-yellow-500 to-orange-600';
        if (score >= 5) return 'from-orange-500 to-red-600';
        return 'from-red-500 to-pink-600';
    };

    const getBandScoreText = (score: number) => {
        if (score >= 8) return 'Excellent';
        if (score >= 7) return 'Good';
        if (score >= 6) return 'Competent';
        if (score >= 5) return 'Modest';
        return 'Limited';
    };

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
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
                        >
                            Back to Dashboard
                        </motion.button>
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
                {isLoading ? (
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-2xl p-12 text-center"
                    >
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
                            className="w-20 h-20 mx-auto mb-8 border-4 border-blue-600 border-t-transparent rounded-full relative"
                        >
                            <div className="absolute inset-2 border-2 border-purple-600 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        </motion.div>
                        <h2 className="text-4xl font-bold text-zinc-100 mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Analysis in Progress
                        </h2>
                        <p className="text-xl text-zinc-300">Preparing your detailed results...</p>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-red-500/30 shadow-2xl p-12 text-center"
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
                        <h2 className="text-3xl font-bold text-zinc-100 mb-6">Error Loading Results</h2>
                        <p className="text-zinc-300 mb-8 text-lg">{error}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg"
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                ) : session && session.analysis && (
                    <>
                        {/* Hero Section with Overall Score */}
                        <motion.div
                            variants={itemVariants}
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
                                    <h2 className="text-2xl lg:text-4xl font-bold text-zinc-100 mb-2">
                                        IELTS Speaking Assessment
                                    </h2>
                                    <p className="text-zinc-400 text-lg">Complete Band Score Analysis</p>
                                </motion.div>

                                {/* Main Score Display */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                                    className="relative inline-flex items-center justify-center w-40 h-40 lg:w-48 lg:h-48 mx-auto mb-8"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${getBandScoreColor(session.analysis.overallBandScore)} rounded-full shadow-2xl`}>
                                        <div className="absolute inset-2 bg-zinc-900 rounded-full" />
                                    </div>
                                    <div className="relative text-center">
                                        <div className="text-5xl lg:text-6xl font-bold text-zinc-100 mb-1">
                                            {session.analysis.overallBandScore}
                                        </div>
                                        <div className="text-sm lg:text-base text-zinc-300 font-semibold">
                                            {getBandScoreText(session.analysis.overallBandScore)}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Score Breakdown */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                    {[
                                        { score: session.analysis.fluencyAndCoherence.score, label: "Fluency & Coherence", icon: FaChartLine },
                                        { score: session.analysis.lexicalResource.score, label: "Lexical Resource", icon: FaBookOpen },
                                        { score: session.analysis.grammaticalRangeAndAccuracy.score, label: "Grammar", icon: FaGraduationCap },
                                        { score: session.analysis.wordsPerMinute, label: "Words/Min", icon: FaClock, isMetric: true }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                            className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 group"
                                        >
                                            <item.icon className={`text-2xl lg:text-3xl mx-auto mb-3 ${item.isMetric ? 'text-green-400' : 'text-blue-400'} group-hover:scale-110 transition-transform duration-300`} />
                                            <div className={`text-2xl lg:text-3xl font-bold mb-2 ${item.isMetric ? 'text-green-400' : 'text-blue-400'}`}>
                                                {item.score}
                                            </div>
                                            <div className="text-xs lg:text-sm text-zinc-300 font-medium leading-tight">
                                                {item.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Content Grid */}
                        <div className="grid xl:grid-cols-3 gap-8">
                            {/* Left Column: Detailed Feedback */}
                            <div className="xl:col-span-2 space-y-6">
                                {/* Detailed Analysis Cards */}
                                {[
                                    {
                                        title: "Fluency and Coherence",
                                        score: session.analysis.fluencyAndCoherence.score,
                                        feedback: session.analysis.fluencyAndCoherence.feedback,
                                        icon: FaChartLine,
                                        gradient: "from-blue-600 to-indigo-600"
                                    },
                                    {
                                        title: "Lexical Resource", 
                                        score: session.analysis.lexicalResource.score,
                                        feedback: session.analysis.lexicalResource.feedback,
                                        icon: FaBookOpen,
                                        gradient: "from-purple-600 to-pink-600"
                                    },
                                    {
                                        title: "Grammatical Range and Accuracy",
                                        score: session.analysis.grammaticalRangeAndAccuracy.score,
                                        feedback: session.analysis.grammaticalRangeAndAccuracy.feedback,
                                        icon: FaGraduationCap,
                                        gradient: "from-green-600 to-emerald-600"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 lg:p-8 group hover:border-zinc-600/50 transition-all duration-500"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                    <item.icon className="text-white text-lg" />
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-bold text-zinc-100 group-hover:text-blue-300 transition-colors duration-300">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${getBandScoreColor(item.score)} bg-clip-text text-transparent`}
                                            >
                                                {item.score}
                                            </motion.div>
                                        </div>
                                        <div className="bg-zinc-800/30 rounded-xl p-4 lg:p-6 border border-zinc-700/20">
                                            <p className="text-zinc-300 leading-relaxed text-base lg:text-lg">
                                                {item.feedback}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right Column: Audio Workbench & Stats */}
                            <div className="space-y-6">
                                {/* Audio Comparison */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 lg:p-8 sticky top-8"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl flex items-center justify-center">
                                            <FaMicrophone className="text-white" />
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-bold text-zinc-100">
                                            Audio Comparison
                                        </h3>
                                    </div>

                                    {/* User's Original Recording */}
                                    {session.audioUrl && (
                                        <div className="mb-6">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <h4 className="text-lg font-semibold text-zinc-300">Your Original Speech</h4>
                                            </div>
                                            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/30">
                                                <audio controls className="w-full h-12">
                                                    <source src={session.audioUrl} type="audio/webm" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        </div>
                                    )}

                                    {/* AI's Suggested Version */}
                                    <div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <h4 className="text-lg font-semibold text-zinc-300">Band 9 Suggested Speech</h4>
                                        </div>
                                        <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/30">
                                            {/* Case 1: Audio already exists on page load */}
                                            {session?.suggestedAudioUrl && (
                                                <audio src={session.suggestedAudioUrl} controls className="w-full h-12" />
                                            )}

                                            {/* Case 2: Audio has just been generated client-side */}
                                            {generatedAudioUrl && (
                                                <audio
                                                    ref={audioRef}
                                                    src={generatedAudioUrl}
                                                    controls
                                                    autoPlay
                                                    className="w-full h-12"
                                                />
                                            )}

                                            {/* Case 3: Button to generate audio */}
                                            {!session?.suggestedAudioUrl && !generatedAudioUrl && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleGenerateAudio}
                                                    disabled={isGenerating}
                                                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white px-6 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 w-full font-semibold shadow-lg"
                                                >
                                                    {isGenerating ? (
                                                        <>
                                                            <FaSpinner className="animate-spin text-lg" />
                                                            <span>Generating Audio...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaPlay className="text-lg" />
                                                            <span>Generate AI Voice</span>
                                                        </>
                                                    )}
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Performance Statistics */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 lg:p-8"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                                            <FaChartLine className="text-white" />
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-bold text-zinc-100">Statistics</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { value: session.analysis.wordCount, label: "Total Words", icon: FaFileAlt },
                                            { value: session.analysis.wordsPerMinute, label: "Words/Min", icon: FaClock }
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-zinc-800/50 rounded-xl p-4 lg:p-6 text-center border border-zinc-700/30 hover:border-green-500/30 transition-all duration-300 group"
                                            >
                                                <stat.icon className="text-3xl text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                                                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm lg:text-base text-zinc-300 font-medium">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Text Comparison Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 lg:p-8 mt-8"
                        >
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <FaBookOpen className="text-white text-lg" />
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-zinc-100">
                                    Text Analysis & Comparison
                                </h3>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Original Transcript */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                                        <h4 className="text-xl font-bold text-zinc-100">Your Original Transcript</h4>
                                    </div>
                                    <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/30 min-h-[200px]">
                                        <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-base">
                                            {session?.transcribedText || 'Transcript not available.'}
                                        </p>
                                    </div>
                                </div>

                                {/* AI Improved Version */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                        <h4 className="text-xl font-bold text-zinc-100">AI Suggested Version</h4>
                                    </div>
                                    <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-6 border border-emerald-500/20 min-h-[200px]">
                                        <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-base">
                                            {session.analysis?.improvedText || 'Analysis not available.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Next Steps */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-zinc-900/60 via-blue-900/20 to-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-700/30 p-6 lg:p-8 mt-8 relative overflow-hidden"
                        >
                            <motion.div
                                animate={{
                                    y: [-10, 10, -10],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-4 right-4 text-blue-400/20"
                            >
                                <FaRocket className="text-6xl" />
                            </motion.div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <FaRocket className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-100">
                                        🎯 Next Steps to Excellence
                                    </h3>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center space-x-2">
                                            <FaGraduationCap className="text-blue-400" />
                                            <span>Continue Improving</span>
                                        </h4>
                                        <div className="space-y-3">
                                            {[
                                                "Practice the areas highlighted in your feedback",
                                                "Try different topics to build versatility", 
                                                "Focus on incorporating the suggested improvements",
                                                "Track your progress over time"
                                            ].map((tip, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1 + index * 0.1 }}
                                                    className="flex items-start space-x-3 text-zinc-300"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                                                    <span className="text-base leading-relaxed">{tip}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="text-center md:text-right flex flex-col justify-center items-center md:items-end">
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotate: 5 }}
                                            className="mb-4"
                                        >
                                            <FaTrophy className="text-5xl text-yellow-500" />
                                        </motion.div>
                                        <motion.button
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow: isPracticeDisabled ? "0 20px 40px rgba(234, 179, 8, 0.4)" : "0 20px 40px rgba(59, 130, 246, 0.4)"
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => isPracticeDisabled ? window.open('https://buy.stripe.com/your-upgrade-link', '_blank') : navigate('/test')}
                                            className={`px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-2xl relative overflow-hidden group ${
                                                isPracticeDisabled
                                                    ? 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-700 hover:from-yellow-700 hover:via-yellow-800 hover:to-orange-800 text-white'
                                                    : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white'
                                            }`}
                                        >
                                            <span className={`absolute inset-0 bg-gradient-to-r ${isPracticeDisabled ? 'from-yellow-400 to-orange-400' : 'from-blue-400 to-indigo-400'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></span>
                                            <span className="relative flex items-center space-x-2">
                                                {isPracticeDisabled ? <FaTrophy /> : <FaRocket />}
                                                <span>{isPracticeDisabled ? 'Upgrade to Premium' : 'Take Another Test'}</span>
                                            </span>
                                        </motion.button>
                                    </div>
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