import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  // Get categories
  const categories = ['All', 'Electronics', 'Accessories', 'Sports', 'Home'];
  const categoryIcons = {
    'All': '🛍️',
    'Electronics': '📱',
    'Accessories': '💼',
    'Sports': '⚽',
    'Home': '🏠'
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-name">VirtualShop</span>
            </h1>
            <p className="hero-description">
              Discover premium products at unbeatable prices. Shop the latest trends with free shipping on orders over $50.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-hero"
                onClick={() => navigate('/#products')}
              >
                Shop Now
              </button>
              <button 
                className="btn btn-secondary btn-hero"
                onClick={() => navigate('/#categories')}
              >
                Browse Categories
              </button>
            </div>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">↩️</span>
                <span>Easy Returns</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⭐</span>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section" id="products">
        <div className="container">
          <SearchBar 
            onSearch={setSearchTerm}
            onCategoryFilter={setSelectedCategory}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category}
                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="category-icon">{categoryIcons[category]}</div>
                <h3 className="category-name">{category}</h3>
                <p className="category-count">
                  {category === 'All' 
                    ? `${products.length} Products`
                    : `${products.filter(p => p.category === category).length} Products`
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {!searchTerm && selectedCategory === 'All' && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked for you</p>
            </div>
            <div className="products-grid featured-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="products-section">
        <div className="container">
          {searchTerm || selectedCategory !== 'All' ? (
            <div className="section-header">
              <h2 className="section-title">
                {searchTerm ? `Search Results for "${searchTerm}"` : `${selectedCategory} Products`}
              </h2>
              <p className="results-count">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
          ) : (
            <div className="section-header">
              <h2 className="section-title">All Products</h2>
              <p className="section-subtitle">Explore our complete collection</p>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h2>No products found</h2>
              <p>Try adjusting your search or filters</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-content">
            <h2 className="trust-title">Why Choose VirtualShop?</h2>
            <div className="trust-grid">
              <div className="trust-item">
                <div className="trust-icon">🛡️</div>
                <h3>Secure Shopping</h3>
                <p>Your data is protected with industry-leading security</p>
              </div>
              <div className="trust-item">
                <div className="trust-icon">📦</div>
                <h3>Fast Delivery</h3>
                <p>Quick and reliable shipping to your doorstep</p>
              </div>
              <div className="trust-item">
                <div className="trust-icon">💬</div>
                <h3>24/7 Support</h3>
                <p>Our team is always here to help you</p>
              </div>
              <div className="trust-item">
                <div className="trust-icon">✨</div>
                <h3>Premium Quality</h3>
                <p>Only the best products make it to our store</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

