import React from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useForgotPassword';

// Import Components Steps
import StepInputEmail from '../components/auth/StepInputEmail';
import StepVerifyOTP from '../components/auth/StepVerifyOTP';
import StepResetPassword from '../components/auth/StepResetPassword';

const ForgotPasswordPage = () => {
  // Panggil semua state & logic dari Hook
  const {
    step,
    email, setEmail,
    otp, inputRefs, handleOtpChange, handleOtpKeyDown,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    submitEmail, submitOtp, submitNewPassword
  } = useForgotPassword();

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4 relative text-sm pb-20">
      
      {/* Tombol Back */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-rptra-blue transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      {/* Header Logo */}
      <div className="text-center mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-2">
          <div className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="Logo" className="h-12 w-auto object-contain"/>
            <div className="text-left">
              <h1 className="font-poppins font-bold text-lg md:text-xl text-black leading-none">Lenteng <br /> Agung</h1>
            </div>
          </div>
          <div className="hidden md:block w-[2px] h-8 bg-black/80"></div>
          <h2 className="font-poppins font-medium text-sm md:text-base text-black text-center md:text-left max-w-xs leading-tight">
            Layanan Peminjaman <br /> Lapangan Dan Aula RPTRA
          </h2>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-transparent px-4">
        
        {step === 1 && (
          <StepInputEmail 
            email={email} 
            setEmail={setEmail} 
            onSubmit={submitEmail} 
          />
        )}

        {step === 2 && (
          <StepVerifyOTP 
            otp={otp} 
            inputRefs={inputRefs} 
            onChange={handleOtpChange} 
            onKeyDown={handleOtpKeyDown} 
            onSubmit={submitOtp} 
          />
        )}

        {step === 3 && (
          <StepResetPassword 
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            onSubmit={submitNewPassword}
          />
        )}

      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#007EA7] py-3 text-center">
        <p className="text-white font-bold font-poppins text-sm tracking-widest">
          RPTRA 2026
        </p>
      </div>

    </div>
  );
};

export default ForgotPasswordPage;