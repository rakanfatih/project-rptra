import React, { useState } from 'react';

const BookingDetailModal = ({ booking, onClose, onApprove, onReject }) => { 
  const [copyStatus, setCopyStatus] = useState('Salin');

  if (!booking) return null;

  const getFileUrl = (path) => {
    if (!path) return null;
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  const phoneNumber = booking.user?.no_telepon || booking.no_telepon || "-";

  // copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopyStatus('Tersalin!');
    setTimeout(() => setCopyStatus('Salin'), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in print:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto z-10 p-6 md:p-10 border border-[#DADADA]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button onClick={onClose} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[#7C7C7C] rounded-full flex items-center justify-center hover:bg-gray-600 transition shadow-sm text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-black font-poppins">Detail Data Reservasi</h2>
            </div>
            <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider border border-yellow-200">
                {booking.status}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* KIRI: INFO USER */}
            <div className="lg:col-span-4 flex flex-col items-center p-8 bg-gray-50 rounded-[20px] border border-gray-100 h-fit">
                <img 
                    src={booking.user?.avatar || "/images/galeri-1.jpg"} 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-8 border-white shadow-lg mb-6" 
                    alt="User" 
                />
                <h3 className="text-xl font-bold text-black text-center">{booking.name || "Pemohon"}</h3>
                <p className="text-gray-500 text-sm mb-4">{booking.email}</p>
                
                {/* TOMBOL COPY TELEPON */}
                <div className="w-full mt-4 p-4 bg-white rounded-xl border border-gray-200 flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Nomor Telepon</label>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-dashed border-gray-300">
                        <span className="font-mono font-bold text-gray-700">{phoneNumber}</span>
                        <button 
                            onClick={handleCopy}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-md font-bold transition-all active:scale-95 shadow-sm"
                        >
                            {copyStatus}
                        </button>
                    </div>
                </div>
            </div>

            {/* DETAIL RESERVASI */}
            <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Fasilitas</label>
                        <p className="text-lg font-bold text-black border-l-4 border-blue-500 pl-3">{booking.facility}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Kategori</label>
                        <p className="text-lg font-bold text-black border-l-4 border-purple-500 pl-3">{booking.type}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Tanggal Pelaksanaan</label>
                        <p className="text-lg font-bold text-black border-l-4 border-green-500 pl-3">{booking.date}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Waktu / Jam</label>
                        <p className="text-lg font-bold text-black border-l-4 border-orange-500 pl-3">{booking.time} WIB</p>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Tujuan / Keperluan</label>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed italic text-sm">
                        "{booking.purpose}"
                    </div>
                </div>

                {/* DOKUMEN */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {booking.file_ktp && (
                        <a href={getFileUrl(booking.file_ktp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition border border-blue-200 group text-xs">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            File KTP
                        </a>
                    )}
                    {booking.file_surat_permohonan && (
                        <a href={getFileUrl(booking.file_surat_permohonan)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-purple-50 text-purple-700 rounded-xl font-bold hover:bg-purple-100 transition border border-purple-200 group text-xs">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            Surat Permohonan
                        </a>
                    )}
                </div>

                {/* ACTION BUTTONS */}
                {(booking.status === 'Diajukan' || booking.status === 'Menunggu Konfirmasi') && (
                    <div className="flex gap-4 pt-6 border-t border-gray-100">
                        <button 
                            onClick={onReject} // Gunakan onReject
                            className="flex-1 bg-red-100 text-red-600 font-bold py-4 rounded-xl hover:bg-red-200 transition-all active:scale-95 shadow-sm uppercase tracking-wider text-xs"
                        >
                            Tolak Permohonan
                        </button>
                        <button 
                            onClick={onApprove} // Gunakan onApprove
                            className="flex-1 bg-[#6CC24A] text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-md uppercase tracking-wider text-xs"
                        >
                            Terima & Setujui
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;