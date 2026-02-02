import React, { useState } from 'react';

const ReportTab = ({ bookings }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua');

    const filteredReports = bookings.filter((item) => {
        const itemDate = new Date(item.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        const isDateInRange = (!start || itemDate >= start) && (!end || itemDate <= end);
        const isStatusMatch = filterStatus === 'Semua' 
            ? true 
            : (filterStatus === 'Selesai' ? (item.status === 'Selesai' || item.status === 'Disetujui') : item.status === filterStatus);

        return isDateInRange && isStatusMatch;
    });

    const totalData = filteredReports.length;
    const countApproved = filteredReports.filter(i => i.status === 'Disetujui' || i.status === 'Selesai').length;
    const countRejected = filteredReports.filter(i => i.status === 'Ditolak').length;

    const downloadCSV = () => {
        const headers = ["Tanggal;Nama Peminjam;Email;No. Telepon;Fasilitas;Keperluan;Status"];
        const rows = filteredReports.map(item => [
            item.date,
            `"${item.name || item.user?.nama_depan || ''}"`, 
            item.email || item.user?.email || '',
            `'${item.user?.no_telepon || "-"}'`, 
            item.facility,
            `"${(item.purpose || '').replace(/"/g, '""')}"`, 
            item.status
        ].join(";"));
        const csvContent = "\uFEFF" + [headers, ...rows].join("\r\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Laporan_RPTRA_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => window.print();

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in min-h-[600px]">
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-6 gap-4 print:hidden">
            <div>
                <h3 className="font-montserrat font-bold text-xl text-rptra-dark">Laporan & Arsip</h3>
                <p className="text-sm text-gray-500 mt-1 font-poppins">Rekapitulasi data peminjaman fasilitas.</p>
            </div>
            <div className="flex gap-3">
                <button onClick={downloadCSV} className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-md group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Export Excel
                </button>
                <button onClick={handlePrint} className="bg-[#2C3E50] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1a252f] transition shadow-md group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg> Cetak Laporan
                </button>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 print:hidden shadow-sm">
            <h4 className="font-bold text-sm text-gray-700 mb-4 flex items-center gap-2 font-montserrat">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg> FILTER DATA
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide font-poppins">Dari Tanggal</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition-all" />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide font-poppins">Sampai Tanggal</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition-all" />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide font-poppins">Status Pengajuan</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition-all cursor-pointer">
                        <option value="Semua">Semua Status</option>
                        <option value="Selesai">Disetujui / Selesai</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>
            </div>
        </div>

        {/* ringkasan statistik */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                <h4 className="text-2xl font-bold text-blue-700 font-montserrat">{totalData}</h4>
                <p className="text-xs text-blue-600 font-bold uppercase mt-1 font-poppins">Total Data</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                <h4 className="text-2xl font-bold text-green-700 font-montserrat">{countApproved}</h4>
                <p className="text-xs text-green-600 font-bold uppercase mt-1 font-poppins">Disetujui</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                <h4 className="text-2xl font-bold text-red-700 font-montserrat">{countRejected}</h4>
                <p className="text-xs text-red-600 font-bold uppercase mt-1 font-poppins">Ditolak</p>
            </div>
        </div>

        {/* tabel data */}
        <div className="overflow-x-auto print:overflow-visible print:w-full">
            <table className="w-full text-left border-collapse print:text-[10px] print:w-full">
                <thead>
                    <tr className="bg-[#2C3E50] text-white font-montserrat text-xs uppercase tracking-wider">
                        <th className="p-3 rounded-tl-lg print:p-1">Tanggal</th>
                        <th className="p-3 print:p-1">Nama Peminjam</th>
                        <th className="p-3 print:p-1">Email</th>
                        <th className="p-3 print:p-1">No. Telp</th>
                        <th className="p-3 print:p-1">Fasilitas</th>
                        <th className="p-3 print:p-1">Keperluan</th>
                        <th className="p-3 text-center rounded-tr-lg print:p-1">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-700 font-poppins">
                    {filteredReports.length > 0 ? (
                        filteredReports.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition print:break-inside-avoid">
                                <td className="p-3 font-mono text-xs print:p-1">{item.date}</td>
                                <td className="p-3 font-bold print:p-1">{item.name || item.user?.nama_depan}</td>
                                <td className="p-3 text-xs print:p-1 truncate max-w-[100px] print:max-w-none print:whitespace-normal">{item.email || item.user?.email}</td>
                                <td className="p-3 text-xs font-mono print:p-1">{item.user?.no_telepon || "-"}</td>
                                <td className="p-3 print:p-1">{item.facility}</td>
                                <td className="p-3 truncate max-w-[200px] print:max-w-none print:whitespace-normal print:p-1" title={item.purpose}>{item.purpose}</td>
                                <td className="p-3 text-center print:p-1">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                                        item.status === 'Disetujui' || item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                                        item.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {item.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="7" className="p-8 text-center text-gray-400 italic">Tidak ada data yang sesuai dengan filter.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    );
};

export default ReportTab;