import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Components/assets/css/Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.email === email)) {
      setError('Email already registered');
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Registration successful! Redirecting...');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Fertix</h1>
        
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="auth-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="auth-input"
            required
          />
          
          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}
          
          <button type="submit" className="auth-button">REGISTER</button>
        </form>
        
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;