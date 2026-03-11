import React from 'react';
import { Tv, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            <Tv className="w-6 h-6 text-indigo-500" />
                            <span className="text-xl font-bold text-white">StreamNet</span>
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            Premium IPTV service delivering high quality entertainment globally.
                            Experience the future of television securely and reliably.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                        <Link to="/about-us" className="text-gray-500 hover:text-indigo-400 transition-colors">About Us</Link>
                        <Link to="/contact" className="text-gray-500 hover:text-indigo-400 transition-colors">Contact</Link>
                        <Link to="/terms-conditions" className="text-gray-500 hover:text-indigo-400 transition-colors">Terms</Link>
                        <Link to="/privacy-policy" className="text-gray-500 hover:text-indigo-400 transition-colors">Privacy</Link>
                        <Link to="/refund-policy" className="text-gray-500 hover:text-indigo-400 transition-colors">Refund</Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-900 flex items-center justify-center text-gray-500 text-sm">
                    <p>
                        © {new Date().getFullYear()} StreamNet IPTV. Created with <Heart className="w-4 h-4 inline-block text-red-500 mx-1" /> for amazing experiences.
                    </p>
                </div>
            </div>
        </footer>
    );
}
