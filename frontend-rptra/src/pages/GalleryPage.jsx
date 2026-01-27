import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../api/axios'; // Pastikan path API benar

const GalleryPage = () => {
  const navigate = useNavigate();
  
  // STATE
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryData, setGalleryData] = useState([]); // Default array kosong
  const [loading, setLoading] = useState(true);

  // Helper URL
  const getImageUrl = (path) => `http://127.0.0.1:8000/storage/${path}`;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);

    const fetchGallery = async () => {
      try {
        const res = await api.get('/cms/gallery');
        
        // PENGAMAN: Cek apakah data yang diterima benar-benar Array
        if (Array.isArray(res.data)) {
            setGalleryData(res.data);
        } else {
            console.warn("Format data salah, set ke kosong:", res.data);
            setGalleryData([]);
        }
      } catch (error) {
        console.error("Gagal load galeri:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleBack = () => {
    // Navigasi kembali ke landing page bagian galeri
    navigate('/#galeri'); 
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 md:p-12 font-poppins relative">
      
      {/* 1. TOMBOL KEMBALI */}
      <div className="fixed top-6 left-6 z-40">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 bg-white text-[#008C9E] px-5 py-2.5 rounded-full shadow-lg hover:bg-[#008C9E] hover:text-white transition-all duration-300 font-bold text-sm border border-gray-100 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-16">
        
        {/* HEADER */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[#2C3E50] mb-4">
            Galeri <span className="text-[#008C9E]">Kegiatan</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kumpulan dokumentasi kegiatan, acara, dan momen kebersamaan di RPTRA Lenteng Agung.
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
            <div className="flex justify-center h-64 items-center">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008C9E]"></div>
            </div>
        ) : galleryData.length > 0 ? (
            /* 2. GRID GALERI (DINAMIS) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
              {galleryData.map((item, index) => (
                <div 
                  key={item.id || index} 
                  className={`relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-gray-200 ${
                    index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : '' 
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  onClick={() => setSelectedImage(getImageUrl(item.image_path))}
                >
                  <img 
                    src={getImageUrl(item.image_path)} 
                    alt="Dokumentasi" 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* === OVERLAY UPDATE: POSISI TENGAH === */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white text-sm font-bold tracking-wider border border-white/50 px-4 py-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      Lihat Foto
                    </span>
                  </div>

                </div>
              ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                <p>Belum ada foto galeri yang diupload.</p>
            </div>
        )}

        {/* COPYRIGHT */}
        <div className="mt-20 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} RPTRA Lenteng Agung
        </div>

      </div>

      {/* === 3. LIGHTBOX MODAL (POPUP GAMBAR) === */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)} 
        >
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <img 
                src={selectedImage} 
                alt="Detail Galeri" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;