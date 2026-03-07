import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Tv, LogOut, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-500 transition-colors">
                                <Tv className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">StreamNet</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link>
                        <Link to="/packages" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Packages</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="hidden md:block">Dashboard</span>
                                </Link>
                                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                    <span className="hidden md:block">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
