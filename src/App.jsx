import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import CartPage from './Components/CartPage';
import SeedProductsPage from './Components/SeedProductsPage';
import FertilizerProductsPage from './Components/FertilizerProductsPage';
import GrowBagsProductsPage from './Components/GrowBagsProductsPage';
import ToolsProductsPage from './Components/ToolsProductsPage';
import Login from './Components/Login';
import Register from './Components/Register';
import Wishlist from './Components/WishlistPage';
import AboutUs from './Components/AboutUs';
import TermsAndConditions from './Components/TermsAndConditions';
import PaymentFlow from './Components/PaymentFlow';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/seeds" element={<SeedProductsPage />} />
        <Route path="/fertilizer" element={<FertilizerProductsPage />} />
        <Route path="/growBags" element={<GrowBagsProductsPage />} />
        <Route path="/tools" element={<ToolsProductsPage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<AboutUs />} />
         <Route path="/terms" element={<TermsAndConditions />} />
         <Route path="/payment" element={<PaymentFlow />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;