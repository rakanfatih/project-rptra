//modal

import React from 'react';

const ReservationModals = ({ 
  showSuccessModal, handleSuccessAction, 
  showErrorModal, setShowErrorModal, errorMessage 
}) => {
  return (
    <>
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-10 transform transition-all animate-scale-up flex flex-col items-center text-center font-poppins">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Reservasi Berhasil!</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">Permohonan Anda telah dikirim dan menunggu konfirmasi admin.</p>
            <button onClick={handleSuccessAction} className="w-full py-3.5 bg-[#007BF7] text-white rounded-xl font-bold text-lg shadow-md hover:bg-blue-600 transition-transform active:scale-95">Lihat Status</button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowErrorModal(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-10 transform transition-all animate-scale-up flex flex-col items-center text-center font-poppins">
             <button onClick={() => setShowErrorModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Gagal Mengirim</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">{errorMessage}</p>
            <button onClick={() => setShowErrorModal(false)} className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-lg shadow-md hover:bg-red-700 transition-transform active:scale-95">Coba Lagi</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationModals;