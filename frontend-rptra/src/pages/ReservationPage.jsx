import React from 'react';
import { useReservationPage } from '../hooks/useReservationPage';

import ReservationBackground from '../components/reservation/ReservationBackground';
import ReservationFacilitySelector from '../components/reservation/ReservationFacilitySelector';
import ReservationCalendar from '../components/reservation/ReservationCalendar';

const ReservationPage = ({ user }) => {
  const {
    facility, setFacility,
    isFacilityOpen, setIsFacilityOpen,
    isMonthOpen, setIsMonthOpen,
    isYearOpen, setIsYearOpen,
    currentDate, selectedDate, isLoadingDates,
    monthNames, yearOptions, isCurrentMonthView, calendarDays,
    handleMonthSelect, handleYearSelect, changeMonth, handleDateClick, handleSubmit,
    navigate
  } = useReservationPage();

  return (
    <div className="min-h-screen relative flex flex-col font-poppins overflow-hidden">

      <ReservationBackground facility={facility} />
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 z-50 group bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-[#088395] transition-all shadow-lg border border-white/30"
        title="Kembali ke Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* konten */}
      <div className="relative z-10 flex-grow flex items-center justify-center md:justify-end px-4 md:pr-40 w-full h-full">
         
         <div className="bg-white rounded-[35px] shadow-2xl w-full max-w-[380px] h-[450px] p-6 animate-fade-in-up flex flex-col justify-between z-20">
           
           {/* fasilitas (dropdown) */}
           <ReservationFacilitySelector 
              facility={facility} 
              setFacility={setFacility} 
              isOpen={isFacilityOpen} 
              setIsOpen={setIsFacilityOpen}
              closeOthers={() => { setIsMonthOpen(false); setIsYearOpen(false); }}
           />

            {/* kalender */}
            <ReservationCalendar 
                currentDate={currentDate}
                isLoadingDates={isLoadingDates}
                isCurrentMonthView={isCurrentMonthView}
                calendarDays={calendarDays}
                monthNames={monthNames}
                yearOptions={yearOptions}
                isMonthOpen={isMonthOpen}
                setIsMonthOpen={setIsMonthOpen}
                isYearOpen={isYearOpen}
                setIsYearOpen={setIsYearOpen}
                handleMonthSelect={handleMonthSelect}
                handleYearSelect={handleYearSelect}
                changeMonth={changeMonth}
                handleDateClick={handleDateClick}
                selectedDate={selectedDate}
                closeOthers={() => setIsFacilityOpen(false)}
            />

            {/* button reservasi */}
            <button 
                onClick={handleSubmit} 
                className="w-full bg-[#088395] h-[45px] rounded-[15px] text-white font-bold text-base uppercase tracking-widest hover:bg-[#066c7a] transition-all transform active:scale-[0.98] shadow-lg"
            >
                RESERVASI
            </button>

         </div>
      </div>

      {/* footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-transparent py-4 z-20">
        <div className="container mx-auto text-center">
          <p className="text-white font-bold text-sm tracking-widest drop-shadow-md font-montserrat">RPTRA 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationPage;