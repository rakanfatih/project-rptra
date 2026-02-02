import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    no_telepon: '',
    password: '',
    password_confirmation: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      await api.post('/register', {
        nama_depan: formData.nama_depan,
        nama_belakang: formData.nama_belakang,
        email: formData.email,
        no_telepon: formData.no_telepon,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: 'Warga'
      });

      alert("Pendaftaran Berhasil! Silakan masuk.");
      navigate('/login'); 

    } catch (error) {
      console.error("Register Error:", error);
      const msg = error.response?.data?.message || "Gagal mendaftar.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData, showPassword, showConfirmPassword, loading,
    handleChange, togglePassword, toggleConfirmPassword, handleRegister
  };
};