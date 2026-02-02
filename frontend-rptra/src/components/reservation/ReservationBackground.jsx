import React from 'react';

const ReservationBackground = ({ facility }) => {
  const currentBgImage = facility === 'LAPANGAN' ? '/images/bgreservasi2.jpg' : '/images/bgreservasi.jpg';

  return (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500 ease-in-out" 
        style={{ backgroundImage: `url('${currentBgImage}')` }}
      ></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#088395] opacity-30"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full" style={{ background: 'linear-gradient(to left, #088395 0%, rgba(8, 131, 149, 0) 100%)', opacity: 1 }}></div>
      </div>
    </>
  );
};

export default ReservationBackground;