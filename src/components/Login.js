import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Login.css';

const Login = () => {
    const { user, loginWithGoogle, loginWithApple } = useAuth();
    const navigate = useNavigate();

    // Redirect to /game if the user is logged in
    useEffect(() => {
        if (user) {
            navigate('/game');
        }
    }, [user, navigate]);

    return (
        <div className="login-container">
            <h2>Welcome to Pac-Man</h2>
            <p>Sign in to start playing</p>
            <button className="login-button google" onClick={loginWithGoogle}>
                <img src="/google-icon.png" alt="Google" />
                Sign in with Google
            </button>
            <button className="login-button apple" onClick={loginWithApple}>
                <img src="/apple-icon.png" alt="Apple" />
                Sign in with Apple
            </button>
        </div>
    );
};

export default Login;
