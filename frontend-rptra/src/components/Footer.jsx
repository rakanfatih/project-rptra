import React from 'react';

// Menerima props footerInfo dari LandingPage
const Footer = ({ footerInfo }) => {
  return (
    <footer className="bg-[#005f6b] text-white font-poppins min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12">
      
      <div className="container mx-auto px-8 md:px-24 lg:px-32">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* KOLOM 1: TENTANG */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-gray-200 leading-relaxed">
              {footerInfo?.deskripsi || "Ruang Publik Terpadu Ramah Anak sebagai pusat interaksi warga dan pengembangan anak."}
            </p>
          </div>

          {/* KOLOM 2: KONTAK */}
          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-2 inline-block">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{footerInfo?.alamat || "Alamat belum diatur."}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{footerInfo?.telepon || "-"}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>{footerInfo?.email || "-"}</span>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: JAM OPERASIONAL */}
          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-2 inline-block">
              Jam Operasional
            </h3>
            
            <div className="bg-white/10 p-4 rounded-lg border border-white/10 mb-6">
                 <p className="text-sm text-yellow-400 font-mono font-bold">
                    {footerInfo?.jam_operasional || "Setiap Hari: 08:00 - 17:00"}
                 </p>
                 <p className="text-xs text-gray-300 mt-1">Jadwal dapat berubah sewaktu-waktu.</p>
            </div>

            {footerInfo?.instagram && (
                <a href={footerInfo.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-yellow-400 transition group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span>Follow Instagram</span>
                </a>
            )}
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} RPTRA Lenteng Agung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;