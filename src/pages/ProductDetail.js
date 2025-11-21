import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { products } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart } = useMarketplace();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      alert('Please sign in to add items to cart');
      navigate('/login');
      return;
    }

    if (quantity > product.stock) {
      alert('Quantity exceeds available stock');
      return;
    }

    addToCart(product, quantity);
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Please sign in to purchase');
      navigate('/login');
      return;
    }

    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <div className="product-category-badge">{product.category}</div>
            <h1 className="product-detail-title">{product.name}</h1>
            
            <div className="product-detail-rating">
              {'⭐'.repeat(Math.floor(product.rating))}
              <span className="rating-text">({product.rating} rating)</span>
            </div>

            <div className="product-detail-price">
              ${product.price.toFixed(2)}
            </div>

            <div className="product-detail-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-features">
              <h3>Features:</h3>
              <ul>
                <li>High-quality materials</li>
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy</li>
                <li>1-year warranty included</li>
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-secondary"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="btn btn-primary"
                  disabled={product.stock === 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

