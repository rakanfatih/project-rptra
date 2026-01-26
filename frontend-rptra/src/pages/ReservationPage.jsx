import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State Fasilitas
  const [facility, setFacility] = useState(location.state?.facility || 'AULA');
  
  // State Toggle Dropdowns
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  
  // State Kalender (Single Date)
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(null);

  // DUMMY DATA TANGGAL BOOKED
  const bookedDates = ['2026-02-06', '2026-02-09', '2026-02-20'];
  const monthNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + i);

  // --- LOGIKA KALENDER ---
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    const daysInPrevMonth = new Date(year, month, 0).getDate(); 
    const daysArray = [];

    // Trailing Days
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push({ day: daysInPrevMonth - firstDayOfMonth + 1 + i, type: 'prev', fullDate: null });
    }
    // Current Days
    for (let i = 1; i <= daysInMonth; i++) {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(i).padStart(2, '0');
        const fullDate = `${year}-${monthStr}-${dayStr}`;
        daysArray.push({ day: i, type: 'current', fullDate: fullDate, isBooked: bookedDates.includes(fullDate) });
    }
    // Leading Days
    const remainingCells = 42 - daysArray.length;
    for (let i = 1; i <= remainingCells; i++) {
        daysArray.push({ day: i, type: 'next', fullDate: null });
    }
    return daysArray;
  };

  const calendarDays = getCalendarDays();

  // Handlers
  const handleMonthSelect = (index) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(index);
    setCurrentDate(newDate);
    setIsMonthOpen(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setIsYearOpen(false);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const handleDateClick = (dateObj) => {
    if (dateObj.type !== 'current' || dateObj.isBooked) return;
    setSelectedDate(dateObj.fullDate);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Harap pilih tanggal terlebih dahulu.");
      return;
    }
    navigate('/reservasi/form', { state: { facility, date: selectedDate } });
  };

  // Icons
  const ChevronDownIcon = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
  );

  const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  return (
    <div className="min-h-screen relative flex flex-col font-poppins overflow-hidden">

      {/* === BACKGROUND STACK === */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/bgreservasi.jpg')" }}></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#088395] opacity-30"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full" style={{ background: 'linear-gradient(to left, #088395 0%, rgba(8, 131, 149, 0) 100%)', opacity: 1 }}></div>
      </div>

      {/* === TOMBOL BACK (Diubah ke '/') === */}
      <button 
        onClick={() => navigate('/')}  // <-- Navigasi ke Home (Service Section)
        className="absolute top-6 left-6 z-50 group bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-[#088395] transition-all shadow-lg border border-white/30"
        title="Kembali ke Home"
      >
        <ArrowLeftIcon />
      </button>


      {/* === CONTENT AREA === */}
      <div className="relative z-10 flex-grow flex items-center justify-center md:justify-end px-4 md:pr-40 w-full h-full">
         
         {/* KARTU RESERVASI */}
         <div className="bg-white rounded-[35px] shadow-2xl w-full max-w-[380px] h-[450px] p-6 animate-fade-in-up flex flex-col justify-between z-20">
           
           {/* Bagian Atas: Dropdown Fasilitas */}
           <div className="relative z-30 mb-2">
              <button onClick={() => { setIsFacilityOpen(!isFacilityOpen); setIsMonthOpen(false); setIsYearOpen(false); }} className="w-full bg-[#D9D9D9] h-[55px] rounded-[15px] flex items-center justify-center relative hover:bg-gray-300 transition-colors">
                  <span className="text-[#7C7C7C] font-extrabold text-xl uppercase tracking-widest text-shadow-sm">{facility}</span>
                  <div className="absolute right-4 opacity-60"><ChevronDownIcon isOpen={isFacilityOpen} /></div>
              </button>
              <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-[15px] shadow-xl overflow-hidden transition-all duration-300 origin-top ${isFacilityOpen ? 'opacity-100 scale-y-100 max-h-[200px]' : 'opacity-0 scale-y-0 max-h-0'}`}>
                  {['AULA', 'LAPANGAN'].map((item) => (
                      <div key={item} onClick={() => { setFacility(item); setIsFacilityOpen(false); }} className="p-3 text-center text-[#7C7C7C] font-bold uppercase tracking-widest hover:bg-[#088395] hover:text-white cursor-pointer transition-colors">{item}</div>
                  ))}
              </div>
           </div>

            {/* Grid Kalender */}
            <div className="bg-white border border-gray-200 rounded-[20px] p-2 mb-2 shadow-sm flex flex-col justify-center flex-grow z-10">
                
                {/* Header Dropdowns (Bulan & Tahun) */}
                <div className="flex items-center justify-between mb-2 px-1 gap-2 w-full relative z-20">
                    <button onClick={() => changeMonth(-1)} className="text-[#088395] font-black text-lg hover:scale-125 transition">{'<'}</button>
                    <div className="flex gap-2 flex-grow justify-center">
                        {/* Bulan */}
                        <div className="relative w-1/2">
                            <button onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); setIsFacilityOpen(false); }} className="w-full bg-[#D9D9D9] h-[35px] rounded-[10px] flex items-center justify-center relative hover:bg-gray-300 transition-colors px-2">
                                <span className="text-[#7C7C7C] font-bold text-xs uppercase tracking-wide truncate">{monthNames[currentDate.getMonth()]}</span>
                                <div className="absolute right-1 opacity-60 scale-75"><ChevronDownIcon isOpen={isMonthOpen} /></div>
                            </button>
                            <div className={`absolute top-full left-0 w-full mt-1 bg-white rounded-[10px] shadow-xl overflow-y-auto max-h-[150px] transition-all duration-300 origin-top ${isMonthOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                                {monthNames.map((name, index) => (
                                    <div key={name} onClick={() => handleMonthSelect(index)} className="p-2 text-center text-[#7C7C7C] text-xs font-bold uppercase tracking-wide hover:bg-[#088395] hover:text-white cursor-pointer transition-colors border-b border-gray-100 last:border-0">{name}</div>
                                ))}
                            </div>
                        </div>
                        {/* Tahun */}
                        <div className="relative w-1/3">
                            <button onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); setIsFacilityOpen(false); }} className="w-full bg-[#D9D9D9] h-[35px] rounded-[10px] flex items-center justify-center relative hover:bg-gray-300 transition-colors px-2">
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

                {/* Grid Angka */}
                <div className="grid grid-cols-7 gap-y-1 gap-x-1 justify-items-center text-xs font-semibold z-10 relative">
                    {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map(day => (<div key={day} className="text-gray-400 font-bold text-[10px] mb-1">{day}</div>))}

                    {calendarDays.map((item, index) => {
                        const isSelected = selectedDate === item.fullDate;
                        let btnClass = "h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 text-xs ";
                        
                        if (item.type !== 'current') {
                            btnClass += "text-gray-300 cursor-default";
                        } else if (item.isBooked) {
                            btnClass += "bg-red-500 text-white cursor-not-allowed opacity-90 shadow-sm";
                        } else if (isSelected) {
                            btnClass += "bg-[#088395] text-white shadow-md scale-110";
                        } else {
                            btnClass += "text-[#088395] hover:bg-teal-50 hover:scale-110 cursor-pointer";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleDateClick(item)}
                                disabled={item.type !== 'current' || item.isBooked}
                                className={btnClass}
                            >
                                {item.day}
                            </button>
                        );
                    })}
                </div>
            </div>

            <button onClick={handleSubmit} className="w-full bg-[#088395] h-[45px] rounded-[15px] text-white font-bold text-base uppercase tracking-widest hover:bg-[#066c7a] transition-all transform active:scale-[0.98] shadow-lg">
                RESERVASI
            </button>

         </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-transparent py-4 z-20">
        <div className="container mx-auto text-center">
          <p className="text-white font-bold text-sm tracking-widest drop-shadow-md font-montserrat">RPTRA 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationPage;