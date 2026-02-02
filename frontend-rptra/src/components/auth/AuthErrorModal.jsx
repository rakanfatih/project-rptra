import React from 'react';

const AuthErrorModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
        ></div>
        
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative z-10 transform transition-all scale-100 border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-800 font-poppins mb-2">Login Gagal!</h3>
            <p className="text-gray-500 text-xs font-poppins mb-6 leading-relaxed">
                {message}
            </p>

            <button 
                onClick={onClose}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wide transition shadow-lg hover:shadow-red-500/30 active:scale-95"
            >
                Coba Lagi
            </button>
        </div>
    </div>
  );
};

export default AuthErrorModal;