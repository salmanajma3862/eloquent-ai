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
                ease: [0.25, 0.46, 0.45, 0.94] as const
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

                            {/* Introduction */}
                            <div className="text-center pb-6 border-b border-zinc-700">
                                <p className="text-sm text-zinc-400 mb-2">Last updated July 27, 2025</p>
                            </div>

                            {/* Introduction Section */}
                            <div>
                                <p className="mb-6 text-lg">
                                    Welcome to <strong className="text-zinc-100">Eloquent AI</strong>! These terms and conditions outline the rules and regulations for the use of our application.
                                </p>
                                <p className="mb-4">
                                    By accessing this application, we assume you accept these terms and conditions. Do not continue to use Eloquent AI if you do not agree to all of the terms and conditions stated on this page.
                                </p>
                            </div>


                            {/* Section 1 */}
                            <div id="section1">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">1. Accounts</h2>
                                <p className="mb-4">
                                    When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                                </p>
                                <p className="mb-4">
                                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
                                </p>
                            </div>


                            {/* Section 2 */}
                            <div id="section2">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">2. User-Generated Content</h2>
                                <p className="mb-4">
                                    Our Service allows you to create, record, and store content, including audio recordings and their transcriptions ("User Content"). You retain any and all of your rights to any User Content you submit.
                                </p>
                                <p className="mb-4">
                                    By using the Service, you grant us a license to use, process, and display your User Content solely for the purpose of providing and improving the Service for you. We will not share your personal User Content with any third party without your consent.
                                </p>
                            </div>


                            {/* Section 3 */}
                            <div id="section3">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">3. Subscriptions, Cancellations, and Refunds</h2>
                                <p className="mb-4">
                                    Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis ("Billing Cycle").
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Cancellation</h3>
                                <p className="mb-4">
                                    You may cancel your subscription at any time. Your subscription will remain active until the end of your current Billing Cycle, and you will not be charged for the next cycle.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Refund Policy</h3>
                                <p className="mb-4">
                                    <strong className="text-zinc-100">All payments are non-refundable.</strong> We do not provide refunds or credits for any partial subscription periods or unused time. You may cancel your subscription at any time to prevent future charges, but payments already made are final. All purchases are final.
                                </p>
                            </div>


                            {/* Section 4 */}
                            <div id="section4">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">4. Acceptable Use</h2>
                                <p className="mb-4">
                                    You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the services of any third party, or the general business of Eloquent AI.
                                </p>
                            </div>


                            {/* Section 5 */}
                            <div id="section5">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">5. Termination</h2>
                                <p className="mb-4">
                                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                            </div>


                            {/* Section 6 */}
                            <div id="section6">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">6. Limitation of Liability</h2>
                                <p className="mb-4">
                                    In no event shall Eloquent AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                                </p>
                                <p className="mb-4">
                                    <strong className="text-zinc-100">The AI-generated feedback is provided for educational purposes only and is not guaranteed to be perfectly accurate.</strong>
                                </p>
                            </div>


                            {/* Section 7 */}
                            <div id="section7">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">7. Changes to Terms</h2>
                                <p className="mb-4">
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
                                </p>
                            </div>


                            {/* Section 8 */}
                            <div id="section8">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">8. Contact Us</h2>
                                <p className="mb-4">
                                    If you have any questions about these Terms, please contact us at <a href="mailto:businesscontact422@gmail.com" className="text-blue-400 hover:text-blue-300 underline">businesscontact422@gmail.com</a>.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-zinc-700">
                                <p className="text-sm text-zinc-400">
                                    Last updated: July 27, 2025
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
