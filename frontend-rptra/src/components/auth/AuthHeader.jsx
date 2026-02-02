import React from 'react';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-2">
        <div className="flex items-center gap-2">
          <img src="/images/logo.jpg" alt="Logo" className="h-12 w-auto object-contain"/>
          <div className="text-left">
            <h1 className="font-poppins font-bold text-lg md:text-xl text-black leading-none">Lenteng <br /> Agung</h1>
          </div>
        </div>
        <div className="hidden md:block w-[2px] h-8 bg-black/80"></div>
        <h2 className="font-poppins font-medium text-sm md:text-base text-black text-center md:text-left max-w-xs leading-tight">
          Layanan Peminjaman <br /> Lapangan Dan Aula RPTRA
        </h2>
      </div>
    </div>
  );
};

export default AuthHeader;