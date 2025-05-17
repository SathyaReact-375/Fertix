import React from 'react'
import TopSellingProducts from './TopSellingProducts'
import shopbybrandone from '../assets/images/shopbybrands/image_1-removebg-preview.png';
import shopbybrandtwo from '../assets/images/shopbybrands/image_2-removebg-preview.png';
import shopbybrandthree from '../assets/images/shopbybrands/image_3-removebg-preview.png';
import shopbybrandfour from '../assets/images/shopbybrands/image_4-removebg-preview.png';
import shopbybrandfive from '../assets/images/shopbybrands/image_5-removebg-preview.png';
import shopbybrandsix from '../assets/images/shopbybrands/image_6-removebg-preview.png';
import shopbybrandseven from '../assets/images/shopbybrands/image_7-removebg-preview.png';
import truck from '../assets/images/whyfertix/truck_icon.png'
import checkmark from '../assets/images/whyfertix/check-square_icon.png'
import shoppingcarticon from '../assets/images/whyfertix/shopping-cart_icon.png'
import fertione from '../assets/images/Fertilizers/pesticide_image_1-removebg-preview.png'
import fertitwo from '../assets/images/Fertilizers/pesticide_image_2-removebg-preview.png'
import fertithree from '../assets/images/Fertilizers/pesticide_image_3-removebg-preview.png'
import banner from '../assets/images/banner/Seeds_HOME_page_image_1.png'
import bannertwo from '../assets/images/banner/Seeds_HOME_page_image_2.png'
import bannerthree from '../assets/images/banner/Seeds_HOME_page_image_3.png'
import bannerfour from '../assets/images/banner/Seeds_HOME_page_image_4.png'
import '../Components/assets/css/Home.css'
import { useNavigate } from 'react-router-dom';


function Home() {
   const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/seeds');
  };
  const brands = [
    { name: 'syngenta', image: shopbybrandone },
    { name: 'UPL', image: shopbybrandthree },
     { name: 'buy', image: shopbybrandseven },
    { name: 'BAYER', image: shopbybrandtwo },
     { name: 'FMC', image: shopbybrandsix },
    { name: 'dhanuka', image: shopbybrandfour },
    { name: 'Seminis', image: shopbybrandfive },
  ];
 const features = [
    {
      icon: truck,
      title: "Free Shipping",
      description: "Free Shipping for orders over Rs.499"
    },
    {
      icon: checkmark,
      title: "Money Guarantee",
      description: "Within 7 days for an exchange."
    },
    {
      icon: shoppingcarticon,
      title: "Flexible Payment",
      description: "Pay with Multiple Payment Methods"
    }
  ];
   const fertilizers = [
    {
      image: fertione,
      discount: "-30%",
      name: "Vermi compost Fertilizer"
    },
    {
      image: fertitwo,
      discount: "-50%",
      name: "Multi Purpose Fertilizer"
    },
    {
      image: fertithree,
      discount: "-30%",
      name: "Mustard Fertilizer"
    }
  ];
  return (
   <>
   <div className="banner">
      <img src={banner} alt="Seeds HOME page banner" />
      <div className="banner-text">
        <h1>Improve Crop Growth Effectively with FERTIX</h1>
        <button onClick={handleShopNow}>SHOP NOW</button>
      </div>
    </div>
  <TopSellingProducts/>
  <button className='showmore' onClick={handleShopNow}>SHOP NOW</button>
  <div className="shop-by-brands">
      <h2 className="section-title">Shop by Brands</h2>
      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div key={index} className="brand-card">
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="brand-logo"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
     <div className="why-fertix-container">
      <h1 className="why-fertix-title">Why FERTIX?</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon-wrapper">
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
<div className="featured-fertilizers-container">
      <h2 className="section-title">Featured Fertilizers:</h2>
      <div className="fertilizers-grid">
        {fertilizers.map((fertilizer, index) => (
          <div key={index} className="fertilizer-card">
            <div className="discount-badge">{fertilizer.discount}</div>
            <img src={fertilizer.image} alt={fertilizer.name} className="fertilizer-image" />
            <h3 className="name">{fertilizer.name}</h3>
          </div>
        ))}
      </div>
    </div>
      <div className="banner-two">
      <img src={bannertwo} alt="Seeds and fertilizer promotion" />
      <div className="banner-two-content">
        <h1>Get Greatest Yield with these</h1>
        <h2>SEEDS AND FERTILIZER...</h2>
      </div>
    </div>
    <div className="testimonials-section">
      <h2 className="section-title">What people are Saying?</h2>
      
      <div className="testimonials-container">
        <div className="testimonial-card">
          <img src={bannerthree} alt="Garden product packaging" />
          <div className="testimonial-content">
            <div className="stars">★★★★☆</div>
            <p className="quote">"Quality and Packaging are top notch, and its a great plan for new gardeners but a look at pricing could take it to the next level."</p>
          </div>
        </div>

        <div className="testimonial-card">
          <img src={bannerfour} alt="Flourishing garden" />
          <div className="testimonial-content">
            <div className="stars">★★★★☆</div>
            <p className="quote">"Thanks to Fertix, I have garden of my own. Their fertilizer have filled my garden with fruits and flowers. Exceptional quality Products"</p>
          </div>
        </div>
      </div>
    </div>

   </>
  )
}

export default Home