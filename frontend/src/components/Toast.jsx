import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-400" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        info: <Info className="w-5 h-5 text-indigo-400" />,
    };

    const backgrounds = {
        success: 'bg-gray-900/90 border-green-500/50',
        error: 'bg-gray-900/90 border-red-500/50',
        info: 'bg-gray-900/90 border-indigo-500/50',
    };

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-9999 w-full max-w-sm px-4 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`pointer-events-auto flex items-center p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${backgrounds[type]}`}
            >
                <div className="shrink-0 mr-3">
                    {icons[type]}
                </div>
                <div className="grow">
                    <p className="text-sm font-medium text-white">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="ml-4 shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </motion.div>
        </div>
    );
};

export default Toast;
