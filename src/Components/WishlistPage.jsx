import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './assets/css/TopSellingProducts.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart', { state: { product } });
  };

  return (
    <div className="topselling-container">
      <div className="topselling-title">Home &gt; Wishlist</div>
      <h2 className="topselling-title">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="topselling-empty">Your wishlist is empty. Why???</div>
      ) : (
        <div className="topselling-products-grid">
          {wishlist.map((product) => (
            <div key={product.unique_id} className="topselling-product-card">
              <div className="topselling-discount-badge">{product.discount}</div>
              <img src={product.image_path} alt={product.name} className="topselling-product-image" />
              <div className="topselling-product-details">
                <div className="topselling-product-header">
                  <h3 className="topselling-product-name">{product.name}</h3>
                  <FaTrash
                    className="wishlist-icon"
                    color="red"
                    onClick={() => removeFromWishlist(product.unique_id)}
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
      )}
    </div>
  );
};

export default WishlistPage;
