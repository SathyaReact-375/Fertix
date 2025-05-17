import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import fertixLogo from "../assets/images/fertixlogo.png";
import "./assets/css/Header.css";
import { FaHeart, FaShoppingCart, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <header>
      <div className="top-bar d-flex align-items-center justify-content-between flex-wrap px-3">
        <div className="d-flex align-items-center gap-2">
          <h1 className="brand-name m-0 fs-1">Fertix</h1>
          <img src={fertixLogo} alt="Fertix Logo" className="logo" />
        </div>

        <div className="search-container">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search products..."
          />
          <button className="search-btn"><FaSearch /></button>
        </div>

        <div className="icons d-flex align-items-center">
          <NavLink to="/wishlist" className="nav-icon"><FaHeart /></NavLink>
          <NavLink to="/cart" className="nav-icon"><FaShoppingCart /></NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className="nav-icon me-2"><FaUser /></NavLink>
              <button onClick={handleLogoutClick} className="login-text">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="login-text me-2">Log In</NavLink>
          )}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container justify-content-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            ☰
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav nav-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/seeds" className="nav-link">Seeds</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/fertilizer" className="nav-link">Fertilizer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/growBags" className="nav-link">Grow Bags</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/tools" className="nav-link">Tools</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;