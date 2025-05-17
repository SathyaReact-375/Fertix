import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/TopSellingProducts.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/FertixProducts.json');
        const topSellingCategory = response.data.find(category => category.category === "Top Selling Products");
        setProducts(topSellingCategory ? topSellingCategory.products : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.unique_id === product.unique_id)) {
      removeFromWishlist(product.unique_id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = (product) => wishlist.some(item => item.unique_id === product.unique_id);

  const showMoreProducts = () => {
    setVisibleProducts(prev => prev + 4);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart', { state: { product } });
  };

  if (loading) {
    return <div className="topselling-loading">Loading...</div>;
  }

  return (
    <div className="topselling-container">
      <h2 className="topselling-title">Top Selling Products</h2>
      <div className="topselling-products-grid">
        {products.slice(0, visibleProducts).map((product) => (
          <div key={product.unique_id} className="topselling-product-card">
            <div className="topselling-discount-badge">{product.discount}</div>
            <img src={product.image_path} alt={product.name} className="topselling-product-image" />
            <div className="topselling-product-details">
              <div className="topselling-product-header">
                <h3 className="topselling-product-name">{product.name}</h3>
                <FaHeart
                  className="wishlist-icon"
                  color={isWishlisted(product) ? "#626F47" : "#CCC"}
                  onClick={() => toggleWishlist(product)}
                />
              </div>
              <div className="topselling-product-rating">
                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              </div>
              <p className="topselling-product-price">₹{product.price.toFixed(2)}</p>
              <div className="topselling-action-buttons">
                <button className="topselling-add-to-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                <button className="topselling-buy-now" onClick={() => handleBuyNow(product)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="topselling-show-more-container">
          <button className="topselling-show-more" onClick={showMoreProducts}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopSellingProducts;
