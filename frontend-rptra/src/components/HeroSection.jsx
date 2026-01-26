import React from 'react';

const HeroSection = ({ user, isProfileOpen }) => {

  // Fungsi untuk scroll otomatis ke section dengan ID "reservasi"
  const handleScrollToReservasi = () => {
    const element = document.getElementById('reservasi');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[500px] mt-20 overflow-hidden"> 
      
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} 
      ></div>

      {/* 2. Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* 3. Konten Teks & Tombol */}
      <div className="absolute inset-0 w-full px-8 md:px-24 lg:px-32 flex flex-col justify-end pb-12 z-20">
        
        {/* Efek blur/opacity jika menu profil terbuka (dikontrol dari props isProfileOpen) */}
        <div className={`flex flex-col md:flex-row justify-between items-end gap-6 relative transition-opacity duration-300 ${isProfileOpen ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}>
          
          <div className="text-white text-left max-w-2xl">
            <h2 className="font-poppins font-bold text-lg md:text-xl mb-1 text-white/90">
              Selamat Datang
            </h2>
            <h1 className="font-poppins font-bold text-xl md:text-3xl leading-tight mb-3">
              Di E-Booking Lapangan RPTRA Lenteng Agung
            </h1>
            <p className="font-poppins font-light text-xs md:text-sm text-gray-200 opacity-90 max-w-lg">
              Aplikasi web untuk menyewakan lapangan RPTRA dengan mudah, cepat, dan terintegrasi
            </p>
          </div>

          <div className="shrink-0"> 
            {/* TOMBOL AKSI: Scroll ke Reservasi */}
            <button 
              onClick={handleScrollToReservasi}
              className="bg-rptra-blue text-white font-semibold text-sm px-8 py-3 rounded-full shadow-lg hover:bg-rptra-dark transition transform hover:scale-105 text-center cursor-pointer"
            >
              Klik Untuk Mulai <br className="hidden lg:block"/> Reservasi Sewa
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default HeroSection;