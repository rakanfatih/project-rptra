import React from 'react';

const AdminLoginHeader = () => {
  return (
    <>
      {/* header */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo.jpg" 
            alt="Logo RPTRA" 
            className="h-14 md:h-16 w-auto object-contain mix-blend-multiply"
          />
          <div className="text-left leading-tight">
            <h1 className="font-montserrat font-bold text-xl md:text-2xl text-black">
              Lenteng <br /> Agung
            </h1>
          </div>
        </div>

        <div className="hidden md:block w-[2px] h-12 bg-black/80"></div>

        <div className="text-center md:text-left">
          <h2 className="font-montserrat font-medium text-lg md:text-2xl text-black leading-tight">
            Layanan Peminjaman <br /> Lapangan Dan Aula RPTRA
          </h2>
        </div>
      </div>

      {/* judul form */}
      <h3 className="font-montserrat font-bold text-2xl text-black mb-8">
        Login Admin
      </h3>
    </>
  );
};

export default AdminLoginHeader;