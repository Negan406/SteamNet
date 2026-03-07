import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Zap, MonitorSmartphone, Clock, Globe, Headset } from 'lucide-react';

const features = [
    { icon: Tv, title: '15,000+ Channels', desc: 'Premium live TV channels spanning global sports, news, and entertainment.', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { icon: Zap, title: '4K & HD Quality', desc: 'Experience crystal clear streaming with our high-bandwidth infrastructure.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { icon: MonitorSmartphone, title: 'Multi Device Support', desc: 'Watch seamlessly on your Smart TV, phone, tablet, or desktop computer.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Clock, title: '99.9% Uptime', desc: 'Our anti-freeze servers guarantee virtually zero buffering during peak hours.', color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: Globe, title: 'Global Channels', desc: 'Extensive library of USA, UK, EU, Arabic, and latency-free international VODs.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Headset, title: '24/7 Support', desc: 'Dedicated technical team ready to assist you around the clock via live chat.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">StreamNet?</span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We provide a premium viewing experience designed for reliability, vast content selection, and unbeatable quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feat, index) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-gray-950 p-8 rounded-3xl border border-gray-800 hover:border-gray-700 shadow-xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feat.bg}`}>
                                    <Icon className={`w-8 h-8 ${feat.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feat.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
