import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.footer
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            className="bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-700/50 mt-12"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Logo */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Eloquent AI
                        </h2>
                        <p className="text-zinc-400 text-sm mt-1">
                            Master IELTS Speaking with AI
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap justify-center items-center space-x-6 text-sm">
                        <Link
                            to="/privacy-policy"
                            className="text-zinc-400 hover:text-white transition-colors duration-300 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-zinc-600">•</span>
                        <Link
                            to="/terms-of-service"
                            className="text-zinc-400 hover:text-white transition-colors duration-300 hover:underline"
                        >
                            Terms of Service
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-zinc-500 text-sm">
                            © {currentYear} Eloquent AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
