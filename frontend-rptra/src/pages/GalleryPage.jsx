import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import Custom Hook
import { useGallery } from '../hooks/useGallery';

// Import Components
import GalleryBackButton from '../components/gallery/GalleryBackButton';
import GalleryHeader from '../components/gallery/GalleryHeader';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryModal from '../components/gallery/GalleryModal';

const GalleryPage = () => {
  const navigate = useNavigate();
  
  // Ambil data & logic dari Hook
  const { galleryData, loading, getImageUrl } = useGallery();
  
  // State Lokal untuk UI (Modal)
  const [selectedImage, setSelectedImage] = useState(null);

  // Efek Visual (AOS & Scroll)
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 md:p-12 font-poppins relative">
      
      {/* 1. Tombol Kembali */}
      <GalleryBackButton onClick={() => navigate('/#galeri')} />

      <div className="max-w-7xl mx-auto pt-16">
        
        {/* 2. Header */}
        <GalleryHeader />

        {/* 3. Grid Galeri */}
        <GalleryGrid 
            loading={loading} 
            data={galleryData} 
            getImageUrl={getImageUrl} 
            onImageClick={setSelectedImage} 
        />

        {/* 4. Copyright */}
        <div className="mt-20 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} RPTRA Lenteng Agung
        </div>

      </div>

      {/* 5. Lightbox Modal */}
      <GalleryModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
      />
      
    </div>
  );
};

export default GalleryPage;