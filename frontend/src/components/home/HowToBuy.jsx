import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import buyGuideImage from '../../assets/Gemini_Generated_Image_ig7420ig7420ig74.png';

const steps = [
    {
        number: 1,
        title: 'Visit Our Site',
        desc: 'Explore our offers on StreamNet.ma to find the plan that fits your needs.'
    },
    {
        number: 2,
        title: 'Choose Your Plan',
        desc: 'Select from our premium subscriptions, ranging from one month to one year.'
    },
    {
        number: 3,
        title: 'Make Payment',
        desc: 'Our secure platform accepts various payment methods for your convenience.'
    },
    {
        number: 4,
        title: 'Get Your Credentials',
        desc: 'Receive your login details and activation instructions instantly after purchase.'
    },
    {
        number: 5,
        title: 'Enjoy Streaming',
        desc: 'Log in and start exploring this net to picture like Get the account IPTV instantly when you pay!'
    }
];

export default function HowToBuy() {
    return (
        <section className="py-24 bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 w-full"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                            <img
                                src={buyGuideImage}
                                alt="How to Buy Guide"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-gray-900/40 to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 w-full text-left"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Comment Acheter chez <span className="text-indigo-500">StreamNet ?</span>
                        </h2>

                        <h3 className="text-xl md:text-2xl font-semibold text-gray-200 mb-4">
                            Simple Steps to Get Started with StreamNet Premium
                        </h3>

                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Purchasing a subscription from <span className="font-bold text-white">StreamNet</span> is a simple and secure process. Here's how to proceed:
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:scale-110 transition-transform duration-300">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-400 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
