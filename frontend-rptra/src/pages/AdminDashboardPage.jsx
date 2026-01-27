import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// === 1. KOMPONEN MODAL DETAIL ===
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
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button onClick={onClose} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[#7C7C7C] rounded-full flex items-center justify-center hover:bg-gray-600 transition shadow-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
                <h2 className="font-montserrat font-bold text-[20px] md:text-[30px] text-black uppercase leading-none">DATA {booking.type || booking.kategori || 'PEMINJAM'}</h2>
            </div>
            {(booking.status === 'Diajukan' || booking.status === 'Menunggu Konfirmasi') && (
                <div className="flex gap-4">
                     <button onClick={() => onAction(booking.id, 'reject')} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#CE2029] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform" title="Tolak"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                     <button onClick={() => onAction(booking.id, 'approve')} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#6CC24A] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform" title="Setujui"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></button>
                </div>
            )}
        </div>
        <div className="bg-[#088395] rounded-[15px] p-6 flex flex-col md:flex-row items-center gap-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-white/20 shrink-0 bg-gray-300"><img src={booking.avatar || booking.user?.avatar || "/images/galeri-1.jpg"} alt="User" className="w-full h-full object-cover" /></div>
            <div className="text-center md:text-left text-white z-10 w-full">
                <h3 className="font-montserrat font-bold text-2xl">{booking.name || booking.user?.nama_depan + ' ' + booking.user?.nama_belakang}</h3>
                <div className="flex flex-col md:flex-row gap-4 mt-1 opacity-90">
                    <div className="flex items-center gap-2 justify-center md:justify-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span className="font-poppins font-medium text-sm">{booking.email || booking.user?.email}</span></div>
                    <div className="flex items-center gap-2 justify-center md:justify-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg><span className="font-poppins font-bold text-sm bg-white/20 px-2 py-0.5 rounded">{phoneNumber}</span></div>
                </div>
                <p className="font-poppins text-xs opacity-60 mt-2">ID Booking: {booking.id}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[15px] p-6 h-full flex flex-col">
                <span className="font-poppins font-semibold italic text-[16px] text-[#7C7C7C] mb-2">Peruntukan Acara</span>
                <p className="font-poppins text-lg text-black mt-1 font-medium">{booking.purpose || booking.keperluan_peminjaman || "Tidak ada keterangan."}</p>
                <div className="mt-6 border-t border-gray-200 pt-4"><span className="font-poppins font-semibold italic text-[14px] text-[#7C7C7C]">Peralatan Tambahan:</span><p className="font-poppins text-md text-gray-700 mt-1">{booking.equipment || "-"}</p></div>
            </div>
            <div className="space-y-4">
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6"><span className="font-poppins font-semibold italic text-lg text-[#7C7C7C] w-full">{booking.facility || booking.fasilitas?.nama_fasilitas}</span></div>
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6"><span className="font-poppins font-semibold italic text-lg text-[#7C7C7C] w-full">{booking.date || booking.tanggal_reservasi}</span></div>
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6"><span className="font-poppins font-semibold italic text-lg text-[#7C7C7C] w-full">{booking.time || booking.waktu_mulai}</span></div>
                <div className="bg-[#F7F8F9] border border-[#DADADA] rounded-[10px] h-[60px] flex items-center px-6 gap-3 group hover:border-[#008C9E] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span className="font-poppins font-bold text-lg text-[#008C9E] w-full">{phoneNumber}</span>
                    {phoneNumber !== "-" && ( <button onClick={() => {navigator.clipboard.writeText(phoneNumber); alert("Nomor disalin!")}} className="text-gray-400 hover:text-black" title="Salin Nomor"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>)}
                </div>
            </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg font-montserrat">Dokumen Persyaratan</h3>
            <div className="flex flex-wrap gap-4">
                {booking.file_ktp ? <a href={getFileUrl(booking.file_ktp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition border border-blue-200 group"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg> Lihat KTP</a> : <span className="text-gray-400 text-sm">KTP Kosong</span>}
                {booking.file_surat_permohonan ? <a href={getFileUrl(booking.file_surat_permohonan)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-purple-50 text-purple-700 rounded-xl font-bold hover:bg-purple-100 transition border border-purple-200 group"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Surat Permohonan</a> : <span className="text-gray-400 text-sm">Surat Permohonan Kosong</span>}
                {booking.file_surat_pengantar && <a href={getFileUrl(booking.file_surat_pengantar)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-orange-50 text-orange-700 rounded-xl font-bold hover:bg-orange-100 transition border border-orange-200 group"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> Surat Pengantar</a>}
            </div>
        </div>
      </div>
    </div>
  );
};

// === 2. HALAMAN UTAMA DASHBOARD ===
const AdminDashboardPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState('UMUM');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true);

  // FETCH DATA DASHBOARD
  const fetchBookings = async () => {
    try {
        setLoading(true);
        const response = await api.get('/admin/dashboard');
        setBookings(response.data); 
    } catch (error) {
        console.error("Gagal ambil data:", error);
        if(error.response?.status === 401 || error.response?.status === 403) {
            alert("Sesi habis. Silakan login ulang.");
            onLogout();
            navigate('/admin/login');
        }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []); 

  const updateBookingStatus = async (id, action) => {
    try {
        const endpoint = action === 'approve' ? `/admin/approve/${id}` : `/admin/reject/${id}`;
        await api.patch(endpoint);
        fetchBookings(); 
        setSelectedBooking(null);
        alert(`Status berhasil diubah!`);
    } catch (error) {
        console.error("Gagal update status:", error);
        alert("Gagal mengubah status.");
    }
  };

  const handleModalAction = (id, action) => { updateBookingStatus(id, action); };

  // --- LOGIKA KALENDER ---
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  
  const getBookingsForDate = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    return bookings.filter(b => b.date === dateString && b.status !== 'Ditolak' && b.status !== 'Dibatalkan');
  };

  const filteredData = bookings.filter(item => {
    const isPending = item.status === 'Menunggu Konfirmasi' || item.status === 'Diajukan';
    const itemType = (item.type || item.kategori || 'WARGA').toUpperCase(); 
    let categoryMatch = false;
    if (activeCategory === 'UMUM' && (itemType === 'WARGA' || itemType === 'UMUM')) categoryMatch = true;
    else if (activeCategory === 'ORGANISASI' && itemType === 'ORGANISASI') categoryMatch = true;
    else if (activeCategory === 'KAMPUS' && itemType === 'KAMPUS') categoryMatch = true;
    return isPending && categoryMatch;
  });

  const totalPending = bookings.filter(b => b.status === 'Menunggu Konfirmasi' || b.status === 'Diajukan').length;
  const totalApproved = bookings.filter(b => b.status === 'Selesai' || b.status === 'Disetujui').length;

  const TabDashboard = () => {
    const recentActivity = bookings.filter(b => ['Disetujui', 'Selesai', 'Ditolak'].includes(b.status)).slice(0, 5);
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"><div><p className="text-gray-500 text-xs font-poppins font-bold uppercase tracking-wider">Permohonan Baru</p><h3 className="text-3xl font-extrabold text-yellow-500 mt-1">{totalPending}</h3></div><div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-500 shadow-sm"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></div></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"><div><p className="text-gray-500 text-xs font-poppins font-bold uppercase tracking-wider">Total Disetujui</p><h3 className="text-3xl font-extrabold text-green-600 mt-1">{totalApproved}</h3></div><div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shadow-sm"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4"><h3 className="font-bold text-lg text-gray-800 font-montserrat">Aktivitas Terakhir</h3><button onClick={() => setActiveTab('laporan')} className="text-xs text-[#008C9E] font-bold hover:underline">Lihat Semua</button></div>
                <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="text-gray-400 font-poppins text-xs font-bold uppercase tracking-wide border-b border-gray-100"><th className="p-3 pl-0">Nama Peminjam</th><th className="p-3">Tanggal Kegiatan</th><th className="p-3">Fasilitas</th><th className="p-3 text-right pr-0">Status</th></tr></thead><tbody>{recentActivity.length > 0 ? (recentActivity.map((item) => (<tr key={item.id} className="font-poppins text-sm group hover:bg-gray-50 transition-colors"><td className="p-4 pl-0 border-b border-gray-50"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"><img src={item.avatar || item.user?.avatar || "/images/galeri-1.jpg"} alt="User" className="w-full h-full object-cover" /></div><span className="font-bold text-gray-700">{item.name || item.user?.nama_depan}</span></div></td><td className="p-4 border-b border-gray-50 text-gray-600 font-mono text-xs">{item.date}</td><td className="p-4 border-b border-gray-50 text-gray-600">{item.facility}</td><td className="p-4 pr-0 border-b border-gray-50 text-right"><span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${item.status === 'Ditolak' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{item.status}</span></td></tr>))) : (<tr><td colSpan="4" className="p-8 text-center text-gray-400 text-sm italic">Belum ada aktivitas persetujuan/penolakan baru.</td></tr>)}</tbody></table></div>
            </div>
        </div>
    );
  };

  const TabDaftarReservasi = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-gray-200"><h3 className="font-bold text-lg text-gray-800 mb-6">Permohonan Masuk</h3><div className="flex gap-8 border-b border-gray-100">{['UMUM', 'ORGANISASI', 'KAMPUS'].map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`font-montserrat font-bold text-sm md:text-lg pb-3 transition-all relative ${activeCategory === cat ? 'text-rptra-dark border-b-4 border-[#008C9E]' : 'text-gray-400 hover:text-gray-600'}`}>{cat}</button>))}</div></div>
        <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-[#F8F9FD] text-gray-700 font-montserrat text-sm font-bold border-b border-gray-200"><th className="p-4 w-1/4">Nama</th><th className="p-4 w-1/4 border-l border-gray-200">Booking ID</th><th className="p-4 w-1/4 border-l border-gray-200">Kontak</th><th className="p-4 w-1/4 border-l border-gray-200 text-center">Acc</th></tr></thead><tbody>{loading ? (<tr><td colSpan="4" className="p-8 text-center text-gray-500">Memuat data...</td></tr>) : filteredData.length > 0 ? (filteredData.map((item, index) => (<tr key={item.id} className={`font-poppins text-sm text-gray-800 ${index % 2 === 0 ? 'bg-[#89C9D1]' : 'bg-[#EBF7F8]'}`}><td className="p-4 flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedBooking(item)}><div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0 border border-white"><img src={item.avatar || item.user?.avatar || "/images/galeri-1.jpg"} alt="User" className="w-full h-full object-cover" /></div><span className="font-semibold truncate group-hover:underline">{item.name || item.user?.nama_depan || "User"}</span></td><td className="p-4 border-l border-white/20 font-mono text-xs">{item.id}</td><td className="p-4 border-l border-white/20"><div className="truncate max-w-[150px] font-medium">{item.email || item.user?.email}</div><div className="text-xs text-gray-600 mt-1 flex items-center gap-1 opacity-80">{item.user?.no_telepon || "-"}</div></td><td className="p-4 border-l border-white/20"><div className="flex justify-center gap-3"><button onClick={() => updateBookingStatus(item.id, 'reject')} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-md"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button><button onClick={() => updateBookingStatus(item.id, 'approve')} className="w-8 h-8 rounded-full bg-[#6CC24A] text-white flex items-center justify-center hover:bg-green-600 transition shadow-md"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></button></div></td></tr>))) : (<tr><td colSpan="4" className="p-8 text-center text-gray-500 bg-white italic border-t border-gray-100">Tidak ada permohonan baru di kategori {activeCategory}.</td></tr>)}</tbody></table></div>
    </div>
  );

  const TabKalender = () => {
    const changeMonth = (offset) => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)); setSelectedCalendarDate(null); };
    const dailySchedule = selectedCalendarDate ? getBookingsForDate(selectedCalendarDate) : [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="flex flex-col xl:flex-row gap-6 animate-fade-in">
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-4"><h3 className="font-montserrat font-bold text-lg text-rptra-dark">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3><div className="flex gap-2"><button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-gray-100 rounded-full"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button><button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-gray-100 rounded-full"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></button></div></div>
                <div className="grid grid-cols-7 gap-1 mb-1 text-center">{['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => <div key={day} className="text-xs font-bold text-gray-400 py-1">{day}</div>)}</div>
                <div className="grid grid-cols-7 gap-1">{blanks.map((_, i) => <div key={`blank-${i}`} className="h-14 md:h-20"></div>)}{days.map(day => { const dayBookings = getBookingsForDate(day); const hasApproved = dayBookings.some(b => b.status === 'Selesai' || b.status === 'Disetujui'); const hasPending = dayBookings.some(b => b.status === 'Menunggu Konfirmasi' || b.status === 'Diajukan'); return (<div key={day} onClick={() => setSelectedCalendarDate(day)} className={`h-14 md:h-20 border rounded-lg p-1 cursor-pointer transition relative group hover:shadow-sm ${selectedCalendarDate === day ? 'border-[#008C9E] bg-blue-50 ring-1 ring-[#008C9E]' : 'border-gray-100 bg-white'}`}><span className={`text-xs font-bold ${selectedCalendarDate === day ? 'text-[#008C9E]' : 'text-gray-700'}`}>{day}</span><div className="mt-1 flex flex-wrap gap-0.5">{hasApproved && <div className="w-1.5 h-1.5 rounded-full bg-red-500" title="Jadwal Fix"></div>}{hasPending && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" title="Menunggu Konfirmasi"></div>}</div></div>); })}</div>
            </div>
            <div className="w-full xl:w-96 shrink-0"><div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full p-5 flex flex-col max-h-[500px] xl:max-h-full"><h3 className="font-montserrat font-bold text-sm text-gray-800 mb-4 border-b pb-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>Persiapan Operasional</h3>{selectedCalendarDate ? (<><div className="mb-4"><p className="text-xs text-gray-500 mb-1">Jadwal Tanggal</p><p className="text-xl font-bold text-[#008C9E] bg-blue-50 inline-block px-3 py-1 rounded-lg">{selectedCalendarDate} {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</p></div><div className="space-y-4 overflow-y-auto flex-1 pr-1 max-h-[400px]">{dailySchedule.length > 0 ? (dailySchedule.map((item, idx) => (<div key={idx} className={`p-4 rounded-xl border-l-4 shadow-sm relative overflow-hidden ${item.status === 'Selesai' || item.status === 'Disetujui' ? 'border-red-500 bg-red-50/50' : 'border-yellow-400 bg-yellow-50/50'}`}><div className="flex justify-between items-start mb-2"><span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${item.status === 'Selesai' || item.status === 'Disetujui' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-yellow-900'}`}>{item.status === 'Selesai' || item.status === 'Disetujui' ? 'SIAPKAN' : 'MENUNGGU'}</span><span className="font-bold text-gray-700 font-mono text-sm bg-white/60 px-2 rounded">{item.time || item.waktu_mulai}</span></div><h4 className="font-montserrat font-bold text-gray-900 text-lg leading-tight mb-1">{item.facility || item.fasilitas?.nama_fasilitas}</h4><p className="text-gray-600 text-xs mb-3 flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>{item.name || item.user?.nama_depan}</p>{item.equipment && (<div className="mt-3 bg-white/70 rounded-lg p-3 border border-black/5"><div className="flex items-center gap-1 mb-2"><svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Peralatan Tambahan:</span></div><div className="space-y-1">{item.equipment.split(', ').map((eq, i) => { const parts = eq.split(' ('); return (<div key={i} className="flex justify-between items-center text-xs border-b border-gray-200/50 last:border-0 pb-1 last:pb-0"><span className="text-gray-700 font-medium truncate pr-2">{parts[0]}</span><span className="font-bold text-gray-900 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-[10px]">{parts.length > 1 ? parts[1].replace(')', '') : ''}</span></div>); })}</div></div>)}</div>))) : (<div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200"><svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /></svg><p className="text-sm font-medium">Tidak ada kegiatan.</p></div>)}</div></>) : (<div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center p-4"><div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3"><svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div><p className="text-sm font-medium text-gray-500">Pilih tanggal di kalender<br/>untuk melihat persiapan.</p></div>)}</div></div></div>
    );
  };

  const TabLaporan = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua');

    const filteredReports = bookings.filter((item) => {
        const itemDate = new Date(item.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const isDateInRange = (!start || itemDate >= start) && (!end || itemDate <= end);
        const isStatusMatch = filterStatus === 'Semua' ? true : (filterStatus === 'Selesai' ? (item.status === 'Selesai' || item.status === 'Disetujui') : item.status === filterStatus);
        return isDateInRange && isStatusMatch;
    });

    const totalData = filteredReports.length;
    const countApproved = filteredReports.filter(i => i.status === 'Disetujui' || i.status === 'Selesai').length;
    const countRejected = filteredReports.filter(i => i.status === 'Ditolak').length;

    const downloadCSV = () => {
        const headers = ["Tanggal;Nama Peminjam;Email;No. Telepon;Fasilitas;Keperluan;Status"];
        const rows = filteredReports.map(item => [
            item.date, `"${item.name || item.user?.nama_depan || ''}"`, item.email || item.user?.email || '', `'${item.user?.no_telepon || "-"}'`, item.facility, `"${(item.purpose || '').replace(/"/g, '""')}"`, item.status
        ].join(";"));
        const csvContent = "\uFEFF" + [headers, ...rows].join("\r\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Laporan_RPTRA_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };

    const handlePrint = () => { window.print(); };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in min-h-[600px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-6 gap-4 print:hidden">
            <div><h3 className="font-montserrat font-bold text-xl text-rptra-dark">Laporan & Arsip</h3><p className="text-sm text-gray-500 mt-1 font-poppins">Rekapitulasi data peminjaman fasilitas.</p></div>
            <div className="flex gap-3">
                <button onClick={downloadCSV} className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-md group"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Export Excel</button>
                <button onClick={handlePrint} className="bg-[#2C3E50] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1a252f] transition shadow-md group"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>Cetak Laporan</button>
            </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 print:hidden shadow-sm">
            <h4 className="font-bold text-sm text-gray-700 mb-4 flex items-center gap-2 font-montserrat"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>FILTER DATA</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group"><label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide font-poppins">Dari Tanggal</label><div className="relative flex items-center transition-all duration-300 focus-within:shadow-md rounded-xl"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#008C9E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008C9E]/50 focus:border-[#008C9E] transition-all duration-300 font-poppins shadow-sm" /></div></div>
                <div className="relative group"><label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide font-poppins">Sampai Tanggal</label><div className="relative flex items-center transition-all duration-300 focus-within:shadow-md rounded-xl"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#008C9E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008C9E]/50 focus:border-[#008C9E] transition-all duration-300 font-poppins shadow-sm" /></div></div>
                <div className="relative group"><label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide font-poppins">Status Pengajuan</label><div className="relative flex items-center transition-all duration-300 focus-within:shadow-md rounded-xl"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#008C9E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008C9E]/50 focus:border-[#008C9E] transition-all duration-300 font-poppins shadow-sm appearance-none cursor-pointer"><option value="Semua">Semua Status</option><option value="Selesai">Disetujui / Selesai</option><option value="Ditolak">Ditolak</option></select><div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"><svg className="w-4 h-4 text-gray-400 group-focus-within:text-[#008C9E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div></div></div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8"><div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center"><h4 className="text-2xl font-bold text-blue-700 font-montserrat">{totalData}</h4><p className="text-xs text-blue-600 font-bold uppercase mt-1 font-poppins">Total Data</p></div><div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center"><h4 className="text-2xl font-bold text-green-700 font-montserrat">{countApproved}</h4><p className="text-xs text-green-600 font-bold uppercase mt-1 font-poppins">Disetujui</p></div><div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center"><h4 className="text-2xl font-bold text-red-700 font-montserrat">{countRejected}</h4><p className="text-xs text-red-600 font-bold uppercase mt-1 font-poppins">Ditolak</p></div></div>

        <div className="overflow-x-auto print:overflow-visible print:w-full"><table className="w-full text-left border-collapse print:text-[10px] print:w-full"><thead><tr className="bg-[#2C3E50] text-white font-montserrat text-xs uppercase tracking-wider"><th className="p-3 rounded-tl-lg print:p-1">Tanggal</th><th className="p-3 print:p-1">Nama Peminjam</th><th className="p-3 print:p-1">Email</th><th className="p-3 print:p-1">No. Telp</th><th className="p-3 print:p-1">Fasilitas</th><th className="p-3 print:p-1">Keperluan</th><th className="p-3 text-center rounded-tr-lg print:p-1">Status</th></tr></thead><tbody className="text-sm text-gray-700 font-poppins">{filteredReports.length > 0 ? (filteredReports.map((item, idx) => (<tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition print:break-inside-avoid"><td className="p-3 font-mono text-xs print:p-1">{item.date}</td><td className="p-3 font-bold print:p-1">{item.name || item.user?.nama_depan}</td><td className="p-3 text-xs print:p-1 truncate max-w-[100px] print:max-w-none print:whitespace-normal">{item.email || item.user?.email}</td><td className="p-3 text-xs font-mono print:p-1">{item.user?.no_telepon || "-"}</td><td className="p-3 print:p-1">{item.facility}</td><td className="p-3 truncate max-w-[200px] print:max-w-none print:whitespace-normal print:p-1" title={item.purpose}>{item.purpose}</td><td className="p-3 text-center print:p-1"><span className={`px-2 py-1 rounded text-[10px] font-bold ${item.status === 'Disetujui' || item.status === 'Selesai' ? 'bg-green-100 text-green-700' : item.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status.toUpperCase()}</span></td></tr>))) : (<tr><td colSpan="7" className="p-8 text-center text-gray-400 italic">Tidak ada data yang sesuai dengan filter.</td></tr>)}</tbody></table></div>
      </div>
    );
  };

  // === FITUR CMS (MANAJEMEN KONTEN) ===
  const TabManajemenKonten = () => {
    // State Galeri
    const [galleryData, setGalleryData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);

    // State Footer
    const [footerInfo, setFooterInfo] = useState({
        alamat: '',
        email: '',
        telepon: '',
        jam_operasional: '', // Added operational hours
        instagram: '',
        deskripsi: ''
    });
    const [footerLoading, setFooterLoading] = useState(false);

    useEffect(() => {
        fetchGallery();
        fetchFooter();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await api.get('/cms/gallery');
            setGalleryData(res.data);
        } catch (err) { console.error("Gagal load galeri", err); }
    };

    const fetchFooter = async () => {
        try {
            const res = await api.get('/cms/footer');
            if (res.data) setFooterInfo(res.data);
        } catch (err) { console.error("Gagal load footer", err); }
    };

    // --- LOGIKA GALERI ---
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadGallery = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert("Pilih foto dulu!");

        const formData = new FormData();
        formData.append('image', selectedFile);

        setUploadLoading(true);
        try {
            await api.post('/cms/gallery', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Foto berhasil diupload!");
            setSelectedFile(null);
            setPreviewUrl(null);
            fetchGallery(); // Refresh data
        } catch (error) {
            console.error("Upload error:", error);
            alert("Gagal upload foto. Pastikan format sesuai.");
        } finally {
            setUploadLoading(false);
        }
    };

    const handleDeleteGallery = async (id) => {
        if (!window.confirm("Yakin ingin menghapus foto ini?")) return;
        try {
            await api.delete(`/cms/gallery/${id}`);
            fetchGallery();
        } catch (error) {
            alert("Gagal menghapus foto.");
        }
    };

    // --- LOGIKA FOOTER ---
    const handleFooterChange = (e) => {
        setFooterInfo({ ...footerInfo, [e.target.name]: e.target.value });
    };

    const handleSaveFooter = async (e) => {
        e.preventDefault();
        setFooterLoading(true);
        try {
            await api.post('/cms/footer', footerInfo);
            alert("Informasi Footer berhasil disimpan!");
        } catch (error) {
            console.error("Save footer error:", error);
            alert("Gagal menyimpan footer.");
        } finally {
            setFooterLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div><h3 className="font-montserrat font-bold text-lg text-gray-800">Galeri Kegiatan</h3><p className="text-xs text-gray-500 mt-1">Upload foto kegiatan terbaru untuk ditampilkan di halaman depan.</p></div>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{galleryData.length} Foto</div>
                </div>
                <div className="p-6">
                    <div className="mb-8 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 w-full"><label className="block text-sm font-bold text-gray-700 mb-2">Upload Foto Baru</label><input type="file" accept="image/*" onChange={handleFileSelect} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" /><p className="text-xs text-gray-400 mt-2">* Format: JPG, PNG, JPEG. Maks 2MB.</p></div>
                        {previewUrl && (<div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0"><img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /></div>)}
                        <button onClick={handleUploadGallery} disabled={uploadLoading || !selectedFile} className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${uploadLoading || !selectedFile ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#008C9E] text-white hover:bg-[#007382] hover:shadow-lg active:scale-95'}`}>{uploadLoading ? (<>Processing...</>) : (<><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> Upload</>)}</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{galleryData.map((img) => (<div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition"><img src={`http://127.0.0.1:8000/storage/${img.image_path}`} alt="Gallery" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><button onClick={() => handleDeleteGallery(img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition transform hover:scale-110 shadow-lg" title="Hapus Foto"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></div></div>))}{galleryData.length === 0 && (<div className="col-span-full text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">Belum ada foto di galeri.</div>)}</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50"><h3 className="font-montserrat font-bold text-lg text-gray-800">Informasi Footer & Kontak</h3><p className="text-xs text-gray-500 mt-1">Data ini akan muncul di bagian bawah website (Footer).</p></div>
                <div className="p-6">
                    <form onSubmit={handleSaveFooter} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2"><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Alamat Lengkap</label><textarea name="alamat" rows="2" value={footerInfo.alamat} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="Contoh: Jl. Pasir Putih No. 1..."></textarea></div>
                        <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Nomor Telepon / WhatsApp</label><div className="relative"><span className="absolute left-4 top-3 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></span><input type="text" name="telepon" value={footerInfo.telepon} onChange={handleFooterChange} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="0812..." /></div></div>
                        <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Email Resmi</label><div className="relative"><span className="absolute left-4 top-3 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span><input type="email" name="email" value={footerInfo.email} onChange={handleFooterChange} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="admin@rptra.com" /></div></div>
                        <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Jam Operasional</label><input type="text" name="jam_operasional" value={footerInfo.jam_operasional} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="Contoh: Senin-Jumat 08:00 - 16:00" /></div>
                        <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Link Instagram</label><input type="text" name="instagram" value={footerInfo.instagram} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="https://instagram.com/..." /></div>
                        <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Deskripsi Singkat</label><input type="text" name="deskripsi" value={footerInfo.deskripsi} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="RPTRA adalah..." /></div>
                        <div className="col-span-2 flex justify-end mt-4"><button type="submit" disabled={footerLoading} className="bg-[#2C3E50] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-[#1a252f] transition hover:shadow-lg active:scale-95 flex items-center gap-2">{footerLoading ? 'Menyimpan...' : 'Simpan Perubahan'}</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
  };

  const TabManajemenPengguna = () => ( <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in"><h3 className="font-bold text-lg text-gray-800 mb-6 border-b pb-4">Data Pengguna Terdaftar</h3><p className="text-gray-500">Fitur User Management akan tersedia segera.</p></div> );

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-poppins relative">
      <div className="container mx-auto px-4 md:px-12 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 print:hidden"><div><h1 className="text-2xl font-bold text-rptra-dark">Admin Dashboard</h1><p className="text-sm text-gray-500">Selamat datang, Administrator!</p></div><div className="text-right hidden md:block"><p className="text-xs text-green-600 font-bold">● System Online</p></div></div>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-64 shrink-0 print:hidden">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                    <div className="p-5 bg-[#2C3E50]"><div className="flex flex-col items-center gap-2 text-center"><div className="w-16 h-16 bg-white rounded-full p-1 shadow-sm"><img src="/images/logo.jpg" className="w-full h-full object-contain rounded-full" alt="Admin"/></div><div className="text-white"><p className="font-bold text-sm">ADMINISTRATOR</p><p className="text-[10px] opacity-70">RPTRA Lenteng Agung</p></div></div></div>
                    <div className="p-2 space-y-1">
                        <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg>Dashboard</button>
                        <button onClick={() => setActiveTab('reservasi')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'reservasi' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>Daftar Reservasi {totalPending > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{totalPending}</span>}</button>
                        <button onClick={() => setActiveTab('kalender')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'kalender' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>Jadwal & Ketersediaan</button>
                        <button onClick={() => setActiveTab('laporan')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'laporan' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Laporan & Arsip</button>
                        <button onClick={() => setActiveTab('cms')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'cms' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Manajemen Konten</button>
                        <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'users' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>Data Pengguna</button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={() => { onLogout(); navigate('/admin/login'); }} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>Keluar</button>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                {activeTab === 'dashboard' && <TabDashboard />}
                {activeTab === 'reservasi' && <TabDaftarReservasi />}
                {activeTab === 'kalender' && <TabKalender />}
                {activeTab === 'laporan' && <TabLaporan />}
                {activeTab === 'cms' && <TabManajemenKonten />}
                {activeTab === 'users' && <TabManajemenPengguna />}
            </div>
        </div>
      </div>
      {selectedBooking && <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} onAction={handleModalAction} />}
    </div>
  );
};

export default AdminDashboardPage;