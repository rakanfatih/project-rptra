import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useSignIn = (onLogin) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState({ show: false, message: '' });
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await api.post('/login', {
            email: email,
            password: password
        });

        const { access_token, user } = response.data;

        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        if (onLogin) onLogin(user);

    } catch (error) {
        console.error("Login Error:", error);

        const msg = error.response?.data?.message || 'Terjadi kesalahan pada sistem. Silakan coba lagi.';
        setErrorPopup({ show: true, message: msg });
        
    } finally {
        setLoading(false); 
    }
  };

  const closePopup = () => {
    setErrorPopup({ show: false, message: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    email, password, showPassword, loading, errorPopup,
    setEmail, setPassword,
    handleLogin, closePopup, togglePasswordVisibility, navigate
  };
};