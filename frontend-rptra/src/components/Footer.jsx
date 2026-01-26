import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#005f6b] text-white pt-16 pb-8 font-poppins">
      {/* PADDING DI SAMAKAN DENGAN NAVBAR & GALLERY:
         px-8 md:px-24 lg:px-32 
      */}
      <div className="container mx-auto px-8 md:px-24 lg:px-32">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* KOLOM 1: TENTANG */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
               {/* Logo Putih/Brightness diatur agar terlihat */}
               <img 
                 src="/images/logo.jpg" 
                 alt="Logo RPTRA" 
                 className="h-12 w-auto rounded mix-blend-screen brightness-200" 
               />
               <div className="leading-tight">
                  <h3 className="font-bold text-lg">RPTRA</h3>
                  <p className="text-xs tracking-wider">LENTENG AGUNG</p>
               </div>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed opacity-90">
              Ruang Publik Terpadu Ramah Anak (RPTRA) Lenteng Agung adalah wadah untuk kegiatan positif warga, mulai dari olahraga, seni, hingga kegiatan sosial kemasyarakatan.
            </p>
          </div>

          {/* KOLOM 2: KONTAK & LOKASI */}
          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-2 inline-block">
              Lokasi & Kontak
            </h3>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>
                  Jl. Lenteng Agung Raya No.1, RT.1/RW.1,<br/>
                  Lenteng Agung, Kec. Jagakarsa,<br/>
                  Jakarta Selatan, DKI Jakarta
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>rptralentengagung@jakarta.go.id</span>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: JAM OPERASIONAL */}
          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-2 inline-block">
              Jam Operasional
            </h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Senin - Jumat</span>
                <span className="font-semibold text-yellow-400">08:00 - 22:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Sabtu - Minggu</span>
                <span className="font-semibold text-yellow-400">07:00 - 23:00</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Hari Besar</span>
                <span className="font-semibold text-red-300">Tutup / Menyesuaikan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} E-Booking RPTRA Lenteng Agung. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;