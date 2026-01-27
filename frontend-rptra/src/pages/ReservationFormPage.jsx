import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ReservationFormPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Ambil data dari halaman sebelumnya
  const { facility, date } = location.state || { facility: 'AULA', date: '' };
  
  const displayDate = date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const dbDate = date ? new Date(date).toISOString().split('T')[0] : '';

  // --- STATES UTAMA ---
  const [bookingType, setBookingType] = useState('Umum'); 
  
  // Fasilitas langsung di-set dari state lokasi, tidak perlu dropdown lagi
  const [selectedFacility] = useState(facility || 'AULA'); 
  
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [purpose, setPurpose] = useState('');

  // === STATE PERALATAN TAMBAHAN ===
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, label: 'Meja Lipat', checked: false, qty: 1 },
    { id: 2, label: 'Kursi Plastik', checked: false, qty: 10 },
    { id: 3, label: 'Karpet Merah', checked: false, qty: 1 },
    { id: 4, label: 'Sound System', checked: false, qty: 1 },
  ]);

  // --- STATES FILE ---
  const [fileKtp, setFileKtp] = useState(null);
  const [filePermohonan, setFilePermohonan] = useState(null);
  const [filePengantar, setFilePengantar] = useState(null);

  // --- UI STATES ---
  const [openDropdown, setOpenDropdown] = useState(null); 
  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fullName = user ? `${user.nama_depan} ${user.nama_belakang}` : '';
  const phoneNumber = user ? user.no_telepon : '-'; // Ambil nomor telepon

  const timeOptions = [];
  for (let i = 8; i <= 22; i++) {
    const hour = i < 10 ? `0${i}` : i;
    timeOptions.push(`${hour}:00`);
    if (i !== 22) timeOptions.push(`${hour}:30`);
  }

  // --- HANDLERS ---
  const handleToggleEquipment = (id) => {
    setEquipmentList(prev => prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleChangeQty = (id, val) => {
    setEquipmentList(prev => prev.map(item => 
        item.id === id ? { ...item, qty: parseInt(val) || 0 } : item
    ));
  };

  const handleSuccessAction = () => {
    setShowSuccessModal(false);
    navigate('/dashboard', { state: { tab: 'riwayat' } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validasi
    if (!startTime || !endTime) { alert("Mohon isi waktu!"); return; }
    if (startTime >= endTime) { alert("Jam selesai harus lebih akhir!"); return; }
    if (!purpose) { alert("Mohon isi tujuan!"); return; }
    
    if (!fileKtp) { alert("Wajib upload KTP!"); return; }
    if (!filePermohonan) { alert("Wajib upload Surat Permohonan!"); return; }
    
    if (bookingType !== 'Umum' && !filePengantar) { 
        alert("Untuk kategori Organisasi/Kampus, Wajib upload Surat Pengantar!"); 
        return; 
    }

    setIsLoading(true);

    try {
        const formData = new FormData();
        formData.append('fasilitas_id', selectedFacility); 
        formData.append('kategori', bookingType);
        formData.append('tanggal_reservasi', dbDate || new Date().toISOString().split('T')[0]); 
        formData.append('waktu_mulai', `${startTime} - ${endTime}`); 
        formData.append('keperluan_peminjaman', purpose);

        // Peralatan ke String
        const selectedItems = equipmentList.filter(item => item.checked);
        if (selectedItems.length > 0) {
            const equipmentString = selectedItems
                .map(item => `${item.label} (${item.qty})`)
                .join(', ');
            formData.append('peralatan_tambahan', equipmentString);
        }

        formData.append('file_ktp', fileKtp);
        formData.append('file_surat_permohonan', filePermohonan);
        
        if (bookingType !== 'Umum' && filePengantar) {
            formData.append('file_surat_pengantar', filePengantar);
        }

        await api.post('/peminjaman', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        setShowSuccessModal(true);

    } catch (error) {
        console.error("Gagal submit:", error);
        setErrorMessage(error.response?.data?.message || "Gagal mengirim data.");
        setShowErrorModal(true);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-sans relative flex flex-col overflow-x-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "url('/images/pattern.jpg')", opacity: 0.5, mixBlendMode: 'multiply' }} />

      {/* Tombol Kembali */}
      <button onClick={() => navigate('/reservasi')} className="absolute top-6 left-6 md:top-10 md:left-10 p-3 rounded-full bg-white shadow-md z-50 hover:bg-gray-100 transition-transform hover:-translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
      </button>

      <main className="flex-grow relative z-10 pt-28 pb-20 px-4 md:px-0">
        <div className="max-w-[700px] mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          
          <div className="text-center mb-10 relative z-10">
            <h1 className="font-montserrat font-bold text-[32px] text-gray-800 mb-2">Formulir Peminjaman</h1>
            <p className="text-gray-500 text-sm">Lengkapi data berikut untuk mengajukan reservasi.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10">
            
            {/* === SECTION 1: DATA PEMINJAM & FASILITAS === */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#007BF7] flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <h3 className="font-urbanist font-bold text-lg text-gray-800">Data Peminjam & Fasilitas</h3>
              </div>

              {/* Nama (Read Only) */}
              <div className="space-y-2">
                <label className="block font-urbanist font-bold text-sm text-gray-700">Nama Peminjam</label>
                <input type="text" value={fullName} readOnly className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium focus:outline-none cursor-not-allowed"/>
              </div>

              {/* Nomor Telepon (Read Only) */}
              <div className="space-y-2">
                <label className="block font-urbanist font-bold text-sm text-gray-700">Nomor Telepon</label>
                <input 
                    type="text" 
                    value={phoneNumber} 
                    readOnly 
                    className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium focus:outline-none cursor-not-allowed"
                />
              </div>
              
              {/* Kategori Dropdown */}
              <div className="space-y-2 relative z-30">
                <label className="block font-urbanist font-bold text-sm text-gray-700">Kategori Peminjam <span className="text-red-500 ml-1">*</span></label>
                {openDropdown === 'type' && <div className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenDropdown(null)}></div>}
                <div className="relative z-20">
                  <button type="button" onClick={() => toggleDropdown('type')} className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-between focus:outline-none hover:border-[#007BF7] transition-colors">
                    <span>{bookingType}</span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'type' ? 'rotate-180 text-[#007BF7]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openDropdown === 'type' && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-up origin-top">
                        {['Umum', 'Kampus', 'Organisasi'].map((option) => (
                          <div key={option} onClick={() => { setBookingType(option); setOpenDropdown(null); }} className={`px-5 py-3.5 cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${bookingType === option ? 'bg-blue-50 text-[#007BF7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                            {option}
                            {bookingType === option && <svg className="w-4 h-4 text-[#007BF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>

              {/* Fasilitas (Read Only) */}
              <div className="space-y-2">
                <label className="block font-urbanist font-bold text-sm text-gray-700">Jenis Fasilitas</label>
                <input 
                    type="text" 
                    value={selectedFacility === 'AULA' ? 'Aula' : 'Lapangan'} 
                    readOnly 
                    className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium focus:outline-none cursor-not-allowed"
                />
              </div>

            </div>

            {/* === SECTION 2: DETAIL KEGIATAN === */}
            <div className="space-y-6 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#007BF7] flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <h3 className="font-urbanist font-bold text-lg text-gray-800">Detail Kegiatan & Perlengkapan</h3>
              </div>

              {/* Tanggal */}
              <div className="space-y-2">
                <label className="block font-urbanist font-bold text-sm text-gray-700">Tanggal Kegiatan <span className="text-red-500 ml-1">*</span></label>
                <div className="relative">
                    <input type="text" value={displayDate || 'Tanggal belum dipilih'} readOnly className="w-full h-[55px] pl-12 pr-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 font-medium cursor-not-allowed focus:outline-none"/>
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>

              {/* Waktu (CUSTOM DROPDOWN JAM) */}
              <div className="grid grid-cols-2 gap-4">
                 {/* Jam Mulai */}
                 <div className="space-y-2 relative z-20">
                    <label className="block font-urbanist font-bold text-sm text-gray-700">Jam Mulai <span className="text-red-500 ml-1">*</span></label>
                    {openDropdown === 'startTime' && <div className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenDropdown(null)}></div>}
                    <div className="relative z-20">
                        <button type="button" onClick={() => toggleDropdown('startTime')} className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-between focus:outline-none hover:border-[#007BF7] transition-colors">
                            <span>{startTime}</span>
                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'startTime' ? 'rotate-180 text-[#007BF7]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {openDropdown === 'startTime' && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-up origin-top max-h-60 overflow-y-auto">
                                {timeOptions.map((t) => (
                                    <div key={t} onClick={() => { setStartTime(t); setOpenDropdown(null); }} className={`px-5 py-3.5 cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${startTime === t ? 'bg-blue-50 text-[#007BF7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                                        {t}
                                        {startTime === t && <svg className="w-4 h-4 text-[#007BF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                 </div>

                 {/* Jam Selesai */}
                 <div className="space-y-2 relative z-20">
                    <label className="block font-urbanist font-bold text-sm text-gray-700">Jam Selesai <span className="text-red-500 ml-1">*</span></label>
                    {openDropdown === 'endTime' && <div className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenDropdown(null)}></div>}
                    <div className="relative z-20">
                        <button type="button" onClick={() => toggleDropdown('endTime')} className="w-full h-[55px] px-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-between focus:outline-none hover:border-[#007BF7] transition-colors">
                            <span>{endTime}</span>
                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'endTime' ? 'rotate-180 text-[#007BF7]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {openDropdown === 'endTime' && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-up origin-top max-h-60 overflow-y-auto">
                                {timeOptions.map((t) => (
                                    <div key={t} onClick={() => { setEndTime(t); setOpenDropdown(null); }} className={`px-5 py-3.5 cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${endTime === t ? 'bg-blue-50 text-[#007BF7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                                        {t}
                                        {endTime === t && <svg className="w-4 h-4 text-[#007BF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                 </div>
              </div>

              {/* Keperluan */}
              <div className="space-y-2">
                <label className="block font-urbanist font-bold text-sm text-gray-700">Tujuan / Kegiatan <span className="text-red-500 ml-1">*</span></label>
                <textarea rows="3" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full p-5 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:border-[#007BF7] focus:ring-4 focus:ring-blue-50 transition-all resize-none" placeholder="Contoh: Rapat Koordinasi"></textarea>
                {/* UPDATE: Penambahan Catatan */}
                <p className="text-xs text-gray-500 italic mt-1">
                     Mohon ceritakan secara detail mengenai kegiatan yang akan dilaksanakan, termasuk estimasi jumlah peserta dan susunan acara singkat jika ada, agar kami dapat memahami kebutuhan Anda.
                </p>
              </div>

              {/* Peralatan Tambahan */}
              <div className="space-y-3 pt-2">
                {/* UPDATE: Penghapusan tanda bintang (*) */}
                <label className="block font-urbanist font-bold text-sm text-gray-800">
                    Peralatan Tambahan (Opsional)
                </label>
                
                <div className="grid grid-cols-1 gap-3">
                    {equipmentList.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => handleToggleEquipment(item.id)} 
                            className={`flex items-center justify-between p-4 border rounded-xl transition-all cursor-pointer group ${item.checked ? 'border-[#007BF7] bg-[#F0F7FF] shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${item.checked ? 'bg-[#007BF7] border-[#007BF7]' : 'bg-white border-gray-300'}`}>
                                    {item.checked && <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                </div>
                                <span className={`font-medium text-sm ${item.checked ? 'text-[#007BF7]' : 'text-gray-700'}`}>
                                    {item.label}
                                </span>
                            </div>
                            
                            {item.checked && (
                                <div className="flex items-center gap-2 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                                    <span className="text-xs text-gray-500 font-medium">Qty:</span>
                                    <input 
                                        type="number" 
                                        min="1"
                                        value={item.qty}
                                        onChange={(e) => handleChangeQty(item.id, e.target.value)}
                                        className="w-16 h-9 px-2 text-center text-sm font-bold text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BF7] focus:ring-1 focus:ring-[#007BF7]"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* === SECTION 3: UPLOAD DOKUMEN === */}
            <div className="space-y-6 pt-8 border-t border-gray-100 mt-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#007BF7] flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <h3 className="font-urbanist font-bold text-lg text-gray-800">Unggah Dokumen Persyaratan</h3>
              </div>
              
              {/* 1. KTP */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">1. Kartu Tanda Penduduk (KTP) <span className="text-red-500">*</span></label>
                <div className="relative border border-gray-300 rounded-xl h-[55px] bg-white flex items-center overflow-hidden hover:border-[#007BF7] transition-colors group">
                    <div className="h-full bg-[#F0F7FF] text-[#007BF7] font-bold text-xs flex items-center px-6 mr-4 group-hover:bg-[#E1F0FF] transition-colors">Choose File</div>
                    <input type="file" onChange={(e) => setFileKtp(e.target.files[0])} accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                    <span className="text-sm text-gray-400 truncate">{fileKtp ? fileKtp.name : "No file chosen"}</span>
                </div>
              </div>

              {/* 2. Permohonan */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">2. Surat Permohonan <span className="text-red-500">*</span></label>
                <div className="relative border border-gray-300 rounded-xl h-[55px] bg-white flex items-center overflow-hidden hover:border-[#007BF7] transition-colors group">
                    <div className="h-full bg-[#F0F7FF] text-[#007BF7] font-bold text-xs flex items-center px-6 mr-4 group-hover:bg-[#E1F0FF] transition-colors">Choose File</div>
                    <input type="file" onChange={(e) => setFilePermohonan(e.target.files[0])} accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                    <span className="text-sm text-gray-400 truncate">{filePermohonan ? filePermohonan.name : "No file chosen"}</span>
                </div>
              </div>

              {/* 3. Pengantar */}
              {bookingType !== 'Umum' && (
                  <div className="space-y-2 animate-fade-in-up">
                    <label className="block text-sm font-bold text-gray-700">3. Surat Pengantar <span className="text-red-500">*</span></label>
                    <div className="relative border border-gray-300 rounded-xl h-[55px] bg-white flex items-center overflow-hidden hover:border-[#007BF7] transition-colors group">
                        <div className="h-full bg-[#F0F7FF] text-[#007BF7] font-bold text-xs flex items-center px-6 mr-4 group-hover:bg-[#E1F0FF] transition-colors">Choose File</div>
                        <input type="file" onChange={(e) => setFilePengantar(e.target.files[0])} accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                        <span className="text-sm text-gray-400 truncate">{filePengantar ? filePengantar.name : "No file chosen"}</span>
                    </div>
                    <p className="text-xs text-orange-500 italic mt-2 font-medium">Wajib untuk kategori {bookingType}.</p>
                  </div>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="pt-8">
                <button type="submit" disabled={isLoading} className={`w-full h-[60px] bg-gradient-to-r from-[#007BF7] to-[#005bb5] text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.01] transition-all transform active:scale-95 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Mengirim Data...</span>
                    </div>
                ) : 'Ajukan Reservasi'}
                </button>
            </div>
          </form>
        </div>
      </main>

      {/* Modal Sukses & Gagal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-10 transform transition-all animate-scale-up flex flex-col items-center text-center font-poppins">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Reservasi Berhasil!</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">Permohonan Anda telah dikirim dan menunggu konfirmasi admin.</p>
            <button onClick={handleSuccessAction} className="w-full py-3.5 bg-[#007BF7] text-white rounded-xl font-bold text-lg shadow-md hover:bg-blue-600 transition-transform active:scale-95">Lihat Status</button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowErrorModal(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-10 transform transition-all animate-scale-up flex flex-col items-center text-center font-poppins">
             <button onClick={() => setShowErrorModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Gagal Mengirim</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">{errorMessage}</p>
            <button onClick={() => setShowErrorModal(false)} className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-lg shadow-md hover:bg-red-700 transition-transform active:scale-95">Coba Lagi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationFormPage;