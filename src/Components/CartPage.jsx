import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './assets/css/CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [subtotal, setSubtotal] = useState(0);
  const [lastVisitedPage, setLastVisitedPage] = useState("Home");

  
  useEffect(() => {
    const storedPage = localStorage.getItem("lastVisitedPage");
    if (location.pathname !== "/cart") {
      localStorage.setItem("lastVisitedPage", location.pathname);
      setLastVisitedPage(location.pathname);
    } else if (storedPage) {
      setLastVisitedPage(storedPage);
    }
  }, [location]);

  
  useEffect(() => {
    setSubtotal(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-breadcrumb">
        <span className="home-link" onClick={() => navigate(lastVisitedPage)}>
          {lastVisitedPage.replace("/", "").toUpperCase()}
        </span> 
        &gt; Shopping Cart
      </div>
      
      <div className="cart-table-container">
        <div className="cart-header">
          <div className="header-product">PRODUCT</div>
          <div className="header-price">PRICE</div>
          <div className="header-quantity">QUANTITY</div>
          <div className="header-delete"></div>
          <div className="header-subtotal">SUBTOTAL</div>
        </div>
        
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.unique_id} className="cart-item">
                <div className="item-product">
                  <img src={item.image_path} alt={item.name} className="cartproduct-image" />
                  <div className="product-info">
                    <div className="product-name">{item.name}</div>
                    <div className="product-seeds">Seeds - {item.seeds || 50} Seeds</div>
                  </div>
                </div>
                
                <div className="item-price">₹ {item.price.toFixed(2)}</div>
                
                <div className="item-quantity">
                  <div className="quantity-selector">
                    <input 
                      type="text" 
                      value={String(item.quantity).padStart(2, '0')} 
                      readOnly 
                      className="quantity-value"
                    />
                    <div className="quantity-arrows">
                      <button 
                        className="arrow-up"
                        onClick={() => handleQuantityChange(item.unique_id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        &#9650;
                      </button>
                      <button 
                        className="arrow-down"
                        onClick={() => handleQuantityChange(item.unique_id, Math.max(1, item.quantity - 1))}
                        aria-label="Decrease quantity"
                      >
                        &#9660;
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="item-delete">
                  <button 
                    className="delete-button"
                    onClick={() => removeFromCart(item.unique_id)}
                    aria-label="Remove item"
                  >
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4H15V16C15 17.1046 14.1046 18 13 18H3C1.89543 18 1 17.1046 1 16V4Z" stroke="currentColor"/>
                      <path d="M5 4V2C5 0.89543 5.89543 0 7 0H9C10.1046 0 11 0.89543 11 2V4" stroke="currentColor"/>
                      <path d="M0 4H16" stroke="currentColor"/>
                      <path d="M6 7V13" stroke="currentColor"/>
                      <path d="M10 7V13" stroke="currentColor"/>
                    </svg>
                  </button>
                </div>
                
                <div className="item-subtotal">₹ {(item.price * item.quantity).toFixed(2)}</div>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">Your cart is empty</div>
        )}
      </div>
      
      <div className="cart-summary">
        <h2 className="summary-title">Cart Total</h2>
        
        <div className="summary-row">
          <span className="row-label">Subtotal</span>
          <span className="row-value">Rs.{subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-row">
          <span className="row-label">Shipping</span>
          <span className="row-value">Free</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-row">
          <span className="row-label">Total</span>
          <span className="row-value">Rs.{subtotal.toFixed(2)}</span>
        </div>

        <button className="pay-now-button" onClick={() => navigate('/payment')}>Pay Now</button>
      </div>
    </div>
  );
};

export default CartPage;