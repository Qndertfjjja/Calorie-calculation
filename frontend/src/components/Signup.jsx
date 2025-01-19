import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // Default value of isAdmin is false
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { 
        email, 
        password,
        isAdmin, // Include the isAdmin field
      });

      // Navigate to the login page after successful signup
      navigate('/'); 
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Failed to register');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {/* Hidden input or checkbox to manage the isAdmin flag */}
        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Is Admin
          </label>
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="redirect-link">
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
