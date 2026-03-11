import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Globe, Shield, Zap, Award, Users, Play, Radio, Cpu, Smartphone } from 'lucide-react';

export default function AboutUs() {
    const stats = [
        { label: 'Live Channels', value: '25,000+', icon: Tv },
        { label: 'Global Servers', value: '60+', icon: Globe },
        { label: 'Active Users', value: '150k+', icon: Users },
        { label: 'Uptime', value: '99.99%', icon: Zap },
    ];

    const coreValues = [
        {
            title: "Crystal Clear 4K",
            description: "We invest in the highest bit-rate streams to ensure you experience true 4K and Ultra HD quality without compromise.",
            icon: Play,
            color: "text-indigo-400"
        },
        {
            title: "Anti-Freeze Technology",
            description: "Our proprietary buffering algorithms and high-speed bandwidth prevent freezing even during peak global events.",
            icon: Cpu,
            color: "text-blue-400"
        },
        {
            title: "Secure & Anonymous",
            description: "We respect your privacy. Our platform uses end-to-end encryption to keep your viewing habits private.",
            icon: Shield,
            color: "text-purple-400"
        }
    ];

    const contentDetails = [
        { title: 'Global Cinema', val: 'Over 60,000 VOD titles including latest box office hits from Netflix, Disney+, and HBO.' },
        { title: 'Live Sports', val: 'Full coverage of BeIN Sports, Sky Sports, DAZN, and every major league worldwide.' },
        { title: 'Kids & Family', val: 'Hundreds of dedicated channels for children including Disney, Nickelodeon, and Cartoon Network.' },
        { title: 'News & Media', val: 'International news from BBC, CNN, Al Jazeera, and local networks in 20+ languages.' }
    ];

    return (
        <div className="bg-gray-950 overflow-hidden min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] -z-10 rounded-full translate-x-1/4 -translate-y-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6"
                        >
                            The Future of Media
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]"
                        >
                            StreamNet: Global <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Entertainment Hub</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 leading-relaxed font-light"
                        >
                            Founded with a mission to eliminate borders in entertainment, StreamNet delivers premium IPTV services to over 150,000 satisfied users. Our infrastructure is engineered for the next generation of visual content.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Metrics Grid */}
            <section className="py-20 border-y border-gray-900 bg-gray-900/10 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="relative group text-center lg:text-left">
                                <div className="absolute -inset-2 bg-indigo-500/5 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 text-indigo-400 mb-6 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500">
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Info Sections */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 border-l-4 border-indigo-600 pl-6">
                                Unrivaled Content <br />
                                <span className="text-indigo-400">Diversity</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light">
                                We don't just provide channels; we provide a gateway to the world's media. From live sports to the latest cinematic releases, our library is updated daily to ensure you never miss a moment.
                            </p>
                            <div className="space-y-6">
                                {contentDetails.map((item, idx) => (
                                    <div key={idx} className="flex space-x-4 group">
                                        <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2.5 shrink-0 group-hover:scale-150 transition-transform"></div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-[3rem] blur-2xl opacity-50"></div>
                            <div className="relative bg-gray-900 border border-gray-800 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:scale-125 transition-transform duration-1000">
                                    <Radio className="w-64 h-64 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Network Intelligence</h3>
                                <p className="text-gray-400 mb-8 relative z-10 font-light italic">
                                    "Our system automatically switches between 60+ global CDN nodes to find the path of least resistance to your television, ensuring a flicker-free experience."
                                </p>
                                <div className="flex items-center space-x-4 relative z-10">
                                    <div className="h-1 flex-grow bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-[95%]"></div>
                                    </div>
                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Efficiency 95%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA/Values */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coreValues.map((value, idx) => (
                            <div key={idx} className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 hover:bg-gray-900/50 transition-all duration-300">
                                <value.icon className={`w-10 h-10 ${value.color} mb-6`} />
                                <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compatibility Section */}
            <section className="py-24 bg-indigo-600/5 border-t border-indigo-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-12 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 mr-3 text-indigo-400" />
                        Compatible With Every Device
                    </h2>
                    <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {['Android TV', 'Apple iOS', 'Samsung Smart', 'LG WebOS', 'Amazon Firestick', 'Windows PC'].map((device) => (
                            <span key={device} className="text-gray-400 font-black uppercase tracking-widest text-xs">{device}</span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
