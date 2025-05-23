import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { FaCircleUser, FaArrowRight } from "react-icons/fa6";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal when "MyProfile" is clicked
  const handleProfileClick = () => {
    setIsModalOpen(true); // Set modal open state to true
  };

  return (
    <nav className="p-3 flex bg-white text-purple-900 justify-between items-center fixed top-0 left-0 right-0 z-20 shadow-md">
      {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} />} {/* Conditional rendering for modal */}

      {/* My Profile Button */}
      <div className="hidden lg:flex flex-1 justify-end">
        <button
          className="flex gap-2 items-center border border-purple-200 px-6 py-2 rounded-lg hover:border-purple-600"
          onClick={handleProfileClick} // Open the modal on click
        >
          <FaCircleUser />
          <span>My Profile</span>
          <FaArrowRight />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
