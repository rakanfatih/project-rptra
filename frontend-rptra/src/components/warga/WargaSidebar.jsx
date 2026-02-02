import React from 'react';

const WargaSidebar = ({ user, activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-8 lg:self-start">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
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
  );
};

export default WargaSidebar;