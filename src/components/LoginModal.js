import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import plogo from '../assets/clue-logo.jpg'


const LoginModal = ({ setIsModalOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend API
    
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Close the login modal
        setIsModalOpen(false);

        // Redirect to SurveyForm
        navigate('/survey');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };
  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-95 px-10 py-12 relative text-center">
      <img src={plogo} alt="Logo" className="h-40 mx-auto mb-6" />

        <h2 className="text-2xl font-bold text-purple-900 mb-6 font-serif tracking-wide">
          Welcome <br />to<br /> Palanam Technologies
        </h2>


        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Set password value
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Error message */}
          
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white w-full py-2 rounded-full font-semibold mb-4"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            Create Account? 
            <a
  className="text-blue-600 hover:underline cursor-pointer"
  onClick={() => {
    setIsModalOpen(false); // Close modal
    navigate('/signup');  // Navigate to signup
  }}
>
  Signup
</a>
          </p>
          {/* <p>
            Forgot your Password? <a href="#" className="text-blue-600 hover:underline">Reset Password</a>
          </p> */}
        </div>
      </div>
    </div>
  );

  
};

export default LoginModal;
