import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReservationFormPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data dari halaman sebelumnya
  const { facility, date } = location.state || { facility: '', date: '' };

  // Handle jika user akses langsung tanpa pilih tanggal
  if (!date) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Akses Ditolak</h2>
          <button onClick={() => navigate('/reservasi')} className="bg-[#008C9E] text-white px-4 py-2 rounded">Kembali ke Kalender</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika kirim ke backend bisa disini
    alert("Permohonan Reservasi Berhasil Dikirim!");
    navigate('/dashboard'); // Balik ke dashboard setelah submit
  };

  return (
    <>
      <Navbar user={user} />
      
      <div className="min-h-screen bg-white pt-24 pb-20 font-poppins">
        <div className="container mx-auto px-4 md:px-24 lg:px-32 max-w-4xl">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#008C9E] mb-2">Formulir Peminjaman</h1>
            <p className="text-gray-500 text-sm">Silakan lengkapi data di bawah ini untuk mengajukan peminjaman fasilitas.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SECTION 1: BOOK FACILITY */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C9E] rounded-full"></span> Book Facility
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nama Peminjam</label>
                        <input type="text" defaultValue={user?.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#008C9E] focus:ring-1 focus:ring-[#008C9E]" placeholder="Nama Lengkap" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tipe Booking</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#008C9E]">
                            <option>Umum/Organisasi/Kampus</option>
                            <option>Warga RW setempat</option>
                            <option>Instansi Pemerintah</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tipe Fasilitas</label>
                        <input type="text" value={facility} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed font-semibold" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tanggal Booking</label>
                        <input type="text" value={date} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed font-semibold" />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tujuan / Aktivitas</label>
                    <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#008C9E] resize-none" placeholder="Jelaskan tujuan peminjaman..." required></textarea>
                </div>
            </div>

            {/* SECTION 2: ADDITIONAL EQUIPMENT */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C9E] rounded-full"></span> Additional Equipment (Optional)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Meja Lipat', 'Kursi Plastik', 'Karpet Merah', 'Sound System', 'Proyektor', 'Tenda'].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#008C9E] focus:ring-[#008C9E]" />
                            <span className="text-sm text-gray-600 group-hover:text-[#008C9E] transition">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* SECTION 3: REQUIRED DOCUMENTS */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C9E] rounded-full"></span> Required Documents
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">KTP Penanggung Jawab</label>
                        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#008C9E] file:text-white hover:file:bg-[#007a8a]" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Surat Pengantar RT/RW</label>
                        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#008C9E] file:text-white hover:file:bg-[#007a8a]" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Surat Permohonan (Proposal)</label>
                        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#008C9E] file:text-white hover:file:bg-[#007a8a]" />
                    </div>
                </div>
            </div>

            {/* BUTTON SUBMIT */}
            <div className="pt-4">
                <button type="submit" className="w-full bg-[#0075FF] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-600 transition transform hover:scale-[1.01] active:scale-95 text-lg">
                    Reservasi Sekarang
                </button>
            </div>

          </form>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationFormPage;