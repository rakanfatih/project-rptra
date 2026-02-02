import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log("Login Admin Berhasil");
    navigate('/admin/dashboard'); 
  };

  return {
    showPassword,
    togglePassword,
    handleLogin
  };
};