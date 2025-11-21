import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, getCartItemCount } = useMarketplace();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Virtual<span className="logo-accent">Shop</span></span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/cart" className="navbar-link cart-link">
                Cart
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Link>
              <Link to="/orders" className="navbar-link">
                Orders
              </Link>
              <div className="navbar-user">
                <img 
                  src={user.photoURL || 'https://via.placeholder.com/40'} 
                  alt={user.displayName}
                  className="user-avatar"
                />
                <span className="user-name">{user.displayName}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="navbar-link">
              <button className="btn-login">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

