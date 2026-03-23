import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
import Home from '../pages/Home';
import Packages from '../pages/Packages';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Checkout from '../pages/Checkout';
import ForgotPassword from '../pages/ForgotPassword';
import SetupGuide from '../pages/SetupGuide';
import AdminPanel from '../pages/AdminPanel';
import AdminIptv from '../pages/AdminIptv';
import AdminSubscriptions from '../pages/AdminSubscriptions';
import AdminNetflix from '../pages/AdminNetflix';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsConditions from '../pages/TermsConditions';
import RefundPolicy from '../pages/RefundPolicy';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppSupport from '../components/WhatsAppSupport';
import AuthCallback from '../pages/AuthCallback';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children, roleRequired }) {
    const { user } = React.useContext(AuthContext);
    if (!user) return <Navigate to="/login" />;
    if (roleRequired && user.role !== roleRequired) return <Navigate to="/dashboard" />;
    return children;
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans">
                <Navbar />
                <main className="flex-1 flex flex-col">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/packages" element={<Packages />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/setup-guide" element={<SetupGuide />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-conditions" element={<TermsConditions />} />
                        <Route path="/refund-policy" element={<RefundPolicy />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin/panel"
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route
                            path="/admin/iptv"
                            element={
                                <PrivateRoute roleRequired="admin">
                                    <AdminIptv />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin/subscriptions"
                            element={
                                <PrivateRoute roleRequired="admin">
                                    <AdminSubscriptions />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin/netflix"
                            element={
                                <PrivateRoute roleRequired="admin">
                                    <AdminNetflix />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/checkout/:id"
                            element={
                                <PrivateRoute>
                                    <Checkout />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </main>
                <WhatsAppSupport />
                <Footer />
            </div>
        </BrowserRouter>
    );
}
