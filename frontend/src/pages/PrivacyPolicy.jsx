import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
                <p>We collect information you provide directly to us when you register for an account, make a purchase, or communicate with us. This may include your name, email address, and payment information.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@streamnet.com.</p>
            </div>
        </div>
    );
}
