import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function AuthCallback() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchUser } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            fetchUser().then(() => {
                navigate('/dashboard');
            });
        } else {
            console.error("Auth failed: No token found");
            navigate('/login?error=Authentication failed');
        }
    }, [location, navigate, fetchUser]);

    return <Loader />;
}
