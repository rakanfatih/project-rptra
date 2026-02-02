import React from 'react';

const DashboardTab = ({ bookings, setActiveTab }) => {
    const totalBooking = bookings.length;
    const waiting = bookings.filter(b => b.status === 'Diajukan' || b.status === 'Menunggu Konfirmasi').length;
    const done = bookings.filter(b => b.status === 'Selesai' || b.status === 'Disetujui').length;
    const activeBooking = bookings.find(b => b.status === 'Diajukan' || b.status === 'Menunggu Konfirmasi' || b.status === 'Disetujui');

    const getStatusColor = (status) => {
        if (status === 'Selesai' || status === 'Disetujui') return 'bg-green-100 text-green-700';
        if (status === 'Ditolak' || status === 'Dibatalkan') return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                    <div><p className="text-gray-500 text-xs font-poppins">Total Booking</p><h3 className="text-2xl font-bold text-rptra-dark">{totalBooking}</h3></div>
                    <div className="p-3 bg-blue-50 rounded-full text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                    <div><p className="text-gray-500 text-xs font-poppins">Menunggu Konfirmasi</p><h3 className="text-2xl font-bold text-yellow-600">{waiting}</h3></div>
                    <div className="p-3 bg-yellow-50 rounded-full text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                    <div><p className="text-gray-500 text-xs font-poppins">Selesai</p><h3 className="text-2xl font-bold text-green-600">{done}</h3></div>
                    <div className="p-3 bg-green-50 rounded-full text-green-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                </div>
            </div>

            {/* status terbaru */}
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

export default DashboardTab;