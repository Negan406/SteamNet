import React from 'react';

export default function TermsConditions() {
    return (
        <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using StreamNet, you accept and agree to be bound by the terms and provisions of this agreement.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Service Usage</h2>
                <p>Our IPTV service is provided for personal, non-commercial use only. You may not share, resell, or distribute your account credentials.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Content Availability</h2>
                <p>While we strive to provide a reliable service, we do not guarantee the availability of any specific channel or content, as these are subject to change without notice.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Account Termination</h2>
                <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.</p>
            </div>
        </div>
    );
}
