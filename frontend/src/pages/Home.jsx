import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

// Home Components
import CategorySlider from '../components/home/CategorySlider';
import LiveSportsPreview from '../components/home/LiveSportsPreview';
import PopularChannels from '../components/home/PopularChannels';
import MoviesSeriesSlider from '../components/home/MoviesSeriesSlider';
import FeaturesSection from '../components/home/FeaturesSection';
import DeviceCompatibility from '../components/home/DeviceCompatibility';

export default function Home() {
    return (
        <div className="relative overflow-hidden bg-gray-950">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                            The Future of <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Entertainment</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
                            Experience over 20,000 live channels and limitless VODs in crystal clear 4K quality. Anywhere, anytime, on any device.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link to="/packages" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center">
                                View Plans <Play className="w-5 h-5 ml-2" />
                            </Link>
                            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center">
                                Free Trial
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Injected Interactive Components */}
            <CategorySlider />
            <LiveSportsPreview />
            <PopularChannels />
            <MoviesSeriesSlider />
            <FeaturesSection />
            <DeviceCompatibility />

        </div>
    );
}
