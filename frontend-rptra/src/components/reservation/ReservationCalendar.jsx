import React from 'react';

const ChevronDownIcon = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
);

const ReservationCalendar = ({ 
    currentDate, isLoadingDates, isCurrentMonthView, calendarDays, 
    monthNames, yearOptions,
    isMonthOpen, setIsMonthOpen, 
    isYearOpen, setIsYearOpen, 
    handleMonthSelect, handleYearSelect, changeMonth, handleDateClick, 
    selectedDate, closeOthers 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-[20px] p-2 mb-2 shadow-sm flex flex-col justify-center flex-grow z-10 relative">
        
        {/* loading */}
        {isLoadingDates && (
            <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-[20px]">
                <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        )}

        {/* header */}
        <div className="flex items-center justify-between mb-2 px-1 gap-2 w-full relative z-20">
            <button 
                onClick={() => changeMonth(-1)} 
                disabled={isCurrentMonthView} 
                className={`font-black text-lg transition ${isCurrentMonthView ? "text-gray-300 cursor-not-allowed" : "text-[#088395] hover:scale-125 cursor-pointer"}`}
            >
                {'<'}
            </button>

            <div className="flex gap-2 flex-grow justify-center">
                <div className="relative w-1/2">
                    <button onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); closeOthers(); }} className="w-full bg-[#D9D9D9] h-[35px] rounded-[10px] flex items-center justify-center relative hover:bg-gray-300 transition-colors px-2">
                        <span className="text-[#7C7C7C] font-bold text-xs uppercase tracking-wide truncate">{monthNames[currentDate.getMonth()]}</span>
                        <div className="absolute right-1 opacity-60 scale-75"><ChevronDownIcon isOpen={isMonthOpen} /></div>
                    </button>
                    <div className={`absolute top-full left-0 w-full mt-1 bg-white rounded-[10px] shadow-xl overflow-y-auto max-h-[150px] transition-all duration-300 origin-top ${isMonthOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                        {monthNames.map((name, index) => (
                            <div key={name} onClick={() => handleMonthSelect(index)} className="p-2 text-center text-[#7C7C7C] text-xs font-bold uppercase tracking-wide hover:bg-[#088395] hover:text-white cursor-pointer transition-colors border-b border-gray-100 last:border-0">{name}</div>
                        ))}
                    </div>
                </div>
                <div className="relative w-1/3">
                    <button onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); closeOthers(); }} className="w-full bg-[#D9D9D9] h-[35px] rounded-[10px] flex items-center justify-center relative hover:bg-gray-300 transition-colors px-2">
                        <span className="text-[#7C7C7C] font-bold text-xs uppercase tracking-wide">{currentDate.getFullYear()}</span>
                        <div className="absolute right-1 opacity-60 scale-75"><ChevronDownIcon isOpen={isYearOpen} /></div>
                    </button>
                    <div className={`absolute top-full left-0 w-full mt-1 bg-white rounded-[10px] shadow-xl overflow-hidden transition-all duration-300 origin-top ${isYearOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                        {yearOptions.map((year) => (
                            <div key={year} onClick={() => handleYearSelect(year)} className="p-2 text-center text-[#7C7C7C] text-xs font-bold uppercase tracking-wide hover:bg-[#088395] hover:text-white cursor-pointer transition-colors border-b border-gray-100 last:border-0">{year}</div>
                        ))}
                    </div>
                </div>
            </div>
            
            <button onClick={() => changeMonth(1)} className="text-[#088395] font-black text-lg hover:scale-125 transition">{'>'}</button>
        </div>

        {/* angka */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-1 justify-items-center text-xs font-semibold z-10 relative">
            {['Mi', 'Se', 'Sel', 'Ra', 'Ka', 'Ju', 'Sa'].map(day => (<div key={day} className="text-gray-400 font-bold text-[10px] mb-1">{day}</div>))}

            {calendarDays.map((item, index) => {
                const isSelected = selectedDate === item.fullDate;
                const isPastDate = item.type === 'current' && new Date(item.fullDate) < new Date().setHours(0,0,0,0);

                let btnClass = "h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 text-xs ";
                
                if (item.type !== 'current') {
                    btnClass += "text-gray-300 cursor-default";
                } else if (item.isBooked) {
                    btnClass += "bg-red-500 text-white cursor-not-allowed opacity-90 shadow-sm";
                } else if (isPastDate) {
                        btnClass += "text-gray-300 cursor-not-allowed"; 
                } else if (isSelected) {
                    btnClass += "bg-[#088395] text-white shadow-md scale-110";
                } else {
                    btnClass += "text-[#088395] hover:bg-teal-50 hover:scale-110 cursor-pointer";
                }

                return (
                    <button
                        key={index}
                        onClick={() => handleDateClick(item)}
                        disabled={item.type !== 'current' || item.isBooked || isPastDate}
                        className={btnClass}
                        title={item.isBooked ? "Sudah dipesan" : ""}
                    >
                        {item.day}
                    </button>
                );
            })}
        </div>
    </div>
  );
};

export default ReservationCalendar;