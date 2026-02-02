import React from 'react';
import { Link } from 'react-router-dom';

const SignInForm = ({ 
    email, setEmail, 
    password, setPassword, 
    showPassword, togglePasswordVisibility, 
    loading, handleLogin 
}) => {
  return (
    <div className="w-full max-w-md bg-transparent">
        <h3 className="font-poppins font-bold text-lg text-center mb-6 text-black">Masuk untuk melanjutkan</h3>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          
          {/* input email */}
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

          {/* input password */}
          <div className="relative">
            <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Masukan Kata Sandi" 
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition pr-10" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={togglePasswordVisibility} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition">
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </span>
          </div>

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
  );
};

export default SignInForm;