import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useMarketplace();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                    max={item.stock}
                    className="quantity-input"
                  />
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  aria-label="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{getCartTotal() > 50 ? 'FREE' : '$5.99'}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>
                ${(getCartTotal() * 1.1 + (getCartTotal() > 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>

            {getCartTotal() < 50 && (
              <p className="free-shipping-notice">
                Add ${(50 - getCartTotal()).toFixed(2)} more for FREE shipping!
              </p>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary checkout-btn"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary continue-shopping-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;



