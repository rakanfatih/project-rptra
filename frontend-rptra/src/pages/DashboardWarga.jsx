import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWargaBookings } from '../hooks/useWargaBookings';

import WargaSidebar from '../components/warga/WargaSidebar';
import DashboardTab from '../components/warga/tabs/DashboardTab';
import HistoryTab from '../components/warga/tabs/HistoryTab';
import ProfileTab from '../components/warga/tabs/ProfileTab';

const DashboardWarga = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const { bookings, loading } = useWargaBookings(user);

  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [user, location.state, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-poppins">
      <div className="container mx-auto px-4 md:px-24 lg:px-32 py-10">
        
        {/* button back */}
        <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-rptra-blue transition text-sm font-medium">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Kembali ke Home
        </button>

        {/* header */}
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

        {/* utama */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            
            {/* sidebar */}
            <WargaSidebar 
                user={user} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={onLogout} 
            />

            {/* konten */}
            <div className="flex-1">
                {activeTab === 'dashboard' && <DashboardTab bookings={bookings} setActiveTab={setActiveTab} />}
                {activeTab === 'riwayat' && <HistoryTab bookings={bookings} loading={loading} />}
                {activeTab === 'pengaturan' && <ProfileTab user={user} />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWarga;