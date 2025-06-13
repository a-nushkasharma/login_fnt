// src/pages/SignupPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Ensure all required fields are filled
    if (!formData.email || !formData.password || !formData.name || !formData.country) {
      setError("All fields are required!");
      return;
    }
  
    try {
      const response = await axios.post("https://login-bcknd.onrender.com/api/users/signup", {
        email: formData.email, // Use formData instead of email directly
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        country: formData.country
      });
  
      if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input type="text" name="address" placeholder="Address (optional)" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input type="text" name="country" placeholder="Country *" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-800">
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
