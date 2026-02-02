import React from 'react';

const GalleryBackButton = ({ onClick }) => {
  return (
    <div className="fixed top-6 left-6 z-40">
      <button 
        onClick={onClick}
        className="flex items-center gap-2 bg-white text-[#008C9E] px-5 py-2.5 rounded-full shadow-lg hover:bg-[#008C9E] hover:text-white transition-all duration-300 font-bold text-sm border border-gray-100 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>
    </div>
  );
};

export default GalleryBackButton;