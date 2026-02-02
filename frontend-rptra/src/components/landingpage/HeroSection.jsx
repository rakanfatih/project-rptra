//LANDING PAGE 

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ user, isProfileOpen }) => {

  const handleScrollToReservasi = () => {
    const element = document.getElementById('reservasi');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // animasi
  const fadeUpVariant = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: { duration: 0.5 }
    }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] mt-20 overflow-hidden"> 
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} 
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 w-full px-8 md:px-24 lg:px-32 flex flex-col justify-end pb-12 md:pb-20 z-20">
        <div className={`flex flex-col md:flex-row justify-between items-end gap-6 relative transition-opacity duration-300 ${isProfileOpen ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}>
          
          {/* teks */}
          <motion.div 
            className="text-white text-left max-w-2xl"
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: false, amount: 0.5 }} 
            variants={fadeUpVariant}
          >
            <h2 className="font-poppins font-bold text-lg md:text-xl mb-1 text-white/90">
              Selamat Datang
            </h2>
            <h1 className="font-poppins font-bold text-xl md:text-3xl leading-tight mb-3">
              Di E-Booking Lapangan RPTRA Lenteng Agung
            </h1>
            <p className="font-poppins font-light text-xs md:text-sm text-gray-200 opacity-90 max-w-lg">
              Aplikasi web untuk menyewakan lapangan RPTRA dengan mudah, cepat, dan terintegrasi
            </p>
          </motion.div>

          {/* button */}
          <motion.div 
            className="shrink-0"
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
                hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } } 
            }}
          > 
            <button 
              onClick={handleScrollToReservasi}
              className="bg-rptra-blue text-white font-semibold text-sm px-8 py-3 rounded-full shadow-lg hover:bg-rptra-dark transition transform hover:scale-105 text-center cursor-pointer"
            >
              Klik Untuk Mulai <br className="hidden lg:block"/> Reservasi Sewa
            </button>
          </motion.div>
          
        </div>

      </div>
    </div>
  );
};

export default HeroSection;