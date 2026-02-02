import React, { useState } from 'react';

const CalendarTab = ({ bookings }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const changeMonth = (offset) => { 
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)); 
        setSelectedCalendarDate(null); 
    };

    const getBookingsForDate = (day) => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateString = `${year}-${month}-${dayStr}`;
        return bookings.filter(b => b.date === dateString && b.status !== 'Ditolak' && b.status !== 'Dibatalkan');
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dailySchedule = selectedCalendarDate ? getBookingsForDate(selectedCalendarDate) : [];

    return (
        <div className="flex flex-col xl:flex-row gap-6 animate-fade-in">
            {/* kalender */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-montserrat font-bold text-lg text-rptra-dark">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-gray-100 rounded-full"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
                        <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-gray-100 rounded-full"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => <div key={day} className="text-xs font-bold text-gray-400 py-1">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {blanks.map((_, i) => <div key={`blank-${i}`} className="h-14 md:h-20"></div>)}
                    {days.map(day => {
                        const dayBookings = getBookingsForDate(day);
                        const hasApproved = dayBookings.some(b => b.status === 'Selesai' || b.status === 'Disetujui');
                        const hasPending = dayBookings.some(b => b.status === 'Menunggu Konfirmasi' || b.status === 'Diajukan');
                        return (
                            <div key={day} onClick={() => setSelectedCalendarDate(day)} className={`h-14 md:h-20 border rounded-lg p-1 cursor-pointer transition relative group hover:shadow-sm ${selectedCalendarDate === day ? 'border-[#008C9E] bg-blue-50 ring-1 ring-[#008C9E]' : 'border-gray-100 bg-white'}`}>
                                <span className={`text-xs font-bold ${selectedCalendarDate === day ? 'text-[#008C9E]' : 'text-gray-700'}`}>{day}</span>
                                <div className="mt-1 flex flex-wrap gap-0.5">
                                    {hasApproved && <div className="w-1.5 h-1.5 rounded-full bg-red-500" title="Jadwal Fix"></div>}
                                    {hasPending && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" title="Menunggu Konfirmasi"></div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* list persiapan */}
            <div className="w-full xl:w-96 shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full p-5 flex flex-col max-h-[500px] xl:max-h-full">
                    <h3 className="font-montserrat font-bold text-sm text-gray-800 mb-4 border-b pb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#008C9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        Persiapan Operasional
                    </h3>
                    
                    {selectedCalendarDate ? (
                        <>
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-1">Jadwal Tanggal</p>
                                <p className="text-xl font-bold text-[#008C9E] bg-blue-50 inline-block px-3 py-1 rounded-lg">
                                    {selectedCalendarDate} {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </p>
                            </div>
                            
                            <div className="space-y-4 overflow-y-auto flex-1 pr-1 max-h-[400px]">
                                {dailySchedule.length > 0 ? (
                                    dailySchedule.map((item, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border-l-4 shadow-sm relative overflow-hidden ${item.status === 'Selesai' || item.status === 'Disetujui' ? 'border-red-500 bg-red-50/50' : 'border-yellow-400 bg-yellow-50/50'}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${item.status === 'Selesai' || item.status === 'Disetujui' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-yellow-900'}`}>{item.status === 'Selesai' || item.status === 'Disetujui' ? 'SIAPKAN' : 'MENUNGGU'}</span>
                                                <span className="font-bold text-gray-700 font-mono text-sm bg-white/60 px-2 rounded">{item.time || item.waktu_mulai}</span>
                                            </div>
                                            <h4 className="font-montserrat font-bold text-gray-900 text-lg leading-tight mb-1">{item.facility || item.fasilitas?.nama_fasilitas}</h4>
                                            <p className="text-gray-600 text-xs mb-3 flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>{item.name || item.user?.nama_depan}</p>
                                            {item.equipment && (
                                                <div className="mt-3 bg-white/70 rounded-lg p-3 border border-black/5">
                                                    <div className="flex items-center gap-1 mb-2"><svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Peralatan Tambahan:</span></div>
                                                    <div className="space-y-1">{item.equipment.split(', ').map((eq, i) => { const parts = eq.split(' ('); return (<div key={i} className="flex justify-between items-center text-xs border-b border-gray-200/50 last:border-0 pb-1 last:pb-0"><span className="text-gray-700 font-medium truncate pr-2">{parts[0]}</span><span className="font-bold text-gray-900 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-[10px]">{parts.length > 1 ? parts[1].replace(')', '') : ''}</span></div>); })}</div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200"><svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /></svg><p className="text-sm font-medium">Tidak ada kegiatan.</p></div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center p-4"><div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3"><svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div><p className="text-sm font-medium text-gray-500">Pilih tanggal di kalender<br/>untuk melihat persiapan.</p></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarTab;