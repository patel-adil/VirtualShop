import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import './Orders.css';

const Orders = () => {
  const { orders } = useMarketplace();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2>No orders yet</h2>
          <p>Start shopping and your orders will appear here</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Processing': '#667eea',
      'Shipped': '#4285f4',
      'Delivered': '#34a853',
      'Cancelled': '#ea4335'
    };
    return colors[status] || '#666';
  };

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        <p className="orders-count">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>

        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{formatDate(order.date)}</p>
                </div>
                <div 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-details">
                      <p className="order-item-name">{item.name}</p>
                      <p className="order-item-meta">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="order-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-shipping">
                  <h4>Shipping Address</h4>
                  <p>{order.shippingInfo.fullName}</p>
                  <p>{order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                  </p>
                  <p>{order.shippingInfo.phone}</p>
                </div>

                <div className="order-total-section">
                  <p className="order-total-label">Order Total</p>
                  <p className="order-total-amount">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;



