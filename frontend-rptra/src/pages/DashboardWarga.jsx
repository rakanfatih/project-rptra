import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios'; // Import API

const DashboardWarga = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [activeTab, setActiveTab] = useState('dashboard');
  
  // STATE DATA REAL
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // === 1. FETCH DATA DARI API ===
  useEffect(() => {
    const fetchHistory = async () => {
        try {
            const response = await api.get('/riwayat-saya');
            setBookings(response.data);
        } catch (error) {
            console.error("Gagal ambil riwayat:", error);
        } finally {
            setLoading(false);
        }
    };
    
    if (user) {
        fetchHistory();
    }
  }, [user]);

  // === 2. LOGIKA TAB ===
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  if (!user) {
    navigate('/login');
    return null;
  }

  // Helper Warna Status
  const getStatusColor = (status) => {
    if (status === 'Selesai' || status === 'Disetujui') return 'bg-green-100 text-green-700';
    if (status === 'Ditolak' || status === 'Dibatalkan') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  // --- KOMPONEN KONTEN TAB ---
  
  // 1. Tab Dashboard
  const TabDashboard = () => {
    const totalBooking = bookings.length;
    const waiting = bookings.filter(b => b.status === 'Diajukan' || b.status === 'Menunggu Konfirmasi').length;
    const done = bookings.filter(b => b.status === 'Selesai' || b.status === 'Disetujui').length;
    const activeBooking = bookings.find(b => b.status === 'Diajukan' || b.status === 'Menunggu Konfirmasi' || b.status === 'Disetujui');

    return (
        <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                <div>
                    <p className="text-gray-500 text-xs font-poppins">Total Booking</p>
                    <h3 className="text-2xl font-bold text-rptra-dark">{totalBooking}</h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                <div>
                    <p className="text-gray-500 text-xs font-poppins">Menunggu Konfirmasi</p>
                    <h3 className="text-2xl font-bold text-yellow-600">{waiting}</h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                <div>
                    <p className="text-gray-500 text-xs font-poppins">Selesai</p>
                    <h3 className="text-2xl font-bold text-green-600">{done}</h3>
                </div>
                <div className="p-3 bg-green-50 rounded-full text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Status Peminjaman Terkini</h3>
            {activeBooking ? (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <img src="/images/galeri-1.jpg" alt="Lapangan" className="w-16 h-16 object-cover rounded" />
                        </div>
                        <div>
                            <h4 className="font-bold text-rptra-dark">{activeBooking.facility}</h4>
                            <p className="text-xs text-gray-500">{activeBooking.date} • {activeBooking.time}</p>
                            <span className={`inline-block text-[10px] px-2 py-1 rounded-full mt-1 font-bold ${getStatusColor(activeBooking.status)}`}>
                                {activeBooking.status}
                            </span>
                        </div>
                    </div>
                    <button onClick={()=>setActiveTab('riwayat')} className="text-xs text-blue-600 hover:underline font-bold">Lihat Detail</button>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-400 text-sm">Tidak ada peminjaman aktif saat ini.</div>
            )}
        </div>
        </div>
    );
  };

  // 2. Tab Riwayat
  const TabRiwayat = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Riwayat Peminjaman</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-4 py-3">Fasilitas</th>
                        <th className="px-4 py-3">Tanggal</th>
                        <th className="px-4 py-3">Waktu</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {loading ? (
                         <tr><td colSpan="4" className="p-4 text-center text-gray-400">Memuat data...</td></tr>
                    ) : bookings.length > 0 ? (
                        bookings.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 font-medium text-gray-900">{item.facility}</td>
                                <td className="px-4 py-3 text-gray-500">{item.date}</td>
                                <td className="px-4 py-3 text-gray-500">{item.time}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusColor(item.status)}`}>{item.status}</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                         <tr><td colSpan="4" className="p-8 text-center text-gray-400">Belum ada riwayat.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );

  // 3. Tab Pengaturan (UPDATE DISINI)
  const TabPengaturan = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in max-w-2xl">
        <h3 className="font-bold text-lg text-gray-800 mb-6">Edit Profil</h3>
        <form className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <img src={user.avatar || "/images/galeri-1.jpg"} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                <div className="text-sm">
                    <p className="font-bold text-gray-800">{user.nama_depan} {user.nama_belakang}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Depan</label>
                    <input type="text" defaultValue={user.nama_depan} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Belakang</label>
                    <input type="text" defaultValue={user.nama_belakang} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input type="email" defaultValue={user.email} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
            </div>

            {/* NOMOR TELEPON (BARU) */}
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nomor Telepon</label>
                <input type="text" defaultValue={user.no_telepon || '-'} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
            </div>

            <div className="pt-4 text-right">
               <p className="text-xs text-gray-400 italic">Hubungi admin untuk mengubah data profil.</p>
            </div>
        </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-poppins">
      <div className="container mx-auto px-4 md:px-24 lg:px-32 py-10">
        
        <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-rptra-blue transition text-sm font-medium">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Kembali ke Home
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-rptra-dark">Dashboard Warga</h1>
                <p className="text-sm text-gray-500">Selamat datang kembali, {user.nama_depan}!</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-xs text-gray-400">Terakhir Login</p>
                <p className="text-sm font-bold text-gray-700">Hari ini</p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR */}
            <div className="w-full lg:w-64 shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                    <div className="p-5 bg-[#008C9E]">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <img src={user.avatar || "/images/galeri-1.jpg"} className="w-16 h-16 rounded-full border-4 border-white/30 shadow-sm object-cover" alt="Avatar"/>
                            <div className="text-white">
                                <p className="font-bold text-sm">{user.nama_depan}</p>
                                <p className="text-[10px] opacity-80">{user.role}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-2 space-y-1">
                        <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            Ringkasan
                        </button>
                        <button onClick={() => setActiveTab('riwayat')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'riwayat' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Riwayat Sewa
                        </button>
                        <button onClick={() => setActiveTab('pengaturan')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'pengaturan' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Pengaturan Profil
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={onLogout} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Keluar
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1">
                {activeTab === 'dashboard' && <TabDashboard />}
                {activeTab === 'riwayat' && <TabRiwayat />}
                {activeTab === 'pengaturan' && <TabPengaturan />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWarga;