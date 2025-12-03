import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { user, addToCart } = useMarketplace();

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-category">{product.category}</div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {'⭐'.repeat(Math.floor(product.rating))}
          <span className="rating-text">({product.rating})</span>
        </div>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="btn btn-primary add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
        
        <div className="product-stock">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock ({product.stock})</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;



