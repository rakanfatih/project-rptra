import React from 'react';

const StepVerifyOTP = ({ otp, inputRefs, onChange, onKeyDown, onSubmit }) => {
  return (
    <div className="text-center animate-fade-in">
      <h3 className="font-poppins font-bold text-lg mb-6 text-black">Kode Verifikasi</h3>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((data, index) => (
            <input 
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text" 
              maxLength="1"
              value={data}
              onChange={(e) => onChange(e.target, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
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
  );
};

export default StepVerifyOTP;