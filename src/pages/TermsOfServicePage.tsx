import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const TermsOfServicePage: React.FC = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

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
    };

    return (
        <div className="min-h-screen bg-black">
            <Navigation variant="landing" />
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-600/30">
                            <FaFileContract className="text-3xl text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using our IELTS speaking practice platform.
                    </p>
                </motion.div>

                {/* Back Button */}
                <motion.div variants={itemVariants} className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back</span>
                    </button>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={itemVariants}
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-8"
                >
                    <div className="prose prose-invert prose-zinc max-w-none">
                        <div className="space-y-8 text-zinc-200 leading-relaxed">
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Eloquent AI, you accept and agree to be bound by the terms 
                                    and provision of this agreement. If you do not agree to abide by the above, please 
                                    do not use this service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Service Description</h2>
                                <p className="mb-4">
                                    Eloquent AI provides AI-powered IELTS speaking practice and assessment services. Our platform includes:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Speaking practice sessions with AI feedback</li>
                                    <li>Performance analytics and progress tracking</li>
                                    <li>Audio recording and transcription services</li>
                                    <li>Personalized improvement recommendations</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">User Responsibilities</h2>
                                <p className="mb-4">
                                    As a user of our service, you agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide accurate and complete information when creating your account</li>
                                    <li>Use the service only for legitimate IELTS practice purposes</li>
                                    <li>Not share your account credentials with others</li>
                                    <li>Respect intellectual property rights</li>
                                    <li>Not attempt to reverse engineer or hack our systems</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Subscription and Billing</h2>
                                <p className="mb-4">
                                    Our service offers both free and premium subscription tiers:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Free users receive limited practice sessions</li>
                                    <li>Premium subscribers enjoy unlimited access to all features</li>
                                    <li>Subscription fees are billed monthly and are non-refundable</li>
                                    <li>You may cancel your subscription at any time</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Intellectual Property</h2>
                                <p>
                                    All content, features, and functionality of Eloquent AI are owned by us and are 
                                    protected by copyright, trademark, and other intellectual property laws. You may 
                                    not reproduce, distribute, or create derivative works without our express permission.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Limitation of Liability</h2>
                                <p>
                                    Eloquent AI is provided "as is" without warranties of any kind. We shall not be 
                                    liable for any indirect, incidental, special, or consequential damages arising 
                                    from your use of our service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Termination</h2>
                                <p>
                                    We reserve the right to terminate or suspend your account at any time for violations 
                                    of these terms or for any other reason at our sole discretion.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Changes to Terms</h2>
                                <p>
                                    We reserve the right to modify these terms at any time. Changes will be effective 
                                    immediately upon posting. Your continued use of the service constitutes acceptance 
                                    of the modified terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Contact Information</h2>
                                <p>
                                    If you have any questions about these Terms of Service, please contact us at 
                                    legal@eloquent-ai.com
                                </p>
                            </div>

                            <div className="pt-6 border-t border-zinc-700">
                                <p className="text-sm text-zinc-400">
                                    Last updated: January 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TermsOfServicePage;
