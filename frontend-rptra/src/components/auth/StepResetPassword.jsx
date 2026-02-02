import React from 'react';

// Ikon kita simpan di sini atau di file terpisah juga boleh
const EyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const EyeSlashIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const StepResetPassword = ({ 
  showPassword, setShowPassword, 
  showConfirmPassword, setShowConfirmPassword, 
  onSubmit 
}) => {
  return (
    <div className="animate-fade-in">
      <form onSubmit={onSubmit}>
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
          <p className="text-[10px] text-gray-500 mt-1 italic font-poppins">Harus terdiri dari Angka, Simbol, Huruf besar dan kecil</p>
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-48 hover:shadow-lg transform hover:-translate-y-0.5">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepResetPassword;