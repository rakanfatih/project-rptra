import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useReservationForm = (user) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ambil data dari halaman sebelumnya
  const { facility, date } = location.state || { facility: 'AULA', date: '' };
  
  const displayDate = date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const dbDate = date ? new Date(date).toISOString().split('T')[0] : '';

  // states
  const [bookingType, setBookingType] = useState('Umum'); 
  const [selectedFacility] = useState(facility || 'AULA'); 
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [purpose, setPurpose] = useState('');

  // perlengkapan
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, label: 'Meja Lipat', checked: false, qty: 1 },
    { id: 2, label: 'Kursi Plastik', checked: false, qty: 10 },
    { id: 3, label: 'Karpet Merah', checked: false, qty: 1 },
    { id: 4, label: 'Sound System', checked: false, qty: 1 },
  ]);

  // file
  const [fileKtp, setFileKtp] = useState(null);
  const [filePermohonan, setFilePermohonan] = useState(null);
  const [filePengantar, setFilePengantar] = useState(null);

  // state UI
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // handler
  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);

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

    // validasi
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

        await api.post('/bookings', formData, {
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

  return {
    // data
    user, displayDate, selectedFacility, bookingType, startTime, endTime, purpose, equipmentList,
    fileKtp, filePermohonan, filePengantar,
    openDropdown, showSuccessModal, showErrorModal, isLoading, errorMessage,
    setBookingType, setStartTime, setEndTime, setPurpose,
    setFileKtp, setFilePermohonan, setFilePengantar,
    toggleDropdown, handleToggleEquipment, handleChangeQty,
    handleSubmit, handleSuccessAction, setShowErrorModal, setShowSuccessModal, navigate
  };
};