import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  
  // State Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Logic
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Auto focus ke input pertama saat masuk step OTP
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // --- MOCK API ACTIONS ---
  // Nanti ganti bagian ini dengan axios.post(...)
  
  const submitEmail = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Mengirim OTP ke:", email);
    setStep(2);
  };

  const submitOtp = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log("Verifikasi OTP:", otpCode);
    // Simulate verify
    setStep(3);
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    console.log("Reset password...");
    alert("Password berhasil diperbarui! Silakan Login kembali.");
    navigate('/login');
  };

  return {
    step, setStep,
    email, setEmail,
    otp, inputRefs, handleOtpChange, handleOtpKeyDown,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    submitEmail, submitOtp, submitNewPassword
  };
};