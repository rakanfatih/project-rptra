//waktu dan detail

import React from 'react';

const ReservationSectionTwo = ({ 
  displayDate, startTime, setStartTime, endTime, setEndTime, 
  purpose, setPurpose, equipmentList, handleToggleEquipment, handleChangeQty,
  openDropdown, toggleDropdown
}) => {
  
  const timeOptions = [];
  for (let i = 8; i <= 22; i++) {
    const hour = i < 10 ? `0${i}` : i;
    timeOptions.push(`${hour}:00`);
    if (i !== 22) timeOptions.push(`${hour}:30`);
  }

  return (
    <div className="space-y-6 mt-8 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#007BF7] flex items-center justify-center font-bold text-sm shrink-0">2</div>
        <h3 className="font-urbanist font-bold text-lg text-gray-800">Detail Kegiatan & Perlengkapan</h3>
      </div>

      {/* tanggal */}
      <div className="space-y-2">
        <label className="block font-urbanist font-bold text-sm text-gray-700">Tanggal Kegiatan <span className="text-red-500 ml-1">*</span></label>
        <div className="relative">
            <input type="text" value={displayDate || 'Tanggal belum dipilih'} readOnly className="w-full h-[55px] pl-12 pr-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium cursor-not-allowed focus:outline-none"/>
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
      </div>

      {/* waktu */}
      <div className="grid grid-cols-2 gap-4">
         {/* jam mulai */}
         <div className="space-y-2 relative z-20">
            <label className="block font-urbanist font-bold text-sm text-gray-700">Jam Mulai <span className="text-red-500 ml-1">*</span></label>
            {openDropdown === 'startTime' && <div className="fixed inset-0 z-10 cursor-default" onClick={() => toggleDropdown(null)}></div>}
            <div className="relative z-20">
                <button type="button" onClick={() => toggleDropdown('startTime')} className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-between focus:outline-none hover:border-[#007BF7] transition-colors">
                    <span>{startTime}</span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'startTime' ? 'rotate-180 text-[#007BF7]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openDropdown === 'startTime' && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-up origin-top max-h-60 overflow-y-auto">
                        {timeOptions.map((t) => (
                            <div key={t} onClick={() => { setStartTime(t); toggleDropdown(null); }} className={`px-5 py-3.5 cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${startTime === t ? 'bg-blue-50 text-[#007BF7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                                {t}
                                {startTime === t && <svg className="w-4 h-4 text-[#007BF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
         </div>

         {/* jam selesai */}
         <div className="space-y-2 relative z-20">
            <label className="block font-urbanist font-bold text-sm text-gray-700">Jam Selesai <span className="text-red-500 ml-1">*</span></label>
            {openDropdown === 'endTime' && <div className="fixed inset-0 z-10 cursor-default" onClick={() => toggleDropdown(null)}></div>}
            <div className="relative z-20">
                <button type="button" onClick={() => toggleDropdown('endTime')} className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-between focus:outline-none hover:border-[#007BF7] transition-colors">
                    <span>{endTime}</span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'endTime' ? 'rotate-180 text-[#007BF7]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openDropdown === 'endTime' && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-up origin-top max-h-60 overflow-y-auto">
                        {timeOptions.map((t) => (
                            <div key={t} onClick={() => { setEndTime(t); toggleDropdown(null); }} className={`px-5 py-3.5 cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${endTime === t ? 'bg-blue-50 text-[#007BF7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                                {t}
                                {endTime === t && <svg className="w-4 h-4 text-[#007BF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
         </div>
      </div>

      {/* keperluan */}
      <div className="space-y-2">
        <label className="block font-urbanist font-bold text-sm text-gray-700">Tujuan / Kegiatan <span className="text-red-500 ml-1">*</span></label>
        <textarea rows="3" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full p-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:border-[#007BF7] focus:ring-4 focus:ring-blue-50 transition-all resize-none" placeholder="Contoh: Rapat Koordinasi"></textarea>
        <p className="text-xs text-gray-500 italic mt-1">Mohon ceritakan secara detail mengenai kegiatan yang akan dilaksanakan.</p>
      </div>

      {/* peralatan */}
      <div className="space-y-3 pt-2">
        <label className="block font-urbanist font-bold text-sm text-gray-800">Peralatan Tambahan (Opsional)</label>
        <div className="grid grid-cols-1 gap-3">
            {equipmentList.map((item) => (
                <div key={item.id} onClick={() => handleToggleEquipment(item.id)} className={`flex items-center justify-between p-4 border rounded-xl transition-all cursor-pointer group ${item.checked ? 'border-[#007BF7] bg-[#F0F7FF] shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${item.checked ? 'bg-[#007BF7] border-[#007BF7]' : 'bg-white border-gray-300'}`}>
                            {item.checked && <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                        <span className={`font-medium text-sm ${item.checked ? 'text-[#007BF7]' : 'text-gray-700'}`}>{item.label}</span>
                    </div>
                    {item.checked && (
                        <div className="flex items-center gap-2 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-gray-500 font-medium">Qty:</span>
                            <input type="number" min="1" value={item.qty} onChange={(e) => handleChangeQty(item.id, e.target.value)} className="w-16 h-9 px-2 text-center text-sm font-bold text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BF7] focus:ring-1 focus:ring-[#007BF7]" />
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationSectionTwo;