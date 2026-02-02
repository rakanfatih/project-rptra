import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // state awal
  const initialFacility = (location.state?.facility || 'AULA').toUpperCase();
  const [facility, setFacility] = useState(initialFacility);
  
  // state UI
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  
  // state kalender
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);

  // constants
  const monthNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + i);
  const today = new Date();
  const isCurrentMonthView = 
    currentDate.getMonth() === today.getMonth() && 
    currentDate.getFullYear() === today.getFullYear();

  // API fetch
  useEffect(() => {
    const fetchBookedDates = async () => {
        setIsLoadingDates(true);
        setSelectedDate(null); 
        setBookedDates([]); 

        try {
            const response = await api.get(`/booked-dates?facility=${facility}`);
            setBookedDates(response.data); 
        } catch (error) {
            console.error("Gagal mengambil jadwal:", error);
        } finally {
            setIsLoadingDates(false);
        }
    };

    fetchBookedDates();
  }, [facility]);

  // kalender
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    const daysInPrevMonth = new Date(year, month, 0).getDate(); 
    const daysArray = [];

    // hari bulan sebelumnya
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push({ day: daysInPrevMonth - firstDayOfMonth + 1 + i, type: 'prev', fullDate: null });
    }
    // hari bulan ini
    for (let i = 1; i <= daysInMonth; i++) {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(i).padStart(2, '0');
        const fullDate = `${year}-${monthStr}-${dayStr}`; 
        
        const isBooked = bookedDates.includes(fullDate);

        daysArray.push({ day: i, type: 'current', fullDate: fullDate, isBooked: isBooked });
    }
    // hari bulan depan
    const remainingCells = 42 - daysArray.length;
    for (let i = 1; i <= remainingCells; i++) {
        daysArray.push({ day: i, type: 'next', fullDate: null });
    }
    return daysArray;
  };

  const calendarDays = getCalendarDays();

  // handlers
  const handleMonthSelect = (index) => {
    if (currentDate.getFullYear() === today.getFullYear() && index < today.getMonth()) return;
    const newDate = new Date(currentDate);
    newDate.setMonth(index);
    setCurrentDate(newDate);
    setIsMonthOpen(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    if (year === today.getFullYear() && newDate.getMonth() < today.getMonth()) {
        newDate.setMonth(today.getMonth());
    }
    setCurrentDate(newDate);
    setIsYearOpen(false);
  };

  const changeMonth = (offset) => {
    if (offset === -1 && isCurrentMonthView) return;
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const handleDateClick = (dateObj) => {
    if (dateObj.type !== 'current' || dateObj.isBooked) return;
    
    const clickedDate = new Date(dateObj.fullDate);
    const todayZero = new Date();
    todayZero.setHours(0,0,0,0);
    
    if (clickedDate < todayZero) return;

    setSelectedDate(dateObj.fullDate);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Harap pilih tanggal terlebih dahulu.");
      return;
    }
    navigate('/reservasi/form', { state: { facility, date: selectedDate } });
  };

  return {
    facility, setFacility,
    isFacilityOpen, setIsFacilityOpen,
    isMonthOpen, setIsMonthOpen,
    isYearOpen, setIsYearOpen,
    currentDate, setCurrentDate,
    selectedDate, setSelectedDate,
    bookedDates, isLoadingDates,
    monthNames, yearOptions, isCurrentMonthView, calendarDays,
    handleMonthSelect, handleYearSelect, changeMonth, handleDateClick, handleSubmit,
    navigate
  };
};