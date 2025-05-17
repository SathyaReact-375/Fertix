import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './assets/css/PaymentFlow.css';

const PaymentFlow = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardType: 'visa',
    name: '',
    cardNumber: '',
    validDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  }, [cart]);

  useEffect(() => {
    if (cart.length === 0 && currentStep !== 4) {
      navigate('/');
    }
  }, [cart, navigate, currentStep]);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setCurrentStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleCardTypeSelect = (type) => {
    setCardDetails({ ...cardDetails, cardType: type });
  };

  const handleNext = () => {
    if (!cardDetails.name || !cardDetails.cardNumber || !cardDetails.validDate || !cardDetails.cvv) {
      alert('Please fill in all card details');
      return;
    }
    setCurrentStep(3);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCurrentStep(4);
      setIsProcessing(false);
    }, 1500);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const renderPaymentMethods = () => (
    <div className="payment-methods-container">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>Home</span> &gt; 
        <span onClick={() => navigate('/cart')}>Shopping Cart</span> &gt; 
        <span className="active">Order Summary</span>
      </div>

      <h2>Payment methods</h2>
      
      <div className="payment-options">
        <button 
          className="payment-option-btn" 
          onClick={() => handlePaymentMethodSelect('upi')}
        >
          UPI
        </button>
        
        <button 
          className="payment-option-btn" 
          onClick={() => handlePaymentMethodSelect('debit')}
        >
          Debit Cards
        </button>
        
        <button 
          className="payment-option-btn" 
          onClick={() => handlePaymentMethodSelect('credit')}
        >
          Credit Cards
        </button>
        
        <button 
          className="payment-option-btn" 
          onClick={() => handlePaymentMethodSelect('cod')}
        >
          Cash On Delivery
        </button>
      </div>
    </div>
  );

  const renderCardDetails = () => (
    <div className="card-details-container">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>Home</span> &gt; 
        <span onClick={() => navigate('/cart')}>Shopping Cart</span> &gt; 
        <span className="active">Order Summary</span>
      </div>

      <div className="card-details-form">
        <h2>Card Details</h2>
        
        <div className="form-group">
          <label>Card type</label>
          <div className="card-types">
            <div 
              className={`card-type ${cardDetails.cardType === 'visa' ? 'selected' : ''}`} 
              onClick={() => handleCardTypeSelect('visa')}
            >
              <div className="visa-card">VISA</div>
            </div>
            <div 
              className={`card-type ${cardDetails.cardType === 'mastercard' ? 'selected' : ''}`} 
              onClick={() => handleCardTypeSelect('mastercard')}
            >
              <div className="mastercard">MasterCard</div>
            </div>
            <div 
              className={`card-type ${cardDetails.cardType === 'rupay' ? 'selected' : ''}`} 
              onClick={() => handleCardTypeSelect('rupay')}
            >
              <div className="rupay-card">RuPay</div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            placeholder="Name on card"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength="19"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="validDate">Valid Date</label>
            <input
              type="text"
              id="validDate"
              name="validDate"
              value={cardDetails.validDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          
          <div className="form-group half">
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              placeholder="XXX"
              maxLength="3"
              required
            />
          </div>
        </div>
        
        <button 
          className="next-btn" 
          onClick={handleNext}
        >
          NEXT
        </button>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="order-summary-container">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>Home</span> &gt; 
        <span onClick={() => navigate('/cart')}>Shopping Cart</span> &gt; 
        <span className="active">Order Summary</span>
      </div>

      <h2>Order Summary</h2>
      
      <div className="summary-card">
        <h3>Card Details</h3>
        
        <div className="card-info">
          <div className="form-group">
            <label>Card type</label>
            <div className="card-types">
              <div className={`card-type ${cardDetails.cardType === 'visa' ? 'selected' : ''}`}>
                <div className="visa-card">VISA</div>
              </div>
              <div className={`card-type ${cardDetails.cardType === 'mastercard' ? 'selected' : ''}`}>
                <div className="mastercard">MasterCard</div>
              </div>
              <div className={`card-type ${cardDetails.cardType === 'rupay' ? 'selected' : ''}`}>
                <div className="rupay-card">RuPay</div>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Name</label>
            <div className="info-value">{cardDetails.name}</div>
          </div>
          
          <div className="form-group">
            <label>Card Number</label>
            <div className="info-value">{cardDetails.cardNumber}</div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Valid Date</label>
              <div className="info-value">{cardDetails.validDate}</div>
            </div>
            
            <div className="form-group half">
              <label>CVV</label>
              <div className="info-value">***</div>
            </div>
          </div>
        </div>
        
        <div className="pricing-summary">
          <div className="pricing-row">
            <span>Subtotal</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="pricing-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="pricing-row total">
            <span>Total (Tax incl.)</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          className="checkout-btn" 
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );

  const renderPaymentSuccess = () => (
    <div className="payment-success-container">
      <div className="success-content">
        <h2>PAYMENT SUCCESSFUL</h2>
        <div className="checkmark">✓</div>
        <p className="thank-you-message">Thank you for Your Booking...!</p>
        <button 
          className="back-to-home-btn" 
          onClick={handleBackToHome}
        >
          Back to main website
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return renderPaymentMethods();
      case 2:
        return renderCardDetails();
      case 3:
        return renderOrderSummary();
      case 4:
        return renderPaymentSuccess();
      default:
        return renderPaymentMethods();
    }
  };

  return (
    <div className="payment-flow-container">
      {renderCurrentStep()}
    </div>
  );
};

export default PaymentFlow;