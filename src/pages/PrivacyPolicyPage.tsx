import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const PrivacyPolicyPage: React.FC = () => {
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
                            <FaShieldAlt className="text-3xl text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Information We Collect</h2>
                                <p className="mb-4">
                                    We collect information you provide directly to us, such as when you create an account, 
                                    use our services, or contact us for support. This may include:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Name and email address</li>
                                    <li>Audio recordings for IELTS speaking practice</li>
                                    <li>Usage data and analytics</li>
                                    <li>Device and browser information</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">How We Use Your Information</h2>
                                <p className="mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide and improve our IELTS speaking practice services</li>
                                    <li>Analyze your speaking performance and provide feedback</li>
                                    <li>Communicate with you about your account and our services</li>
                                    <li>Ensure the security and integrity of our platform</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to protect your personal 
                                    information against unauthorized access, alteration, disclosure, or destruction. Your audio 
                                    recordings are encrypted and stored securely.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Third-Party Services</h2>
                                <p>
                                    We may use third-party services for authentication (Google Sign-In), audio processing, 
                                    and analytics. These services have their own privacy policies governing the use of your information.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Your Rights</h2>
                                <p className="mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Access and update your personal information</li>
                                    <li>Delete your account and associated data</li>
                                    <li>Opt out of certain communications</li>
                                    <li>Request a copy of your data</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at privacy@eloquent-ai.com
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

export default PrivacyPolicyPage;
