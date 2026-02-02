import React from 'react';

const HistoryTab = ({ bookings, loading }) => {
    const getStatusColor = (status) => {
        if (status === 'Selesai' || status === 'Disetujui') return 'bg-green-100 text-green-700';
        if (status === 'Ditolak' || status === 'Dibatalkan') return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    return (
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
};

export default HistoryTab;