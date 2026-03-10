import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Checkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await api.get(`/packages/${id}`);
                setPkg(response.data);
            } catch (error) {
                console.error("Package not found");
                showToast('Plan not found.', 'error');
                navigate('/packages');
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id, navigate, showToast]);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const response = await api.post('/orders', {
                package_id: pkg.id,
                payment_method: paymentMethod
            });
            // Redirect to dashboard with success message
            showToast('Order completed successfully! Welcome aboard.', 'success');
            navigate('/dashboard');
        } catch (error) {
            console.error("Checkout failed", error.response?.data);
            showToast(error.response?.data?.message || "Checkout failed. Please try again.", "error");
            setProcessing(false);
        }
    };

    if (loading) return <Loader text="Preparing checkout..." />;
    if (!pkg) return null;

    return (
        <div className="py-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Secure Checkout</h1>
                    <p className="text-gray-400 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 mr-2 text-green-400" />
                        SSL Encrypted Payment
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 border border-gray-800 shadow-xl h-max">
                        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-medium text-white">{pkg.name}</h3>
                                <p className="text-sm text-gray-400">{pkg.duration_days} Days Access</p>
                            </div>
                            <span className="text-2xl font-bold text-white">${pkg.price}</span>
                        </div>
                        <ul className="space-y-2 mt-6 text-sm text-gray-400 border-t border-gray-800 pt-6">
                            <li className="flex justify-between"><span>Subscription Fee</span> <span>${pkg.price}</span></li>
                            <li className="flex justify-between"><span>Taxes & Fees</span> <span>$0.00</span></li>
                            <li className="flex justify-between text-white font-bold text-lg mt-4 pt-4 border-t border-gray-800">
                                <span>Total Amount</span> <span>${pkg.price}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 border border-gray-800 shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-4">Payment Methods</h2>
                        <form onSubmit={handleCheckout} className="space-y-6">
                            <div className="space-y-4">
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="credit_card"
                                        checked={paymentMethod === 'credit_card'}
                                        onChange={() => setPaymentMethod('credit_card')}
                                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-gray-800 border-gray-600"
                                    />
                                    <span className="ml-3 flex items-center text-white font-medium">
                                        <CreditCard className="w-5 h-5 mr-2 text-indigo-400" /> Credit / Debit Card
                                    </span>
                                </label>
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                        className="text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-800 border-gray-600"
                                    />
                                    <span className="ml-3 text-white font-medium flex items-center gap-2">
                                        PayPal
                                    </span>
                                </label>
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'crypto' ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="crypto"
                                        checked={paymentMethod === 'crypto'}
                                        onChange={() => setPaymentMethod('crypto')}
                                        className="text-orange-600 focus:ring-orange-500 h-4 w-4 bg-gray-800 border-gray-600"
                                    />
                                    <span className="ml-3 text-white font-medium flex items-center gap-2">
                                        Cryptocurrency (BTC/ETH)
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-xl font-bold text-lg text-center bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 mt-4"
                            >
                                {processing ? 'Processing Payment...' : `Pay $${pkg.price} Now`}
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-4">
                                By completing this purchase, you agree to our Terms of Service and Privacy Policy. All payments are processed securely.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
