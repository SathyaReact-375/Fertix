import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/vegseeds.css'; 

const FruitSeeds = () => {
  const [fruitSeeds, setFruitSeeds] = useState([]);

  useEffect(() => {
    axios.get('/FertixProducts.json')
      .then(response => {
        const allCategories = response.data;
        const fruitSeedsData = allCategories.find(cat => cat.category === 'Fruits Seeds');
        setFruitSeeds(fruitSeedsData?.products || []);
      })
      .catch(error => console.error("Error fetching fruit seeds data:", error));
  }, []);

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Fruit Seeds</h4>
      <div className="row">
        {fruitSeeds.map(product => (
          <div key={product.unique_id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 position-relative product-card">
              {product.discount && <span className="discount-badge">{product.discount}</span>}
              <img
                src={product.image_path}
                alt={product.name}
                className="card-img-top product-image"
              />
              <div className="card-body text-start">
                <h6 className="fw-semibold product-name">{product.name}</h6>
                {product.rating && (
                  <div className="text-warning product-rating">
                    {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                  </div>
                )}
                <p className="fw-semibold product-price mt-1">₹ {product.price.toFixed(2)}</p>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-success btn-sm px-3">Add to Cart</button>
                  <button className="btn btn-outline-dark btn-sm px-3">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {fruitSeeds.length > 0 && (
        <div className="text-center mt-3">
          <button className="btn btn-warning show-more-btn">Show more</button>
        </div>
      )}
    </div>
  );
};

export default FruitSeeds;