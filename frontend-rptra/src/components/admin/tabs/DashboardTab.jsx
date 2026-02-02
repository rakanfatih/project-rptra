import React from 'react';

const DashboardTab = ({ bookings, setActiveTab }) => {
    const totalPending = bookings.filter(b => b.status === 'Menunggu Konfirmasi' || b.status === 'Diajukan').length;
    const totalApproved = bookings.filter(b => b.status === 'Selesai' || b.status === 'Disetujui').length;

    const recentActivity = bookings
        .filter(b => ['Disetujui', 'Selesai', 'Ditolak'].includes(b.status))
        .slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div><p className="text-gray-500 text-xs font-poppins font-bold uppercase tracking-wider">Permohonan Baru</p><h3 className="text-3xl font-extrabold text-yellow-500 mt-1">{totalPending}</h3></div>
                    <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-500 shadow-sm"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div><p className="text-gray-500 text-xs font-poppins font-bold uppercase tracking-wider">Total Disetujui</p><h3 className="text-3xl font-extrabold text-green-600 mt-1">{totalApproved}</h3></div>
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shadow-sm"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                </div>
            </div>

            {/* aktivitas terakhir */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                    <h3 className="font-bold text-lg text-gray-800 font-montserrat">Aktivitas Terakhir</h3>
                    <button onClick={() => setActiveTab('laporan')} className="text-xs text-[#008C9E] font-bold hover:underline">Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 font-poppins text-xs font-bold uppercase tracking-wide border-b border-gray-100">
                                <th className="p-3 pl-0">Nama Peminjam</th>
                                <th className="p-3">Tanggal Kegiatan</th>
                                <th className="p-3">Fasilitas</th>
                                <th className="p-3 text-right pr-0">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.length > 0 ? (
                                recentActivity.map((item) => (
                                    <tr key={item.id} className="font-poppins text-sm group hover:bg-gray-50 transition-colors">
                                        <td className="p-4 pl-0 border-b border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"><img src={item.avatar || item.user?.avatar || "/images/galeri-1.jpg"} alt="User" className="w-full h-full object-cover" /></div>
                                                <span className="font-bold text-gray-700">{item.name || item.user?.nama_depan}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-gray-50 text-gray-600 font-mono text-xs">{item.date}</td>
                                        <td className="p-4 border-b border-gray-50 text-gray-600">{item.facility}</td>
                                        <td className="p-4 pr-0 border-b border-gray-50 text-right">
                                            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                                                item.status === 'Ditolak' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-400 text-sm italic">Belum ada aktivitas persetujuan/penolakan baru.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;