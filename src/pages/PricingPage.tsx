import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
import {
    FaGraduationCap,
    FaCheck,
    FaCrown,
    FaRocket,
    FaChartLine,
    FaMicrophone,
    FaHeadphones,
    FaLifeRing,
    FaStar,
    FaInfinity,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import Navigation from '../components/Navigation';

const PricingPage: React.FC = () => {
    const { userInfo } = useUserStore();
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleUpgrade = () => {
        // TODO: Implement Stripe integration
        console.log('Upgrade to Premium clicked');
    };

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    } as const;

    const isCurrentlyFree = userInfo?.subscription?.plan === 'free';

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
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12"
            >
                {/* Hero Section */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="mb-6 md:mb-8"
                    >
                        <FaRocket className="text-4xl md:text-5xl lg:text-6xl text-blue-500 mx-auto mb-4 md:mb-6" />
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 md:mb-6 px-4">
                            Unlock Your Full Potential
                        </h2>
                        <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
                            The smartest way to achieve a Band 8+ IELTS score. Choose the plan that fits your learning journey.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16 px-4"
                >
                    {/* Free Plan Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 md:p-8 relative"
                    >
                        <div className="text-center mb-6 md:mb-8">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <FaGraduationCap className="text-white text-lg md:text-2xl" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-100 mb-2">Free</h3>
                            <div className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2">
                                $0
                                <span className="text-base md:text-lg text-zinc-400 font-normal"> / forever</span>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-base">Perfect for getting started</p>
                        </div>

                        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                            {[
                                "3 AI-Analyzed Tests (Resets Weekly)",
                                "Detailed Feedback on Fluency, Vocabulary & Grammar",
                                "Progress Tracking",
                                "Basic Performance Statistics"
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="flex items-start space-x-3"
                                >
                                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FaCheck className="text-white text-xs" />
                                    </div>
                                    <span className="text-zinc-300 text-sm md:text-base leading-relaxed">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isCurrentlyFree}
                            className={`w-full py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                                isCurrentlyFree
                                    ? 'bg-zinc-700/50 text-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100'
                            }`}
                        >
                            {isCurrentlyFree ? 'Current Plan' : 'Downgrade to Free'}
                        </motion.button>
                    </motion.div>

                    {/* Premium Plan Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-purple-900/20 backdrop-blur-xl rounded-2xl border-2 border-blue-500/50 shadow-2xl p-6 md:p-8 relative overflow-hidden"
                    >

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="text-center mb-6 md:mb-8 mt-3 md:mt-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <FaCrown className="text-white text-lg md:text-2xl" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-zinc-100 mb-2">Premium</h3>
                                <div className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2">
                                    $20
                                    <span className="text-base md:text-lg text-zinc-400 font-normal"> / month</span>
                                </div>
                                <p className="text-blue-300 text-sm md:text-base">Everything you need to excel</p>
                            </div>

                            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                                <div className="text-xs md:text-sm font-semibold text-blue-300 mb-2 md:mb-3">Everything in Free, plus:</div>
                                {[
                                    { icon: FaInfinity, text: "Unlimited AI-Analyzed Tests" },
                                    { icon: FaHeadphones, text: "AI Voice Generation for Suggested Answers" },
                                    { icon: FaChartLine, text: "Advanced Progress Analysis & Insights" },
                                    { icon: FaLifeRing, text: "Priority Support" },
                                    { icon: FaMicrophone, text: "Enhanced Audio Quality Analysis" },
                                    { icon: FaRocket, text: "Early Access to New Features" }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <feature.icon className="text-white text-xs" />
                                        </div>
                                        <span className="text-zinc-200 text-sm md:text-base leading-relaxed">{feature.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleUpgrade}
                                className="w-full py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm md:text-lg transition-all duration-300 shadow-lg"
                            >
                                {isCurrentlyFree ? 'Upgrade to Premium' : 'Current Plan'}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* FAQ Section - Headers outside cards */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-8 md:mb-12 px-4"
                >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-100 mb-3 md:mb-4">
                        Frequently Asked Questions
                    </h3>
                    <p className="text-zinc-400 text-base md:text-lg">
                        Everything you need to know about our pricing plans
                    </p>
                </motion.div>

                {/* Individual FAQ Cards */}
                <motion.div
                    variants={itemVariants}
                    className="space-y-4 md:space-y-6 px-4 mb-8 md:mb-12"
                >
                    {[
                        {
                            question: "Can I cancel anytime?",
                            answer: "Yes! You can cancel your Premium subscription at any time. You'll continue to have access to Premium features until the end of your billing period."
                        },
                        {
                            question: "What payment methods do you accept?",
                            answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe."
                        },
                        {
                            question: "How does the weekly reset work for free users?",
                            answer: "Free users get 3 AI-analyzed tests that reset every 7 days from their last test. This gives you consistent practice opportunities while encouraging upgrade to unlimited access."
                        },
                        {
                            question: "Is there a free trial for Premium?",
                            answer: "Your free plan serves as an extended trial! Experience our AI analysis with 3 tests, then upgrade to Premium for unlimited access and advanced features."
                        },
                        {
                            question: "What makes the AI analysis so accurate?",
                            answer: "Our AI is trained on thousands of IELTS speaking samples and uses advanced language models to provide detailed feedback on fluency, vocabulary, grammar, and pronunciation."
                        },
                        {
                            question: "Do you offer student discounts?",
                            answer: "We're working on student pricing options! Contact our support team with your student ID for potential discounts and early access to student plans."
                        }
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl overflow-hidden"
                        >
                            <motion.button
                                onClick={() => toggleFaq(index)}
                                className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-zinc-800/30 transition-all duration-300"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <h4 className="text-base md:text-lg font-bold text-zinc-100 pr-4">
                                    {faq.question}
                                </h4>
                                <motion.div
                                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <FaChevronDown className="text-zinc-400 text-sm" />
                                </motion.div>
                            </motion.button>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: expandedFaq === index ? "auto" : 0,
                                    opacity: expandedFaq === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-zinc-700/30">
                                    <p className="text-zinc-300 leading-relaxed text-sm md:text-base pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Support Section */}
                <motion.div
                    variants={itemVariants}
                    className="text-center px-4"
                >
                    <p className="text-zinc-400 mb-3 md:mb-4 text-sm md:text-base">
                        Still have questions? We're here to help!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 md:px-6 py-2 md:py-3 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 rounded-xl border border-zinc-600/30 transition-all duration-300 text-sm md:text-base"
                    >
                        Contact Support
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PricingPage;
