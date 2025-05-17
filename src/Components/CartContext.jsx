import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [lastVisitedPage, setLastVisitedPage] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.unique_id === product.unique_id);
      if (existingItem) {
        return prevCart.map(item =>
          item.unique_id === product.unique_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.unique_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.unique_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.unique_id === product.unique_id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(item => item.unique_id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        lastVisitedPage,
        setLastVisitedPage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
