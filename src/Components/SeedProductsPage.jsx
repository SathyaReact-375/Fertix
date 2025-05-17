import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/assets/css/SeedsPage.css';
import { useCart } from '../Components/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const SeedProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/FertixProducts.json');
        setProducts(response.data);
        setFilteredProducts(response.data.flatMap(cat => cat.products)); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? '' : category));
  };

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products
        .filter(cat => cat.category === selectedCategory)
        .flatMap(cat => cat.products)
      );
    } else {
      setFilteredProducts(products.flatMap(cat => cat.products)); 
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart', { state: { product } });
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.unique_id === product.unique_id)) {
      removeFromWishlist(product.unique_id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = (product) => wishlist.some(item => item.unique_id === product.unique_id);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="seed-products-page">
      <div className="filters-sidebar">
        <h3>Filters</h3>
        <div className="filter-section">
          <h4>Categories</h4>
          {products.map(cat => (
            <label key={cat.category} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedCategory === cat.category}
                onChange={() => handleCategoryChange(cat.category)}
              />
              {cat.category}
            </label>
          ))}
        </div>
      </div>

      <div className="products-main">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.unique_id} className="product-card">
              <div className="discount-label">{product.discount}</div>
              <div className="product-image">
                <img src={product.image_path} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="product-name-wrapper">
                  <h3 className="product-name">{product.name}</h3>
                  <FaHeart
                    className="wishlist-icon"
                    color={isWishlisted(product) ? "#626F47" : "#CCC"}
                    onClick={() => toggleWishlist(product)}
                  />
                </div>
                <div className="product-rating">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </div>
                <div className="product-price">₹{product.price.toFixed(2)}</div>
                <div className="product-actions">
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="buy-now" onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeedProductsPage;