import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Register() {
    const { register, verifyEmail } = useContext(AuthContext);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', password_confirmation: '', country: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Verification State
    const [verifyMode, setVerifyMode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (credentials.password !== credentials.password_confirmation) {
            setError('Passwords do not match');
            showToast('Passwords do not match', 'error');
            return;
        }
        setLoading(true);
        try {
            await register(credentials.name, credentials.email, credentials.password, credentials.password_confirmation, credentials.country);
            showToast('Account created! Please check your email for the code.', 'success');
            setVerifyMode(true);
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await verifyEmail(credentials.email, verificationCode);
            showToast('Verification successful! Welcome.', 'success');
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || 'Invalid verification code';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-purple-600/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

            <div className="w-full max-w-md p-8 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {verifyMode ? 'Verify Email' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400">
                        {verifyMode ? `Enter the 6-digit code sent to ${credentials.email}` : 'Join the best IPTV service today'}
                    </p>
                </div>

                {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">{error}</div>}

                {!verifyMode ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    className="block w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="E.g. Morocco"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 mt-2"
                        >
                            {loading ? 'Creating Account...' : <><UserPlus className="w-5 h-5 mr-2" /> Sign Up</>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-4 text-center">Verification Code</label>
                            <input
                                type="text"
                                maxLength="6"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                className="block w-full text-center text-3xl tracking-[1em] font-black py-4 border border-gray-700 rounded-2xl bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="000000"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || verificationCode.length !== 6}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {loading ? 'Verifying...' : 'Verify & Sign In'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setVerifyMode(false)}
                            className="w-full text-center text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            ← Back to registration
                        </button>
                    </form>
                )}

                {!verifyMode && (
                    <>
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900/0 backdrop-blur-3xl text-gray-500 font-medium">ou</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.href = 'http://localhost:8000/api/auth/google'}
                                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl transition-all font-semibold shadow-lg group"
                            >
                                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
                                <span>Continuer avec Google</span>
                            </button>

                            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all font-semibold shadow-lg">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.06.74.78 0 1.88-.78 3.42-.61 1.61.18 2.85.84 3.5 2.13-3.27 1.93-2.73 6.13.56 7.42-.66 1.76-1.52 3.48-3.54 3.29zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.51-3.74 4.25z" />
                                </svg>
                                <span>Continuer avec Apple</span>
                            </button>

                            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all font-semibold">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span>Continuer avec une adresse e-mail</span>
                            </button>

                            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl transition-all font-semibold shadow-lg">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span>Continuer avec Facebook</span>
                            </button>
                        </div>
                    </>
                )}

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors cursor-pointer relative z-20">
                        Sign in instead
                    </Link>
                </p>
            </div>
        </div>
    );
}
