import React, { useState } from 'react';
import api from '../services/api';
import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await api.post('/forgot-password', { email });
            setMessage(response.data.message || 'If that email exists, we sent a reset link to it.');
        } catch (err) {
            setError(err.response?.data?.email || 'Failed to send reset link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-20 flex items-center justify-center relative overflow-hidden min-h-screen">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-indigo-600/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

            <div className="w-full max-w-md p-8 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-gray-400">Enter your email to receive a reset link.</p>
                </div>

                {message && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-sm text-center">{message}</div>}
                {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Sending...' : <><ArrowRight className="w-5 h-5 mr-2" /> Send Link</>}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Remember your password?{' '}
                    <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
