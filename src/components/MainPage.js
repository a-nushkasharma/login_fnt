import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to survey page
import SurveyForm from './SurveyForm';
import LoginModal from './LoginModal'; 

const MainPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);  // Modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen); // Toggle modal visibility
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login status
    setIsLoginModalOpen(false); // Close the login modal
    navigate('/survey'); // Redirect to the survey page after successful login
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="w-full h-[50vh] sm:h-[650vh] md:h-[50vh] lg:h-[50vh] bg-pink-200 relative overflow-hidden mt-2">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold">
            Product Form
          </h2>
        </div>
      </div>
      {/* MainPage Content */}
      <button
        onClick={toggleLoginModal}
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-full shadow-md"
      >
        My Profile
      </button>

      {/* Login Modal */}
      {isLoginModalOpen && <LoginModal onLoginSuccess={handleLoginSuccess} closeModal={toggleLoginModal} />}
    </main>
  );
};

export default MainPage;
