import React from 'react';

const GalleryGrid = ({ loading, data, getImageUrl, onImageClick }) => {
  if (loading) {
    return (
      <div className="flex justify-center h-64 items-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008C9E]"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
          <p>Belum ada foto galeri yang diupload.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
      {data.map((item, index) => (
        <div 
          key={item.id || index} 
          className={`relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-gray-200 ${
            index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : '' 
          }`}
          data-aos="fade-up"
          data-aos-delay={index * 50}
          onClick={() => onImageClick(getImageUrl(item.image_path))}
        >
          <img 
            src={getImageUrl(item.image_path)} 
            alt="Dokumentasi" 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white text-sm font-bold tracking-wider border border-white/50 px-4 py-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
              Lihat Foto
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;