import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GallerySection = () => {
  // Data Gambar
  const images = [
    "/images/galeri-1.jpg",
    "/images/galeri-2.jpg", 
    "/images/galeri-3.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="galeri" className="py-20 bg-[#EBF4F6]">
      <div className="container mx-auto px-8 md:px-24 lg:px-32">
        
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          
          {/* === BAGIAN KIRI: TEKS & TOMBOL === */}
          <div className="w-full md:w-5/12 text-center md:text-left" data-aos="fade-right">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-black mb-2">
              Galeri RPTRA
            </h2>
            <p className="font-poppins font-normal text-base md:text-lg text-gray-600 mb-8">
              Dokumentasi Kegiatan seru dan positif
            </p>
            
            <Link to="/galeri">
              <button className="
                bg-rptra-blue text-white font-bold text-sm md:text-base px-10 py-3 rounded-full shadow-md 
                transition-all duration-300 ease-in-out font-poppins tracking-wide
                hover:bg-rptra-dark 
                hover:scale-110 
                hover:shadow-2xl
                hover:-translate-y-1
              ">
                Selengkapnya
              </button>
            </Link>
          </div>

          {/* === BAGIAN KANAN: GAMBAR SLIDER === */}
          <div className="w-full md:w-7/12 relative" data-aos="fade-left">
            {/* PERUBAHAN DISINI:
               - h-[300px] -> h-[240px] (Mobile lebih kecil)
               - md:h-[400px] -> md:h-[320px] (Desktop lebih kecil)
               - max-w-xl mx-auto (Agar gambar tidak terlalu lebar/stretch, opsional biar lebih rapi)
            */}
            <div className="relative h-[240px] md:h-[320px] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Galeri ${index + 1}`} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Overlay Gradient bawah */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Indikator Slider */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-white scale-125" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GallerySection;