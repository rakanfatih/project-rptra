import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SignInPage = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // State Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State UI
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // State Popup Error
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

        // Redirect ditangani oleh App.jsx

    } catch (error) {
        console.error("Login Error:", error);

        const msg = error.response?.data?.message || 'Terjadi kesalahan pada sistem. Silakan coba lagi.';
        setErrorPopup({ show: true, message: msg });
        
    } finally {
        setLoading(false); 
    }
  };

  // === PERBAIKAN: TAMBAHKAN FUNGSI INI ===
  const closePopup = () => {
    setErrorPopup({ show: false, message: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4 relative text-sm">
      
      {/* Pop Up Error */}
      {errorPopup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop Gelap */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
                onClick={closePopup}
            ></div>
            
            {/* Kotak Modal */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative z-10 transform transition-all scale-100 border border-red-100 text-center">
                {/* Ikon Error (Silang Merah) */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-800 font-poppins mb-2">Login Gagal!</h3>
                <p className="text-gray-500 text-xs font-poppins mb-6 leading-relaxed">
                    {errorPopup.message}
                </p>

                <button 
                    onClick={closePopup}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wide transition shadow-lg hover:shadow-red-500/30 active:scale-95"
                >
                    Coba Lagi
                </button>
            </div>
        </div>
      )}

      {/* Tombol Kembali */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-rptra-blue transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
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

      {/* Form */}
      <div className="w-full max-w-md bg-transparent">
        <h3 className="font-poppins font-bold text-lg text-center mb-6 text-black">Masuk untuk melanjutkan</h3>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          
          {/* Input Email */}
          <div>
            <input 
                type="email" 
                placeholder="Masukan Email Anda" 
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Masukan Kata Sandi" 
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition pr-10" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition">
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </span>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center justify-between mt-5">
            <button 
                type="submit" 
                disabled={loading}
                className={`bg-blue-500 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide transform ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5'}`}
            >
                {loading ? 'Memuat...' : 'Masuk'}
            </button>
            <Link to="/lupa-password" className="text-blue-500 hover:text-blue-700 text-xs font-poppins underline decoration-1">Lupa Password</Link>
          </div>

          {/* Footer Daftar */}
          <div className="mt-8 text-center">
            <Link to="/daftar">
                <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-32 mb-3 hover:shadow-lg transform hover:-translate-y-0.5">
                    Daftar
                </button>
            </Link>
            <p className="text-gray-600 text-[10px] md:text-xs font-poppins max-w-sm mx-auto leading-relaxed">
                Daftar disini jika anda belum mendaftar agar bisa menikmati layanan yang sudah disediakan
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignInPage;