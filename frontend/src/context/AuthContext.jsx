import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                console.error("Token invalid or expired");
                localStorage.removeItem('token');
                setUser(null);
            }
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            await fetchUser();
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const register = async (name, email, password, password_confirmation, country) => {
        return await api.post('/register', { name, email, password, password_confirmation, country });
    };

    const verifyEmail = async (email, code) => {
        const response = await api.post('/verify-email', { email, code });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return response.data;
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem('token');
        setUser(null);
    };

    if (loading) {
        return <div className="min-h-screen flex text-white justify-center items-center bg-gray-950">Loading session...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, register, verifyEmail, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
