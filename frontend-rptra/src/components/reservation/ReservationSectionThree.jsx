//upload dokumen

import React from 'react';

const ReservationSectionThree = ({ 
  bookingType, 
  fileKtp, setFileKtp, 
  filePermohonan, setFilePermohonan, 
  filePengantar, setFilePengantar 
}) => {
  return (
    <div className="space-y-6 pt-8 border-t border-gray-100 mt-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#007BF7] flex items-center justify-center font-bold text-sm shrink-0">3</div>
        <h3 className="font-urbanist font-bold text-lg text-gray-800">Unggah Dokumen Persyaratan</h3>
      </div>
      
      {/* ktp */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700">1. Kartu Tanda Penduduk (KTP) <span className="text-red-500">*</span></label>
        <div className="relative border border-gray-300 rounded-xl h-[55px] bg-white flex items-center overflow-hidden hover:border-[#007BF7] transition-colors group">
            <div className="h-full bg-[#F0F7FF] text-[#007BF7] font-bold text-xs flex items-center px-6 mr-4 group-hover:bg-[#E1F0FF] transition-colors">Choose File</div>
            <input type="file" onChange={(e) => setFileKtp(e.target.files[0])} accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
            <span className="text-sm text-gray-400 truncate">{fileKtp ? fileKtp.name : "No file chosen"}</span>
        </div>
      </div>

      {/* permohonan */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700">2. Surat Permohonan <span className="text-red-500">*</span></label>
        <div className="relative border border-gray-300 rounded-xl h-[55px] bg-white flex items-center overflow-hidden hover:border-[#007BF7] transition-colors group">
            <div className="h-full bg-[#F0F7FF] text-[#007BF7] font-bold text-xs flex items-center px-6 mr-4 group-hover:bg-[#E1F0FF] transition-colors">Choose File</div>
            <input type="file" onChange={(e) => setFilePermohonan(e.target.files[0])} accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
            <span className="text-sm text-gray-400 truncate">{filePermohonan ? filePermohonan.name : "No file chosen"}</span>
        </div>
      </div>

      {/* surat pengantar */}
      {bookingType !== 'Umum' && (
          <div className="space-y-2 animate-fade-in-up">
            <label className="block text-sm font-bold text-gray-700">3. Surat Pengantar <span className="text-red-500">*</span></label>
            <div className="relative border border-gray-300 rounded-xl h-[55px] bg-white flex items-center overflow-hidden hover:border-[#007BF7] transition-colors group">
                <div className="h-full bg-[#F0F7FF] text-[#007BF7] font-bold text-xs flex items-center px-6 mr-4 group-hover:bg-[#E1F0FF] transition-colors">Choose File</div>
                <input type="file" onChange={(e) => setFilePengantar(e.target.files[0])} accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                <span className="text-sm text-gray-400 truncate">{filePengantar ? filePengantar.name : "No file chosen"}</span>
            </div>
            <p className="text-xs text-orange-500 italic mt-2 font-medium">Wajib untuk kategori {bookingType}.</p>
          </div>
      )}
    </div>
  );
};

export default ReservationSectionThree;