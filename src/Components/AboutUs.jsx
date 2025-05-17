import React from 'react';
import '../Components/assets/css/AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-section">
      <div className="about-card">
        <h1 className="about-title">Empowering Farmers, Cultivating Growth</h1>
        <h2 className="about-subtitle">Your trusted partner in agriculture with quality products and services.</h2>
        
        <p className="about-text">
          We are an innovative e-commerce platform dedicated to serving the agricultural community. 
          We provide a vast selection of farming products, including seeds, fertilizers, pesticides, 
          and tools, sourced from trusted sellers across the country. Our mission is to empower 
          farmers by making high-quality agricultural essentials accessible at competitive prices.
        </p>
        
        <h3 className="commitment-title">Our Commitment to Farmers</h3>
        <p className="about-text">
          We are driven by a passion to support India's farmers and improve their access to modern 
          agricultural solutions. We ensure that farmers have the tools and resources they need to 
          grow their crops, protect their fields, and maximize their yields. We are proud to be part 
          of the agricultural ecosystem and remain committed to helping farmers thrive in a competitive 
          and evolving landscape.
        </p>
        
       
        
        <div className="features-container">
          <div className="feature-item">
            <h4>One-Stop Solution</h4>
            <p>From organic foods to advanced farming tools, we offer everything you need in one place.</p>
          </div>
          
          <div className="feature-item">
            <h4>Convenience & Quality</h4>
            <p>Shop easily with a user-friendly platform and get the best quality agricultural products.</p>
          </div>
          
          <div className="feature-item">
            <h4>Indian Agriculture</h4>
            <p>Our goal is to help farmers grow sustainably and contribute to the Indian agricultural ecosystem.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;