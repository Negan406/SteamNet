import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tv, Play, CheckCircle2, Star, ShieldCheck, Zap } from 'lucide-react';

export default function NetflixShowcase() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

    const features = [
        { icon: Star, text: 'Ultra HD 4K Quality', color: 'text-red-500' },
        { icon: Zap, text: 'Instant Provisioning', color: 'text-orange-500' },
        { icon: ShieldCheck, text: 'Private Profile/PIN', color: 'text-green-500' },
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-black selection:bg-red-600/30">
            {/* Dark background with subtle glows */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-transparent to-gray-950"></div>
            </div>

            {/* Animated Red Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/5 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-red-900/5 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Cinematic Visual */}
                    <motion.div
                        style={{ scale, opacity }}
                        className="w-full lg:w-1/2 relative group"
                    >
                        <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-red-900 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl aspect-video flex items-center justify-center">
                            {/* Backdrop Image with Netflix feel */}
                            <img
                                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200&auto=format&fit=crop"
                                alt="Netflix Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* The "N" Animation */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative z-20"
                            >
                                <div className="text-[120px] md:text-[180px] font-black text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.5)] select-none">
                                    N
                                </div>
                                <motion.div
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-full h-1 bg-red-600/50 blur-xl translate-y-24"></div>
                                </motion.div>
                            </motion.div>

                            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-30">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white shadow-xl overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-red-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                                        +5k
                                    </div>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">Streaming Live</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Metadata Cards */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 hidden sm:block bg-gray-900/90 backdrop-blur-xl border border-gray-700 p-4 rounded-2xl shadow-2xl z-40"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-red-600/10 rounded-lg flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="w-8 h-4 object-contain" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-black uppercase">Service Status</p>
                                    <p className="text-white font-bold text-sm">Ultra 4K Active</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Persuasive Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">New Arrival</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                                The Ultimate <span className="text-red-600">Netflix</span> Experience.
                            </h2>

                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
                                Say goodbye to shared confusion. Get your own <span className="text-white font-bold">private Netflix profile</span> with dedicated PIN protection, 4K HDR streaming, and instant delivery.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex items-center gap-4 p-4 bg-gray-900/30 border border-gray-800 rounded-2xl hover:bg-gray-800/50 transition-colors group cursor-default"
                                >
                                    <div className={`p-3 rounded-xl bg-gray-950 border border-gray-800 group-hover:scale-110 transition-transform`}>
                                        <f.icon className={`w-5 h-5 ${f.color}`} />
                                    </div>
                                    <span className="text-gray-300 font-bold tracking-wide">{f.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-red-600/30 flex items-center justify-center gap-3 group"
                                onClick={() => window.location.href = '/packages'}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png" alt="N" className="w-4 h-4 object-contain group-hover:scale-125 transition-transform" />
                                Get Netflix Now
                            </motion.button>
                            <div className="text-center sm:text-left">
                                <p className="text-white font-bold text-sm">Starting at $7.99</p>
                                <p className="text-gray-500 text-xs">No hidden fees. Instant cancel.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Edge Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-gray-950 to-transparent"></div>
        </section>
    );
}
