import React from 'react';

const ChevronDownIcon = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
);

const ReservationFacilitySelector = ({ facility, setFacility, isOpen, setIsOpen, closeOthers }) => {
  return (
    <div className="relative z-30 mb-2">
      <button onClick={() => { setIsOpen(!isOpen); closeOthers(); }} className="w-full bg-[#D9D9D9] h-[55px] rounded-[15px] flex items-center justify-center relative hover:bg-gray-300 transition-colors">
          <span className="text-[#7C7C7C] font-extrabold text-xl uppercase tracking-widest text-shadow-sm">{facility}</span>
          <div className="absolute right-4 opacity-60"><ChevronDownIcon isOpen={isOpen} /></div>
      </button>
      <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-[15px] shadow-xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 max-h-[200px]' : 'opacity-0 scale-y-0 max-h-0'}`}>
          {['AULA', 'LAPANGAN'].map((item) => (
              <div key={item} onClick={() => { setFacility(item); setIsOpen(false); }} className="p-3 text-center text-[#7C7C7C] font-bold uppercase tracking-widest hover:bg-[#088395] hover:text-white cursor-pointer transition-colors">{item}</div>
          ))}
      </div>
   </div>
  );
};

export default ReservationFacilitySelector;