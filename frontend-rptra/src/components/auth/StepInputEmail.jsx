import React from 'react';

const StepInputEmail = ({ email, setEmail, onSubmit }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="font-poppins font-bold text-lg text-center mb-6 text-black">Lupa Password?</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukan Email Anda" 
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rptra-blue font-poppins placeholder-gray-400 transition" 
            required 
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition shadow-md uppercase tracking-wide w-48 hover:shadow-lg transform hover:-translate-y-0.5">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepInputEmail;