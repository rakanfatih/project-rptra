import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- 1. Import useNavigate

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // === 2. Inisialisasi Hook Navigate ===
  const navigate = useNavigate();

  // State & Ref untuk OTP
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]); 

  // Fungsi OTP Change
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

  // Fungsi OTP Backspace
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Ikon Mata
  const EyeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const EyeSlashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4 relative text-sm pb-20">
      
      <Link 
        to="/login" 
        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-rptra-blue transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

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

      <div className="w-full max-w-md bg-transparent px-4">
        
        {/* --- STEP 1 --- */}
        {step === 1 && (
          <div>
            <h3 className="font-poppins font-bold text-lg text-center mb-6 text-black">Lupa Password?</h3>
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="mb-6">
                <input type="email" placeholder="Masukan Email Anda" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" required />
              </div>
              <div className="text-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-48 hover:shadow-lg transform hover:-translate-y-0.5">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- STEP 2 --- */}
        {step === 2 && (
          <div className="text-center">
            <h3 className="font-poppins font-bold text-lg mb-6 text-black">Kode Verifikasi</h3>
            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div className="flex justify-center gap-3 mb-8">
                {otp.map((data, index) => (
                  <input 
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text" 
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-rptra-blue transition"
                  />
                ))}
              </div>
              <div className="text-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-48 hover:shadow-lg transform hover:-translate-y-0.5">
                  Verifikasi
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- STEP 3 (UPDATE PASSWORD) --- */}
        {step === 3 && (
          <div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              // === 3. LOGIKA REDIRECT DI SINI ===
              alert("Password berhasil diperbarui! Silakan Login kembali."); // Opsional: Beri notifikasi
              navigate('/login'); // Arahkan kembali ke halaman Login
            }}>
              
              <div className="mb-4">
                <label className="font-poppins font-bold text-sm text-black block mb-2">Masukkan Kata Sandi Baru</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Abcd123!" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition pr-10"
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword ? EyeSlashIcon : EyeIcon}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 italic font-poppins">
                  Harus terdiri dari Angka, Simbol, Huruf besar dan kecil
                </p>
              </div>

              <div className="mb-8">
                <label className="font-poppins font-bold text-sm text-black block mb-2">Konfirmasi Kata Sandi Baru</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Abcd123!" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition pr-10"
                  />
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showConfirmPassword ? EyeSlashIcon : EyeIcon}
                  </span>
                </div>
              </div>

              <div className="text-center">
                {/* Tombol Update */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-48 hover:shadow-lg transform hover:-translate-y-0.5">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#007EA7] py-3 text-center">
        <p className="text-white font-bold font-poppins text-sm tracking-widest">
          RPTRA 2026
        </p>
      </div>

    </div>
  );
};

export default ForgotPasswordPage;