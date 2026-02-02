// src/components/admin/AdminSideBar.jsx
import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab, totalPending, onLogout }) => {
  return (
    <div className="w-full lg:w-64 shrink-0 print:hidden lg:sticky lg:top-8">
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Sidebar */}
        <div className="p-5 bg-[#2C3E50]">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-16 h-16 bg-white rounded-full p-1 shadow-sm">
                <img src="/images/logo.jpg" className="w-full h-full object-contain rounded-full" alt="Admin" />
            </div>
            <div className="text-white">
                <p className="font-bold text-sm">ADMINISTRATOR</p>
                <p className="text-[10px] opacity-70">RPTRA Lenteng Agung</p>
            </div>
          </div>
        </div>

        {/* Menu Sidebar */}
        <div className="p-2 space-y-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg>
            Dashboard
          </button>
          
          <button onClick={() => setActiveTab('reservasi')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'reservasi' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Daftar Reservasi 
            {totalPending > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{totalPending}</span>}
          </button>
          
          <button onClick={() => setActiveTab('kalender')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'kalender' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Jadwal & Ketersediaan
          </button>
          
          <button onClick={() => setActiveTab('laporan')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'laporan' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Laporan & Arsip
          </button>
          
          <button onClick={() => setActiveTab('cms')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'cms' ? 'bg-blue-50 text-rptra-blue font-bold border-l-4 border-rptra-blue' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Manajemen Konten
          </button>

          <div className="border-t border-gray-100 my-1"></div>
          <button onClick={onLogout} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;