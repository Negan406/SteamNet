import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '' });
    const resolver = useRef(null);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        setToast({ message, type, duration });
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    const confirm = useCallback((message, title = 'Are you sure?') => {
        setConfirmState({ isOpen: true, title, message });
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    }, []);

    const handleConfirm = () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        if (resolver.current) resolver.current(true);
    };

    const handleCancel = () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        if (resolver.current) resolver.current(false);
    };

    return (
        <ToastContext.Provider value={{ showToast, confirm }}>
            {children}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={hideToast}
                />
            )}
            <ConfirmModal
                isOpen={confirmState.isOpen}
                title={confirmState.title}
                message={confirmState.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ToastContext.Provider>
    );
};
