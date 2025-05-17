import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Components/assets/css/Auth.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Fertix</h1>
        
        <form onSubmit={handleLogin}>
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
          
          {error && <p className="auth-error">{error}</p>}
          
          <button type="submit" className="auth-button">LOGIN</button>
        </form>
        
        <p className="auth-switch">
          Click here to <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;