import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Tv, LogOut, LayoutDashboard, ChevronDown, Menu, X, Settings } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const dropdownTimeoutRef = useRef(null);
    const adminDropdownTimeoutRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeoutRef.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 150); // Small delay to prevent sudden closing
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
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">StreamNet</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link>
                        <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">About Us</Link>
                        <Link to="/packages" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Packages</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contact</Link>

                        {/* Desktop Dropdown */}
                        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors duration-200 font-medium py-2">
                                <span>Our Policies</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="py-2">
                                        <Link to="/privacy-policy" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors">Privacy Policy</Link>
                                        <Link to="/terms-conditions" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors">Terms & Conditions</Link>
                                        <Link to="/refund-policy" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors">Refund & Return Policy</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Authentication */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                {user.role === 'admin' && (
                                    <div
                                        className="relative"
                                        onMouseEnter={() => {
                                            clearTimeout(adminDropdownTimeoutRef.current);
                                            setIsAdminDropdownOpen(true);
                                        }}
                                        onMouseLeave={() => {
                                            adminDropdownTimeoutRef.current = setTimeout(() => {
                                                setIsAdminDropdownOpen(false);
                                            }, 150);
                                        }}
                                    >
                                        <button className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 group">
                                            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                                            <span>Manage Inventory</span>
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isAdminDropdownOpen && (
                                            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="py-2">
                                                    <Link to="/admin/iptv" onClick={() => setIsAdminDropdownOpen(false)} className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                                        <Tv className="w-4 h-4 text-indigo-400" />
                                                        <span>IPTV Accounts</span>
                                                    </Link>
                                                    <Link to="/admin/netflix" onClick={() => setIsAdminDropdownOpen(false)} className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-t border-gray-800/50">
                                                        <Tv className="w-4 h-4 text-red-500" />
                                                        <span>Netflix Accounts</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </Link>
                                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800 animate-in slide-in-from-top-5 duration-300 absolute w-full left-0 top-full shadow-2xl z-40">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Home</Link>
                        <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">About Us</Link>
                        <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Packages</Link>
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Contact</Link>

                        <div className="px-3 py-3 text-gray-400 uppercase tracking-wider text-xs font-bold mt-4">Our Policies</div>
                        <div className="space-y-1 pl-4">
                            <Link to="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800">Privacy Policy</Link>
                            <Link to="/terms-conditions" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800">Terms & Conditions</Link>
                            <Link to="/refund-policy" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800">Refund Policy</Link>
                        </div>

                        <div className="border-t border-gray-800 mt-4 pt-4">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="px-3 py-2 text-sm text-indigo-400 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30">
                                            <span className="text-white font-bold">{user.name.charAt(0)}</span>
                                        </div>
                                        {user.name}
                                    </div>
                                    {user.role === 'admin' && (
                                        <div className="space-y-1">
                                            <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Inventory Management</div>
                                            <Link to="/admin/iptv" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-3 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-300 hover:bg-gray-800 flex items-center bg-indigo-500/5">
                                                <Tv className="w-5 h-5 mr-3" /> IPTV Accounts
                                            </Link>
                                            <Link to="/admin/netflix" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-3 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 flex items-center bg-red-500/5">
                                                <Tv className="w-5 h-5 mr-3" /> Netflix Accounts
                                            </Link>
                                        </div>
                                    )}
                                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 flex items-center">
                                        <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-gray-800 flex items-center">
                                        <LogOut className="w-5 h-5 mr-3" /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3 pt-2">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 border border-gray-700 rounded-xl text-base font-medium text-gray-300 hover:bg-gray-800">Login</Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 rounded-xl shadow bg-indigo-600 text-white font-medium hover:bg-indigo-500">Get Started</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
