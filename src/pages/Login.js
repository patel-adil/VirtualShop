import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import './Login.css';

const Login = () => {
  const { user, signInWithGoogle, loading } = useMarketplace();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <span className="login-logo-icon">🛍️</span>
            <h1 className="login-title">Virtual<span className="title-accent">Shop</span></h1>
          </div>
          <p className="login-subtitle">Your Premium Shopping Destination Awaits</p>
          
          <div className="login-features">
            <div className="feature">
              <span className="feature-icon">🛍️</span>
              <span>Browse thousands of products</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔍</span>
              <span>Search and filter easily</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span>Track your orders</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💳</span>
              <span>Secure checkout</span>
            </div>
          </div>

          <button 
            onClick={signInWithGoogle}
            className="google-signin-btn"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="google-icon"
            />
            Sign in with Google
          </button>

          <p className="login-terms">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

