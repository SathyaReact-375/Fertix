import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../Components/assets/css/ToolsPage.css';
import { FaHeart } from "react-icons/fa";

const ToolsProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/FertixProducts.json');
        const toolsData = response.data.find(category => category.category === "Tools");
        setProducts(toolsData ? toolsData.products : []);
      } catch (error) {
        console.error('Error fetching Tools products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    setTimeout(() => {
      navigate('/cart', { state: { product } });
    }, 500);
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
    return <div className="loading">Loading Tools...</div>;
  }

  return (
    <div className="tools-products-page">
      <div className="products-main">
        <div className="products-grid">
          {Array.isArray(products) && products.map(product => (
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
                <div className="product-price">₹{product.price.toFixed(2)}</div>
                <div className="product-rating">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </div>
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

export default ToolsProductsPage;