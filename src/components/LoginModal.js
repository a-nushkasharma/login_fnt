import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import plogo from '../assets/clue-logo.jpg';
import loginBg from '../assets/image8.png';

const LoginModal = ({ setIsModalOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://login-bcknd.onrender.com/api/users/login', {
        email,
        password
      });

      if (response.status === 200) {
        setIsModalOpen(false);
        navigate('/survey');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div
  className="fixed inset-0 z-80 flex items-center justify-center bg-black bg-opacity-60"
  style={{
    backgroundImage: `url(${loginBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl w-96 px-10 py-12 text-center">
        <img src={plogo} alt="Logo" className="h-40 mx-auto mb-6" />

        <h2 className="text-2xl font-bold text-purple-900 mb-6 font-serif tracking-wide">
          Welcome <br />to<br /> Palanam Technologies
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white w-full py-2 rounded-full font-semibold mb-4"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-gray-700">
          <p>
            Create Account?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
                navigate('/signup');
              }}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
