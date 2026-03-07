import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Film, Radio, Baby, Globe2, Compass } from 'lucide-react';

const categories = [
    { name: 'Sports', icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Movies', icon: Film, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'News', icon: Radio, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Kids', icon: Baby, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'International', icon: Globe2, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { name: 'Documentary', icon: Compass, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
];

export default function CategorySlider() {
    return (
        <section className="py-12 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center pb-6 pt-4 gap-4 sm:gap-6"
                >
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.name}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`w-32 h-28 sm:w-40 sm:h-32 rounded-3xl ${cat.bg} border border-gray-800/50 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-800 shadow-lg`}
                            >
                                <Icon className={`w-10 h-10 ${cat.color} mb-3`} />
                                <span className="text-white font-medium">{cat.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
