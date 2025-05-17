import React from "react";
import { NavLink } from "react-router-dom";
import "./assets/css/Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import fertixLogo from "../assets/images/fertixlogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid py-4">
        <div className="row g-5 text-white">  
          <div className="col-md-4 d-flex flex-column">
            <div className="d-flex align-items-center mb-3">
              <h4 className="footer-brand me-2 mb-0">Fertix</h4>
              <img src={fertixLogo} alt="Fertix Logo" width="40" height="40" />
            </div>
            <p className="footer-desc">
              It widely used for sowing seed like cotton, maize, groundnut, castor seed, garlic, onion, soybeans, rajma, peas, black grams, mung, lima beans etc. It is also widely used to distribute fertilizer like urea.
            </p>
          </div>

          <div className="col-md-2">
            <h5 className="footer-title">Categories</h5>
            <ul className="list-unstyled footer-links">
              <li><NavLink to="/seeds">Seeds</NavLink></li>
              <li><NavLink to="/fertilizer">Fertilizer</NavLink></li>
              <li><NavLink to="/growBags">Grow Bags</NavLink></li>
              <li><NavLink to="/tools">Tools</NavLink></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/terms">Terms and Condition</NavLink></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="footer-title">Support</h5>
            <ul className="list-unstyled footer-links">
              <li><i className="bi bi-telephone me-2"></i>91-9876543210</li>
              <li><i className="bi bi-globe me-2"></i>www.fertixwebsite.com</li>
              <li><i className="bi bi-geo-alt me-2"></i>124, Gandhi Nagar street, <br />chennai-6000006</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;