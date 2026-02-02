import React from 'react';

const GalleryHeader = () => {
  return (
    <div className="text-center mb-16" data-aos="fade-down">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[#2C3E50] mb-4">
        Galeri <span className="text-[#008C9E]">Kegiatan</span>
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto">
        Kumpulan dokumentasi kegiatan, acara, dan momen kebersamaan di RPTRA Lenteng Agung.
      </p>
    </div>
  );
};

export default GalleryHeader;