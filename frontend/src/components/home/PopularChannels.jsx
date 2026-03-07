import React from 'react';
import { motion } from 'framer-motion';

// Import local channel logos
import beinSportsLogo from '../../assets/channels/bein-sports.png';
import discoveryLogo from '../../assets/channels/Discovery-Channel-Logo.png';
import skySportsLogo from '../../assets/channels/sky-sports-logo-sky-sports-logo-2017-11562893928jxfigpzsqy.png';

// Note: Feel free to swap these out with local assets in src/assets/channels/ if preferred
const channels = [
    { id: 1, name: 'BeIN Sports', img: beinSportsLogo, isDark: false },
    { id: 2, name: 'Sky Sports', img: skySportsLogo, isDark: false },
    { id: 3, name: 'HBO', img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg', isDark: true },
    { id: 4, name: 'ESPN', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/ESPN_wordmark.svg', isDark: false },
    { id: 5, name: 'Fox News', img: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg', isDark: false },
    { id: 6, name: 'Disney', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Disney_wordmark.svg', isDark: true },
    { id: 7, name: 'Discovery', img: discoveryLogo, isDark: false },
    { id: 8, name: 'Nat Geo', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/National_Geographic_logo.svg', isDark: true },
];

export default function PopularChannels() {
    return (
        <section className="py-20 bg-gray-900 border-t border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Channels</h2>
                    <p className="text-gray-400">Stream your favorite networks in stunning 4K and FHD quality.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {channels.map((channel, i) => (
                        <motion.div
                            key={channel.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-gray-950 rounded-2xl p-6 flex items-center justify-center border border-gray-800 cursor-pointer shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300"
                        >
                            <img
                                src={channel.img}
                                alt={channel.name}
                                className={`max-h-12 object-contain transition-all duration-300 opacity-60 hover:opacity-100 ${channel.isDark ? 'brightness-0 invert' : 'grayscale hover:grayscale-0'}`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
