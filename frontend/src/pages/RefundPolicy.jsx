import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-8">Refund & Return Policy</h1>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. General Policy</h2>
                <p>We strive to ensure our customers are satisfied with their purchases. If you are not entirely satisfied with your subscription, we're here to help.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Refund Eligibility</h2>
                <p>To be eligible for a refund, you must request it within 7 days of your initial purchase. Refunds are only applicable to new subscriptions and not renewals.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Troubleshooting First</h2>
                <p>Before requesting a refund, we ask that you contact our support team to help resolve any technical issues you may be experiencing. Most problems can be fixed quickly.</p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. How to Request a Refund</h2>
                <p>To request a refund, please email our support team with your order number and the reason for the request. Approved refunds will be processed to your original method of payment within 5-10 business days.</p>
            </div>
        </div>
    );
}
