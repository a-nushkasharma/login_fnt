import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import MainPage from './components/MainPage'; // Import MainPage
import SurveyForm from './components/SurveyForm'; // Import SurveyForm
import SignUpPage from './components/SignUpPage';

const App = () => {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
};

const AppWithRouter = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);  // Modal is initially open
  const location = useLocation();  // Get the current route location

  // Close the modal when navigating to /signup
  useEffect(() => {
    if (location.pathname === '/') {
      setIsModalOpen(true);   // Show modal on landing
    } else {
      setIsModalOpen(false);  // Hide modal on other pages
    }
  }, [location.pathname]);
  return (
    <>
      
      {isModalOpen && location.pathname === '/' && <LoginModal setIsModalOpen={setIsModalOpen} />}  {/* Show LoginModal only on / */}
      
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
