import React from 'react';

const BookingDetailModal = ({ booking, onClose, onAction }) => {
  if (!booking) return null;

  const getFileUrl = (path) => {
    if (!path) return null;
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  const phoneNumber = booking.user?.no_telepon || booking.no_telepon || "-";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in print:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto z-10 p-6 md:p-10 border border-[#DADADA]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button onClick={onClose} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[#7C7C7C] rounded-full flex items-center justify-center hover:bg-gray-600 transition shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="font-montserrat font-bold text-[20px] md:text-[30px] text-black uppercase leading-none">
                    DATA {booking.type || booking.kategori || 'PEMINJAM'}
                </h2>
            </div>
            
            {(booking.status === 'Diajukan' || booking.status === 'Menunggu Konfirmasi') && (
                <div className="flex gap-4">
                     <button onClick={() => onAction(booking.id, 'reject')} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#CE2029] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform" title="Tolak">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                     </button>
                     <button onClick={() => onAction(booking.id, 'approve')} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#6CC24A] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform" title="Setujui">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                     </button>
                </div>
            )}
        </div>
        
        {/* DETAIL USER */}
        <div className="bg-[#088395] rounded-[15px] p-6 flex flex-col md:flex-row items-center gap-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-white/20 shrink-0 bg-gray-300">
                <img src={booking.avatar || booking.user?.avatar || "/images/galeri-1.jpg"} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left text-white z-10 w-full">
                <h3 className="font-montserrat font-bold text-2xl">{booking.name || booking.user?.nama_depan + ' ' + booking.user?.nama_belakang}</h3>
                <div className="flex flex-col md:flex-row gap-4 mt-1 opacity-90">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                        <span className="font-poppins font-medium text-sm">{booking.email || booking.user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                        <span className="font-poppins font-bold text-sm bg-white/20 px-2 py-0.5 rounded">{phoneNumber}</span>
                    </div>
                </div>
                <p className="font-poppins text-xs opacity-60 mt-2">ID Booking: {booking.id}</p>
            </div>
        </div>

        {/* GRID INFORMASI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[15px] p-6 h-full flex flex-col">
                <span className="font-poppins font-semibold italic text-[16px] text-[#7C7C7C] mb-2">Peruntukan Acara</span>
                <p className="font-poppins text-lg text-black mt-1 font-medium">{booking.purpose || booking.keperluan_peminjaman || "Tidak ada keterangan."}</p>
                <div className="mt-6 border-t border-gray-200 pt-4">
                    <span className="font-poppins font-semibold italic text-[14px] text-[#7C7C7C]">Peralatan Tambahan:</span>
                    <p className="font-poppins text-md text-gray-700 mt-1">{booking.equipment || "-"}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6">
                    <span className="font-poppins font-semibold italic text-lg text-[#7C7C7C] w-full">{booking.facility || booking.fasilitas?.nama_fasilitas}</span>
                </div>
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6">
                    <span className="font-poppins font-semibold italic text-lg text-[#7C7C7C] w-full">{booking.date || booking.tanggal_reservasi}</span>
                </div>
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6">
                    <span className="font-poppins font-semibold italic text-lg text-[#7C7C7C] w-full">{booking.time || booking.waktu_mulai}</span>
                </div>
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6 gap-3 group hover:border-[#008C9E] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span className="font-poppins font-bold text-lg text-[#008C9E] w-full">{phoneNumber}</span>
                </div>
            </div>
        </div>

        {/* DOKUMEN PERSYARATAN */}
        <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg font-montserrat">Dokumen Persyaratan</h3>
            <div className="flex flex-wrap gap-4">
                {booking.file_ktp ? (
                    <a href={getFileUrl(booking.file_ktp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition border border-blue-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg> Lihat KTP
                    </a>
                ) : <span className="text-gray-400 text-sm">KTP Kosong</span>}
                
                {booking.file_surat_permohonan ? (
                    <a href={getFileUrl(booking.file_surat_permohonan)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-purple-50 text-purple-700 rounded-xl font-bold hover:bg-purple-100 transition border border-purple-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Surat Permohonan
                    </a>
                ) : <span className="text-gray-400 text-sm">Surat Permohonan Kosong</span>}

                {booking.file_surat_pengantar && (
                    <a href={getFileUrl(booking.file_surat_pengantar)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-orange-50 text-orange-700 rounded-xl font-bold hover:bg-orange-100 transition border border-orange-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> Surat Pengantar
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;