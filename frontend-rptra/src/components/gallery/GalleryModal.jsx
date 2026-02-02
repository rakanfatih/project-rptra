import React from 'react';

const GalleryModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose} 
    >
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <img 
            src={image} 
            alt="Detail Galeri" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
        />
    </div>
  );
};

export default GalleryModal;