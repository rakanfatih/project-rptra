import React, { useState, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAdminBookings } from '../hooks/useAdminBookings'; 
import BookingDetailModal from '../components/modals/BookingDetailModal';
import AdminSideBar from '../components/admin/AdminSideBar';
import DashboardTab from '../components/admin/tabs/DashboardTab';
import ReservationTab from '../components/admin/tabs/ReservationTab';
import CalendarTab from '../components/admin/tabs/CalendarTab';
import ReportTab from '../components/admin/tabs/ReportTab';
import CMSTab from '../components/admin/tabs/CMSTab';

const AdminDashboardPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleSessionExpired = useCallback(() => {
    alert("Sesi habis. Silakan login ulang.");
    onLogout();
    navigate('/admin/login');
  }, [onLogout, navigate]);

  const { bookings, loading, updateBookingStatus } = useAdminBookings(handleSessionExpired);

  const handleModalAction = async (id, action) => {
    const success = await updateBookingStatus(id, action);
    if (success) {
      setSelectedBooking(null);
      // alert(`Status berhasil diubah!`); 
    } else {
      alert("Gagal mengubah status.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab bookings={bookings} setActiveTab={setActiveTab} />;
      case 'reservasi':
        return (
          <ReservationTab 
            bookings={bookings} 
            loading={loading}
            onSelectBooking={setSelectedBooking}
            onUpdateStatus={updateBookingStatus} 
          />
        );
      case 'kalender':
        return <CalendarTab bookings={bookings} />;
      case 'laporan':
        return <ReportTab bookings={bookings} />;
      case 'cms':
        return <CMSTab />;
      default:
        return <DashboardTab bookings={bookings} setActiveTab={setActiveTab} />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-poppins print:bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-20 py-10">
        
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 print:hidden">
            <div>
                <h1 className="text-2xl font-bold text-rptra-dark">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Selamat datang, Administrator!</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-xs text-green-600 font-bold">● System Online</p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            {/* SIDEBAR */}
            <AdminSideBar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                totalPending={bookings.filter(b => b.status === 'Menunggu Konfirmasi' || b.status === 'Diajukan').length}
                onLogout={() => { onLogout(); navigate('/admin/login'); }}
            />

            {/* konten utama */}
            <div className="flex-1">
                {renderContent()}
            </div>
        </div>
      </div>

      {/* modal */}
      {selectedBooking && (
        <BookingDetailModal 
            booking={selectedBooking} 
            onClose={() => setSelectedBooking(null)}
            onApprove={() => handleModalAction(selectedBooking.id, 'approve')}
            onReject={() => handleModalAction(selectedBooking.id, 'reject')}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;