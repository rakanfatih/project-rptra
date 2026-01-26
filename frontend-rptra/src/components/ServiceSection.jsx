import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceSection = () => {
  const navigate = useNavigate();
  const handleBooking = (facilityName) => {
    navigate('/reservasi', { state: { facility: facilityName } });
  };

  return (
    <section className="py-12 bg-white"> 
      <div className="container mx-auto px-6 text-center">
        
        {/*HEADER*/}
        <h2 className="font-poppins font-semibold text-xl md:text-2xl uppercase mb-3 tracking-tight" data-aos="fade-down">
          LAYANAN YANG TERSEDIA DI RPTRA
        </h2>
        
        <p className="font-poppins font-light text-xs md:text-sm text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
          Layanan ini diberikan oleh kelurahan Lenteng Agung untuk kegiatan positif, sosialisasi, dan kegiatan lainnya untuk warga kelurahan Lenteng Agung seperti :
        </p>

        {/* === GRID KARTU === */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          
          {/* KARTU AULA */}
          <div className="relative h-[250px] rounded-[24px] overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300" data-aos="fade-up">
            <img src="/images/aula.jpg" alt="Aula" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h3 className="font-poppins font-bold text-2xl mb-1 drop-shadow-lg">AULA</h3>
              <p className="font-poppins font-medium text-xs text-center mb-3 max-w-[180px] drop-shadow-md">
                Dapat dipakai untuk kegiatan positif dan sosialisasi kepada masyarakat
              </p>
              
              <button 
                onClick={() => handleBooking('Aula')}
                className="bg-rptra-blue text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg transform hover:scale-105"
              >
                Klik Reservasi
              </button>

            </div>
          </div>

          {/* KARTU LAPANGAN */}
          <div className="relative h-[250px] rounded-[24px] overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <img src="/images/lapangan.jpg" alt="Lapangan" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h3 className="font-poppins font-bold text-2xl mb-1 drop-shadow-lg">LAPANGAN</h3>
              <p className="font-poppins font-medium text-xs text-center mb-3 max-w-[180px] drop-shadow-md">
                Dapat digunakan untuk kegiatan olahraga serta kegiatan lainnya
              </p>
              
              {/* UBAH TOMBOL DISINI */}
              <button 
                onClick={() => handleBooking('Lapangan')}
                className="bg-rptra-blue text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg transform hover:scale-105"
              >
                Klik Reservasi
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSection;