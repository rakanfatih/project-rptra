import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SignUpPage = () => {
  const navigate = useNavigate();

  // 1. STATE INPUT
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    no_telepon: '', // <--- Tambahan State
    password: '',
    password_confirmation: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper ganti value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. FUNGSI SUBMIT REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      // Kirim ke Backend
      await api.post('/register', {
        nama_depan: formData.nama_depan,
        nama_belakang: formData.nama_belakang,
        email: formData.email,
        no_telepon: formData.no_telepon, // <--- Kirim No Telp
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: 'Warga'
      });

      alert("Pendaftaran Berhasil! Silakan masuk.");
      navigate('/login'); // Redirect ke halaman Login

    } catch (error) {
      console.error("Register Error:", error);
      const msg = error.response?.data?.message || "Gagal mendaftar.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // Icon SVG
  const EyeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  const EyeSlashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>;

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4 relative text-sm">
      
      {/* Tombol Home */}
      <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-rptra-blue transition-colors"> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /> </svg>
      </Link>

      <div className="text-center mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-2">
          <div className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="Logo RPTRA" className="h-12 w-auto object-contain"/>
            <div className="text-left">
              <h1 className="font-poppins font-bold text-lg md:text-xl text-black leading-none">Lenteng <br /> Agung</h1>
            </div>
          </div>
          <div className="hidden md:block w-[2px] h-8 bg-black/80"></div>
          <h2 className="font-poppins font-medium text-sm md:text-base text-black text-center md:text-left max-w-xs leading-tight">Layanan Peminjaman <br /> Lapangan Dan Aula RPTRA</h2>
        </div>
      </div>

      <div className="w-full max-w-lg bg-transparent px-4">
        <form className="space-y-5" onSubmit={handleRegister}>
          
          <div className="relative">
             <h3 className="font-poppins font-bold text-sm text-black mb-2">Isi Data Diri</h3>
             <span className="absolute -left-3 top-8 text-black font-bold text-lg">*</span>
             <div className="flex gap-4">
                <input type="text" name="nama_depan" placeholder="Nama Depan" value={formData.nama_depan} onChange={handleChange} required className="w-1/2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" />
                <input type="text" name="nama_belakang" placeholder="Nama Belakang" value={formData.nama_belakang} onChange={handleChange} required className="w-1/2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" />
             </div>
          </div>

          <div className="relative">
            <span className="absolute -left-3 top-3 text-black font-bold text-lg">*</span>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" />
          </div>

          {/* === INPUT NO TELEPON BARU === */}
          <div className="relative">
            <span className="absolute -left-3 top-3 text-black font-bold text-lg">*</span>
            <input 
              type="number" 
              name="no_telepon" 
              placeholder="Nomor Telepon / WhatsApp" 
              value={formData.no_telepon} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" 
            />
          </div>

          <div className="relative">
            <span className="absolute -left-3 top-3 text-black font-bold text-lg">*</span>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Buat Kata Sandi" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition pr-10" />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition">{showPassword ? EyeSlashIcon : EyeIcon}</span>
          </div>

          <div className="relative">
            <span className="absolute -left-3 top-3 text-black font-bold text-lg">*</span>
            <input type={showConfirmPassword ? "text" : "password"} name="password_confirmation" placeholder="Konfirmasi Kata Sandi" value={formData.password_confirmation} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition pr-10" />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition">{showConfirmPassword ? EyeSlashIcon : EyeIcon}</span>
          </div>

          <div className="mt-8 text-center pt-2">
            <button type="submit" disabled={loading} className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-full md:w-auto hover:shadow-lg transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? 'MEMPROSES...' : 'MENDAFTAR'}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs">Sudah punya akun? <Link to="/login" className="text-rptra-blue font-bold hover:underline">Masuk disini</Link></p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUpPage;