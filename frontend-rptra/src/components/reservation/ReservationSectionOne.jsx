//data peminjam

import React from 'react';

const ReservationSectionOne = ({ user, bookingType, setBookingType, selectedFacility, openDropdown, toggleDropdown }) => {
  const fullName = user ? `${user.nama_depan} ${user.nama_belakang}` : '';
  const phoneNumber = user ? user.no_telepon : '-';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#007BF7] flex items-center justify-center font-bold text-sm shrink-0">1</div>
        <h3 className="font-urbanist font-bold text-lg text-gray-800">Data Peminjam & Fasilitas</h3>
      </div>

      {/* nama */}
      <div className="space-y-2">
        <label className="block font-urbanist font-bold text-sm text-gray-700">Nama Peminjam</label>
        <input type="text" value={fullName} readOnly className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium focus:outline-none cursor-not-allowed"/>
      </div>

      {/* telepon */}
      <div className="space-y-2">
        <label className="block font-urbanist font-bold text-sm text-gray-700">Nomor Telepon</label>
        <input type="text" value={phoneNumber} readOnly className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium focus:outline-none cursor-not-allowed"/>
      </div>
      
      {/* kategori dropdown */}
      <div className="space-y-2 relative z-30">
        <label className="block font-urbanist font-bold text-sm text-gray-700">Kategori Peminjam <span className="text-red-500 ml-1">*</span></label>
        {openDropdown === 'type' && <div className="fixed inset-0 z-10 cursor-default" onClick={() => toggleDropdown(null)}></div>}
        <div className="relative z-20">
          <button type="button" onClick={() => toggleDropdown('type')} className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-between focus:outline-none hover:border-[#007BF7] transition-colors">
            <span>{bookingType}</span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'type' ? 'rotate-180 text-[#007BF7]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {openDropdown === 'type' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-up origin-top">
                {['Umum', 'Kampus', 'Organisasi'].map((option) => (
                  <div key={option} onClick={() => { setBookingType(option); toggleDropdown(null); }} className={`px-5 py-3.5 cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${bookingType === option ? 'bg-blue-50 text-[#007BF7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                    {option}
                    {bookingType === option && <svg className="w-4 h-4 text-[#007BF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                ))}
              </div>
          )}
        </div>
      </div>

      {/* fasilitas */}
      <div className="space-y-2">
        <label className="block font-urbanist font-bold text-sm text-gray-700">Jenis Fasilitas</label>
        <input type="text" value={selectedFacility === 'AULA' ? 'Aula' : 'Lapangan'} readOnly className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium focus:outline-none cursor-not-allowed"/>
      </div>
    </div>
  );
};

export default ReservationSectionOne;