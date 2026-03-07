import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Shield, Zap, Globe } from 'lucide-react';

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
                        The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Entertainment</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
                        Experience over 20,000 live channels and limitless VODs in crystal clear 4K quality. Anywhere, anytime, on any device.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/packages" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center">
                            View Plans <Play className="w-5 h-5 ml-2" />
                        </Link>
                        <Link gap="3" to="/register" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-bold text-lg transition-all duration-300">
                            Free Trial
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Ultra Fast Servers</h3>
                            <p className="text-gray-400">Our Anti-Freeze technology ensures zero buffering during live sports and events.</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Global Content</h3>
                            <p className="text-gray-400">Access channels from over 100 countries in local and international languages.</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-pink-600/20 rounded-2xl flex items-center justify-center mb-6 text-pink-400">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Secure & Private</h3>
                            <p className="text-gray-400">Your connection is fully encrypted. Pay securely via multiple supported gateways.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
