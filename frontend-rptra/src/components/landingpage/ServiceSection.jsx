//LANDING PAGE

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceSection = ({ user }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleBooking = (facilityName) => {
    if (!user) {
      setSelectedFacility(facilityName);
      setShowLoginModal(true);
    } else {
      navigate('/reservasi', { state: { facility: facilityName.toUpperCase() } });
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-white flex items-center justify-center py-12"> 
      <div className="container mx-auto px-6 text-center">
        
        {/* HEADER */}
        <h2 className="font-poppins font-semibold text-xl md:text-2xl uppercase mb-3 tracking-tight" data-aos="fade-down">
          LAYANAN YANG TERSEDIA DI RPTRA
        </h2>
        
        <p className="font-poppins font-light text-xs md:text-sm text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
          Layanan ini diberikan oleh kelurahan Lenteng Agung untuk kegiatan positif, sosialisasi, dan kegiatan lainnya untuk warga kelurahan Lenteng Agung seperti :
        </p>

        {/* GRID KARTU  */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          
          {/* AULA */}
          <div className="relative h-[250px] rounded-[24px] overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300" data-aos="fade-up">
            <img src="/images/aula.jpg" alt="Aula" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h3 className="font-poppins font-bold text-2xl mb-1 drop-shadow-lg">AULA</h3>
              <p className="font-poppins font-medium text-xs text-center mb-3 max-w-[180px] drop-shadow-md">
                Dapat dipakai untuk kegiatan positif dan sosialisasi kepada masyarakat
              </p>
              <button 
                onClick={() => handleBooking('AULA')}
                className="bg-rptra-blue text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg transform hover:scale-105"
              >
                Klik Reservasi
              </button>

            </div>
          </div>

          {/* LAPANGAN */}
          <div className="relative h-[250px] rounded-[24px] overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <img src="/images/lapangan.jpg" alt="Lapangan" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h3 className="font-poppins font-bold text-2xl mb-1 drop-shadow-lg">LAPANGAN</h3>
              <p className="font-poppins font-medium text-xs text-center mb-3 max-w-[180px] drop-shadow-md">
                Dapat digunakan untuk kegiatan olahraga serta kegiatan lainnya
              </p>
              <button 
                onClick={() => handleBooking('LAPANGAN')}
                className="bg-rptra-blue text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg transform hover:scale-105"
              >
                Klik Reservasi
              </button>

            </div>
          </div>
        </div>

      </div>

      {/* pop up peringatan login */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowLoginModal(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-10 transform transition-all animate-scale-up flex flex-col items-center text-center font-poppins">
             <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">Akses Terbatas</h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Anda harus masuk (login) terlebih dahulu untuk melakukan reservasi fasilitas {selectedFacility}.
            </p>
            <div className="w-full flex flex-col gap-3">
                <button onClick={() => navigate('/login')} className="w-full py-3 bg-[#008C9E] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#00707e] transition-transform active:scale-95">Masuk Sekarang</button>
                <button onClick={() => setShowLoginModal(false)} className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition">Nanti Saja</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceSection;