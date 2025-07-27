import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLElement>(null);
    const problemRef = useRef<HTMLElement>(null);
    const solutionRef = useRef<HTMLElement>(null);
    const featuresRef = useRef<HTMLElement>(null);
    const socialProofRef = useRef<HTMLElement>(null);
    const finalCtaRef = useRef<HTMLElement>(null);

    const heroInView = useInView(heroRef, { once: true });
    const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
    const solutionInView = useInView(solutionRef, { once: true, margin: "-100px" });
    const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
    const socialProofInView = useInView(socialProofRef, { once: true, margin: "-100px" });
    const finalCtaInView = useInView(finalCtaRef, { once: true, margin: "-100px" });

    const handleGetStarted = () => {
        navigate('/signup');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
            {/* Navigation */}
            <Navigation variant="landing" />

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16">
                {/* Static Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
                    {/* Animated Sound Waves */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
                        >
                            <span className="text-zinc-100">
                                Master IELTS Speaking
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                                with AI-Powered Confidence
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            Transform your speaking anxiety into <span className="text-blue-400 font-semibold">unshakeable confidence</span>.
                            Get instant, expert-level feedback from your personal AI coach, available 24/7.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGetStarted}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25"
                            >
                                Start Your Free Practice
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSignIn}
                                className="bg-white text-black hover:bg-black hover:text-white border border-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300"
                            >
                                Already have an account?
                            </motion.button>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="pt-12 text-zinc-400"
                        >
                            <p className="text-sm">No credit card required • Start practicing immediately</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-3 bg-zinc-600 rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Problem Section */}
            <section ref={problemRef} className="py-24 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate={problemInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        className="text-center space-y-8"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 leading-tight tracking-tight">
                            The IELTS Speaking test does not have to be
                            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> your biggest fear</span>
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8 pt-12">
                            {[
                                {
                                    title: "Freezing Under Pressure",
                                    description: "Your mind goes blank when the examiner asks a question, even though you know the answer."
                                },
                                {
                                    title: "Struggling for Words",
                                    description: "You have ideas but can't express them fluently, leading to frustrating pauses and hesitation."
                                },
                                {
                                    title: "Test Anxiety",
                                    description: "The formal environment and time pressure make you nervous, affecting your natural speaking ability."
                                }
                            ].map((problem, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    animate={problemInView ? "visible" : "hidden"}
                                    variants={cardVariants}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-6 text-center hover:bg-zinc-900/70 hover:border-zinc-600/50 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-semibold text-zinc-100 mb-4">{problem.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{problem.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Solution Section */}
            <section ref={solutionRef} className="py-24 relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate={solutionInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="text-center space-y-12"
                    >
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                                <span className="text-zinc-100">Meet </span>
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Eloquent AI
                                </span>
                            </h2>
                            <p className="text-md md:text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
                                Your personal AI speaking coach, available 24/7. Get the expert guidance you need
                                to transform your speaking skills and achieve your target IELTS score.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-2xl p-8 md:p-12 max-w-4xl mx-auto hover:border-zinc-600/50 transition-all duration-500"
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-6 text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-100">
                                        Intelligent. Precise. Personal.
                                    </h3>
                                    <p className="text-zinc-300 leading-relaxed">
                                        Unlike generic practice apps, Eloquent AI understands the nuances of IELTS speaking assessment.
                                        Our advanced AI analyzes your speech patterns, vocabulary usage, and fluency to provide
                                        detailed feedback that helps you improve faster.
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-zinc-200 font-medium">Trusted by future IELTS success stories</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    {/* Animated AI Visualization */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center"
                                        >
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                            </svg>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate={featuresInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="space-y-16"
                    >
                        <motion.div variants={fadeInUp} className="text-center space-y-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
                                Everything you need to <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">succeed</span>
                            </h2>
                            <p className="text-md md:text-xl text-zinc-300 max-w-3xl mx-auto">
                                Comprehensive features designed to boost your confidence and maximize your IELTS speaking score.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    ),
                                    title: "AI-Powered Feedback",
                                    description: "Receive instant, detailed analysis on your Fluency, Vocabulary, and Grammar—just like a real examiner, but available anytime you need it."
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    ),
                                    title: "Unlimited Practice",
                                    description: "Practice with authentic IELTS topics whenever you want, as many times as you need. Build fluency through consistent, focused practice."
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    ),
                                    title: "Track Your Progress",
                                    description: "Watch your scores climb and your confidence soar with detailed progress tracking. See exactly how you're improving over time."
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    transition={{ delay: index * 0.2 }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8 text-center hover:border-blue-500/50 transition-all duration-300 group"
                                >
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:bg-blue-500 transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-zinc-100 mb-4">{feature.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section ref={socialProofRef} className="py-24 relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate={socialProofInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="space-y-16"
                    >
                        <motion.div variants={fadeInUp} className="text-center space-y-6">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
                                Join the <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">success stories</span>
                            </h2>
                            <p className="text-md md:text-xl text-zinc-300 max-w-3xl mx-auto">
                                Students worldwide are achieving their target IELTS scores with Eloquent AI's personalized coaching.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote: "This was the key to my Band 8.0. The feedback was more detailed than any human tutor I've worked with.",
                                    author: "Sarah Chen",
                                    role: "Medical Student",
                                    score: "8.0"
                                },
                                {
                                    quote: "I went from freezing up during practice to speaking confidently in my actual test. The AI coaching really works.",
                                    author: "Ahmed Hassan",
                                    role: "Engineer",
                                    score: "8.0"
                                },
                                {
                                    quote: "The progress tracking kept me motivated. Seeing my scores improve week by week gave me the confidence I needed.",
                                    author: "Maria Rodriguez",
                                    role: "Teacher",
                                    score: "7.5"
                                }
                            ].map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 sm:p-8 relative hover:border-zinc-600/50 transition-all duration-300 group"
                                >
                                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                                            {testimonial.score}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-zinc-300 leading-relaxed italic pr-16 sm:pr-20">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-zinc-100 font-semibold">{testimonial.author}</div>
                                                <div className="text-zinc-400 text-sm">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section ref={finalCtaRef} className="py-24 relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate={finalCtaInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="space-y-12"
                    >
                        <motion.div variants={fadeInUp} className="space-y-8">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                                <span className="text-zinc-100">Ready to </span>
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    transform
                                </span>
                                <br />
                                <span className="text-zinc-100">your speaking skills?</span>
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                                Join thousands of students who've achieved their target IELTS scores.
                                Start your journey to speaking confidence today.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/50 p-8 md:p-12 hover:bg-zinc-900/70 hover:border-zinc-600/50 transition-all duration-500"
                        >
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-blue-400">24/7</div>
                                        <div className="text-zinc-300 text-sm">AI Coaching Available</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-blue-400">Instant</div>
                                        <div className="text-zinc-300 text-sm">Detailed Feedback</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-blue-400">Unlimited</div>
                                        <div className="text-zinc-300 text-sm">Practice Sessions</div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleGetStarted}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25"
                                    >
                                        Start Your Free Practice Now
                                    </motion.button>
                                </div>

                                <div className="text-zinc-500 text-sm">
                                    <p>✓ No credit card required</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
