import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tv, Laptop, Cast, Cpu } from 'lucide-react';

const devices = [
    { name: 'Smart TV', icon: Tv },
    { name: 'Android TV', icon: Monitor },
    { name: 'iOS / macOS', icon: Smartphone },
    { name: 'Windows Box', icon: Laptop },
    { name: 'Firestick', icon: Cast },
    { name: 'MAG Box', icon: Cpu },
];

export default function DeviceCompatibility() {
    return (
        <section className="py-20 bg-gray-950 border-t border-gray-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supported on All Devices</h2>
                    <p className="text-gray-400">StreamNet works seamlessly across any smart device you own.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {devices.map((device, index) => {
                        const Icon = device.icon;
                        return (
                            <motion.div
                                key={device.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 0] }}
                                className="flex flex-col items-center justify-center p-6 bg-linear-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-lg cursor-pointer group"
                            >
                                <Icon className="w-12 h-12 text-gray-500 group-hover:text-indigo-400 transition-colors mb-4" />
                                <span className="text-white font-medium text-sm text-center">{device.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
