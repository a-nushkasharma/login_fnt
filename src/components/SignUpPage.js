import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/image8.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

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
    setError(''); 

    const { email, phone, name, password, country } = formData;

    // Validation
    if (!email || !password || !name || !country) {
      setError("All required fields must be filled!");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone && !/^\+\d{10,15}$/.test(phone)) {
      setError("Please enter a valid international phone number.");
      return;
    }

    try {
      const response = await axios.post("https://login-bcknd.onrender.com/api/users/signup", {
        email,
        password,
        name,
        phone,
        address: formData.address,
        country
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      // This handles duplicate email/username
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form onSubmit={handleSignup} className="bg-white bg-opacity-90 p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <PhoneInput
          international
          defaultCountry="IN"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          className="w-full px-3 py-2 border rounded"
        />
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
