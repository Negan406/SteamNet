import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            showToast('Your message has been sent. We will get back to you soon!', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const whatsappContacts = [
        { name: 'Technical Support', phone: '+212679224411', label: '0679224411' },
        { name: 'Billing & Sales', phone: '+212767273710', label: '0767273710' }
    ];

    return (
        <div className="bg-gray-950 py-24 sm:py-32 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] -z-10 rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Facing technical issues or have a question about our plans? Our team is available 24/7 to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* WhatsApp Contacts */}
                        <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 backdrop-blur-sm shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                <MessageCircle className="w-32 h-32 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center relative z-10">
                                <MessageCircle className="w-6 h-6 mr-3 text-green-500" />
                                WhatsApp Support
                            </h3>
                            <div className="space-y-4 relative z-10">
                                {whatsappContacts.map((contact, idx) => (
                                    <a
                                        key={idx}
                                        href={`https://wa.me/${contact.phone.replace('+', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-black/40 border border-gray-800 hover:border-green-500/30 rounded-2xl transition-all group/link"
                                    >
                                        <div className="bg-green-500 p-2.5 rounded-xl group-hover/link:scale-110 transition-transform">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{contact.name}</p>
                                            <p className="text-white font-mono font-bold">{contact.label}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: 'Email Support', val: 'support@streamnet.com', icon: Mail, color: 'text-indigo-400' },
                                { label: 'Active Status', val: '24/7 Available', icon: Clock, color: 'text-green-400' },
                                { label: 'Service Coverage', val: 'Global Network', icon: Globe, color: 'text-purple-400' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 flex items-center space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-xl border border-gray-700/50">
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">{item.label}</p>
                                        <p className="text-gray-300 font-semibold">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden h-full">
                            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="w-full bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter your email"
                                        className="w-full bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="How can we help?"
                                        className="w-full bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-2">Message</label>
                                    <textarea
                                        rows="6"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Write your message here..."
                                        className="w-full bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                    />
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full md:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-indigo-600/20 flex items-center justify-center space-x-3 group"
                                    >
                                        <span>{isSubmitting ? 'Sending Request...' : 'Send Intelligence Ticket'}</span>
                                        <Send className={`w-5 h-5 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
