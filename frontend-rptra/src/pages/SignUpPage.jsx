import React from 'react';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';

import AuthHeader from '../components/auth/AuthHeader'; 
import SignUpForm from '../components/auth/SignUpForm';

const SignUpPage = () => {
  const {
    formData, handleChange,
    showPassword, togglePassword,
    showConfirmPassword, toggleConfirmPassword,
    loading, handleRegister
  } = useSignUp();

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4 relative text-sm">
      
      {/* button home */}
      <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-rptra-blue transition-colors"> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /> </svg>
      </Link>

      {/* header */}
      <AuthHeader />

      {/* formulir */}
      <SignUpForm 
        formData={formData}
        handleChange={handleChange}
        showPassword={showPassword}
        togglePassword={togglePassword}
        showConfirmPassword={showConfirmPassword}
        toggleConfirmPassword={toggleConfirmPassword}
        loading={loading}
        handleRegister={handleRegister}
      />

    </div>
  );
};

export default SignUpPage;