import React, { useState } from 'react';
import { MessageCircle, X, Phone, MessageSquare } from 'lucide-react';

export default function WhatsAppSupport() {
    const [isOpen, setIsOpen] = useState(false);

    const contacts = [
        { name: 'Aqli Soufiane', phone: '+212679224411', label: '0679224411' },
        { name: 'Essalmi Abderahman', phone: '+212767273710', label: '0767273710' }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            {/* Expanded Menu */}
            {isOpen && (
                <div className="mb-4 space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl w-72">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-bold flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
                                WhatsApp Support
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {contacts.map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={`https://wa.me/${contact.phone.replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-gray-800/50 hover:bg-green-500/10 border border-gray-700/50 hover:border-green-500/30 rounded-2xl transition-all group"
                                >
                                    <div className="bg-green-500 p-2 rounded-xl group-hover:scale-110 transition-transform">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{contact.name}</p>
                                        <p className="text-sm text-gray-200 font-mono">{contact.label}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <p className="mt-6 text-[10px] text-gray-600 text-center font-medium italic">
                            Agent response time: <span className="text-green-500">~2-5 mins</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Main FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 transform ${isOpen
                        ? 'bg-gray-800 rotate-90 border border-gray-700'
                        : 'bg-[#25D366] hover:bg-[#20ba5a] hover:scale-110 active:scale-95'
                    } group relative`}
            >
                <div className={`absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20 ${isOpen ? 'hidden' : ''}`}></div>
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <MessageCircle className="w-8 h-8 text-white" />
                )}
            </button>
        </div>
    );
}
