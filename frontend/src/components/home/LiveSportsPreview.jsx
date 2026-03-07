import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

// Import local video
import sportsVideo from '../../assets/videos/sports-preview.mp4';

export default function LiveSportsPreview() {
    return (
        <section className="py-16 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-800 group h-[500px]"
                >
                    {/* Background Video */}
                    <div className="absolute inset-0 bg-gray-900 overflow-hidden">
                        <video
                            src={sportsVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105"
                        ></video>
                        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
                    </div>

                    <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-500 font-bold text-sm tracking-wider uppercase mb-4 animate-pulse">
                                • Live Now
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                Watch Live Sports <br /> From Anywhere
                            </h2>
                            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center mx-auto">
                                View Sports Channels <Play className="w-5 h-5 ml-2" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
