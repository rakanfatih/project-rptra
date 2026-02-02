import React from 'react';
import { Link } from 'react-router-dom';
import { useSignIn } from '../hooks/useSignIn';

import AuthErrorModal from '../components/auth/AuthErrorModal';
import AuthHeader from '../components/auth/AuthHeader';
import SignInForm from '../components/auth/SignInForm';

const SignInPage = ({ onLogin }) => {
  
  const {
    email, setEmail,
    password, setPassword,
    showPassword, togglePasswordVisibility,
    loading, errorPopup,
    handleLogin, closePopup
  } = useSignIn(onLogin);

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4 relative text-sm">
      
      {/* error */}
      <AuthErrorModal 
        show={errorPopup.show} 
        message={errorPopup.message} 
        onClose={closePopup} 
      />

      {/* button back */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-rptra-blue transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      {/* header */}
      <AuthHeader />

      {/* form */}
      <SignInForm 
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility}
        loading={loading} handleLogin={handleLogin}
      />

    </div>
  );
};

export default SignInPage;