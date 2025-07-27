import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger'
}) => {
    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    iconColor: 'text-red-400',
                    iconBg: 'bg-red-500/20',
                    confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
                    border: 'border-red-500/30'
                };
            case 'warning':
                return {
                    iconColor: 'text-yellow-400',
                    iconBg: 'bg-yellow-500/20',
                    confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
                    border: 'border-yellow-500/30'
                };
            case 'info':
                return {
                    iconColor: 'text-blue-400',
                    iconBg: 'bg-blue-500/20',
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
                    border: 'border-blue-500/30'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl p-6 w-full max-w-md relative my-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-zinc-800/50"
                            >
                                <FaTimes className="text-sm" />
                            </button>

                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <div className={`w-16 h-16 ${styles.iconBg} ${styles.border} rounded-full flex items-center justify-center border`}>
                                    <FaExclamationTriangle className={`text-2xl ${styles.iconColor}`} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-zinc-100 mb-3">
                                    {title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white rounded-xl border border-zinc-600/30 transition-all duration-300 font-medium"
                                >
                                    {cancelText}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onConfirm}
                                    className={`flex-1 px-4 py-3 ${styles.confirmButton} rounded-xl transition-all duration-300 font-medium shadow-lg`}
                                >
                                    {confirmText}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
