import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-4xl p-8 shadow-2xl shadow-indigo-500/10 overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[50px] -z-10" />

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{title || 'Are you sure?'}</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed italic">"{message}"</p>

                            <div className="flex w-full gap-4">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 px-6 py-4 rounded-xl border border-gray-800 text-gray-400 font-semibold hover:bg-gray-800 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={onCancel}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
