import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardWarga = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // Default tab adalah 'dashboard', tapi nanti bisa berubah via useEffect
  const [activeTab, setActiveTab] = useState('dashboard');

  // === LOGIKA PENTING: Cek kiriman state dari HeroSection ===
  useEffect(() => {
    // Jika ada data 'tab' yang dikirim (misal: "pengaturan" atau "riwayat")
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]); // Jalankan setiap kali lokasi/state berubah

  // Redirect jika belum login (Refresh halaman saat login)
  if (!user) {
    navigate('/login');
    return null;
  }

  // --- KOMPONEN KONTEN TAB ---
  
  // 1. Tab Dashboard
  const TabDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
                <p className="text-gray-500 text-xs font-poppins">Total Booking</p>
                <h3 className="text-2xl font-bold text-rptra-dark">12</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
                <p className="text-gray-500 text-xs font-poppins">Menunggu Konfirmasi</p>
                <h3 className="text-2xl font-bold text-yellow-600">1</h3>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
                <p className="text-gray-500 text-xs font-poppins">Selesai</p>
                <h3 className="text-2xl font-bold text-green-600">11</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        </div>
      </div>

      {/* Booking Aktif Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Status Peminjaman Aktif</h3>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img src="/images/galeri-1.jpg" alt="Lapangan" className="w-16 h-16 object-cover rounded" />
                </div>
                <div>
                    <h4 className="font-bold text-rptra-dark">Lapangan Futsal</h4>
                    <p className="text-xs text-gray-500">Jumat, 24 Februari 2026 • 16:00 - 18:00</p>
                    <span className="inline-block bg-yellow-100 text-yellow-700 text-[10px] px-2 py-1 rounded-full mt-1 font-bold">Menunggu Verifikasi</span>
                </div>
            </div>
            <button className="text-xs text-blue-600 hover:underline font-bold">Lihat Detail</button>
        </div>
      </div>
    </div>
  );

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
                    {[1,2,3].map((item) => (
                        <tr key={item} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 font-medium text-gray-900">Aula Serbaguna</td>
                            <td className="px-4 py-3 text-gray-500">20 Jan 2026</td>
                            <td className="px-4 py-3 text-gray-500">09:00 - 12:00</td>
                            <td className="px-4 py-3">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold">Selesai</span>
                            </td>
                        </tr>
                    ))}
                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-900">Lapangan Badminton</td>
                        <td className="px-4 py-3 text-gray-500">15 Des 2025</td>
                        <td className="px-4 py-3 text-gray-500">19:00 - 21:00</td>
                        <td className="px-4 py-3">
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-[10px] font-bold">Dibatalkan</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );

  // 3. Tab Pengaturan
  const TabPengaturan = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in max-w-2xl">
        <h3 className="font-bold text-lg text-gray-800 mb-6">Edit Profil</h3>
        <form className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                <button type="button" className="text-xs bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-bold transition">Ubah Foto</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Depan</label>
                    <input type="text" defaultValue="RPTRA" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-rptra-blue focus:outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Belakang</label>
                    <input type="text" defaultValue="User" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-rptra-blue focus:outline-none" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input type="email" defaultValue={user.email} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-rptra-blue focus:outline-none" readOnly />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
                <input type="text" defaultValue="08123456789" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-rptra-blue focus:outline-none" />
            </div>

            <div className="pt-4 text-right">
                <button className="bg-rptra-blue text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-rptra-dark transition">Simpan Perubahan</button>
            </div>
        </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-poppins">
      
      {/* Padding container */}
      <div className="container mx-auto px-4 md:px-24 lg:px-32 py-10">
        
        {/* Tombol Balik ke Home */}
        <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-rptra-blue transition text-sm font-medium">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Kembali ke Home
        </button>

        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-rptra-dark">Dashboard Warga</h1>
                <p className="text-sm text-gray-500">Selamat datang kembali, {user.name}!</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-xs text-gray-400">Terakhir Login</p>
                <p className="text-sm font-bold text-gray-700">Hari ini, 10:30 WIB</p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR MENU (Kiri) */}
            <div className="w-full lg:w-64 shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                    {/* Header Sidebar */}
                    <div className="p-5 bg-[#008C9E]">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <img src={user.avatar} className="w-16 h-16 rounded-full border-4 border-white/30 shadow-sm" alt="Avatar"/>
                            <div className="text-white">
                                <p className="font-bold text-sm">{user.name}</p>
                                <p className="text-[10px] opacity-80">Warga RW 01</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* List Menu Sidebar */}
                    <div className="p-2 space-y-1">
                        <button 
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            Ringkasan
                        </button>
                        <button 
                            onClick={() => setActiveTab('riwayat')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'riwayat' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Riwayat Sewa
                        </button>
                        <button 
                            onClick={() => setActiveTab('pengaturan')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'pengaturan' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Pengaturan Profil
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button 
                            onClick={onLogout}
                            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition flex items-center gap-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Keluar
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA (Kanan) */}
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