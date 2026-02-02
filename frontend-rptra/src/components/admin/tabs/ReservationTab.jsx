import React, { useState } from 'react';

const ReservationTab = ({ bookings, loading, onSelectBooking, onUpdateStatus }) => {
    const [activeCategory, setActiveCategory] = useState('UMUM');

    // filter data
    const filteredData = bookings.filter(item => {
        const isPending = item.status === 'Menunggu Konfirmasi' || item.status === 'Diajukan';
        const itemType = (item.type || item.kategori || 'WARGA').toUpperCase(); 
        
        let categoryMatch = false;
        if (activeCategory === 'UMUM' && (itemType === 'WARGA' || itemType === 'UMUM')) categoryMatch = true;
        else if (activeCategory === 'ORGANISASI' && itemType === 'ORGANISASI') categoryMatch = true;
        else if (activeCategory === 'KAMPUS' && itemType === 'KAMPUS') categoryMatch = true;
        
        return isPending && categoryMatch;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 mb-6">Permohonan Masuk</h3>
                <div className="flex gap-8 border-b border-gray-100">
                    {['UMUM', 'ORGANISASI', 'KAMPUS'].map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`font-montserrat font-bold text-sm md:text-lg pb-3 transition-all relative ${activeCategory === cat ? 'text-rptra-dark border-b-4 border-[#008C9E]' : 'text-gray-400 hover:text-gray-600'}`}>{cat}</button>
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8F9FD] text-gray-700 font-montserrat text-sm font-bold border-b border-gray-200">
                            <th className="p-4 w-1/4">Nama</th><th className="p-4 w-1/4 border-l border-gray-200">Booking ID</th><th className="p-4 w-1/4 border-l border-gray-200">Kontak</th><th className="p-4 w-1/4 border-l border-gray-200 text-center">Acc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                             <tr><td colSpan="4" className="p-8 text-center text-gray-500">Memuat data...</td></tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={item.id} className={`font-poppins text-sm text-gray-800 ${index % 2 === 0 ? 'bg-[#89C9D1]' : 'bg-[#EBF7F8]'}`}>
                                    <td className="p-4 flex items-center gap-3 cursor-pointer group" onClick={() => onSelectBooking(item)}>
                                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0 border border-white"><img src={item.avatar || item.user?.avatar || "/images/galeri-1.jpg"} alt="User" className="w-full h-full object-cover" /></div>
                                        <span className="font-semibold truncate group-hover:underline">{item.name || item.user?.nama_depan || "User"}</span>
                                    </td>
                                    <td className="p-4 border-l border-white/20 font-mono text-xs">{item.id}</td>
                                    <td className="p-4 border-l border-white/20">
                                        <div className="truncate max-w-[150px] font-medium">{item.email || item.user?.email}</div>
                                        <div className="text-xs text-gray-600 mt-1 flex items-center gap-1 opacity-80">
                                             {item.user?.no_telepon || "-"}
                                        </div>
                                    </td>
                                    <td className="p-4 border-l border-white/20">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => onUpdateStatus(item.id, 'reject')} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-md"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                                            <button onClick={() => onUpdateStatus(item.id, 'approve')} className="w-8 h-8 rounded-full bg-[#6CC24A] text-white flex items-center justify-center hover:bg-green-600 transition shadow-md"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-500 bg-white italic border-t border-gray-100">Tidak ada permohonan baru di kategori {activeCategory}.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationTab;