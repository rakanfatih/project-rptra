import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GalleryPage = () => {
  const navigate = useNavigate();
  
  // STATE BARU: Untuk menyimpan URL gambar yang sedang dibuka
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

  // Data Dummy Gambar
  const allImages = [
    "/images/galeri-1.jpg",
    "/images/galeri-2.jpg",
    "/images/galeri-3.jpg",
    "/images/aula.jpg",     
    "/images/lapangan.jpg", 
    "/images/galeri-1.jpg", 
  ];

  const handleBack = () => {
    navigate('/#galeri'); 
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 md:p-12 font-poppins relative">
      
      {/* 1. TOMBOL KEMBALI */}
      <div className="fixed top-6 left-6 z-40">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 bg-white text-rptra-blue px-5 py-3 rounded-full shadow-lg border border-gray-100 hover:bg-rptra-blue hover:text-white transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="font-bold text-sm">Kembali</span>
        </button>
      </div>

      {/* 2. KONTEN GALERI */}
      <div className="max-w-6xl mx-auto pt-16 md:pt-10">
        
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-3xl md:text-5xl font-bold text-rptra-dark mb-4">
            Galeri RPTRA
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kumpulan dokumentasi seluruh kegiatan positif dan fasilitas yang ada di RPTRA Lenteng Agung.
          </p>
        </div>

        {/* Grid Foto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.map((img, index) => (
            <div 
              key={index} 
              // TAMBAHKAN EVENT ONCLICK DISINI
              onClick={() => setSelectedImage(img)}
              className="group relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img 
                src={img} 
                alt={`Galeri ${index + 1}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold tracking-wider text-sm border border-white px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
                  Lihat Foto
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-gray-400 text-xs">
          &copy; 2024 RPTRA Lenteng Agung
        </div>

      </div>

      {/* === 3. LIGHTBOX MODAL (POPUP GAMBAR) === */}
      {/* Muncul hanya jika selectedImage ada isinya */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)} // Klik background untuk tutup
        >
            {/* Tombol Close X */}
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Gambar Full */}
            <img 
                src={selectedImage} 
                alt="Detail Galeri" 
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-scale-up object-contain"
                onClick={(e) => e.stopPropagation()} // Supaya klik gambar tidak menutup modal
            />
        </div>
      )}

    </div>
  );
};

export default GalleryPage;