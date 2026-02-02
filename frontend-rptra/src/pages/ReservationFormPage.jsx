import React from 'react';
import { useReservationForm } from '../hooks/useReservationForm';

import ReservationSectionOne from '../components/reservation/ReservationSectionOne';
import ReservationSectionTwo from '../components/reservation/ReservationSectionTwo';
import ReservationSectionThree from '../components/reservation/ReservationSectionThree';
import ReservationModals from '../components/reservation/ReservationModals';

const ReservationFormPage = ({ user }) => {
  
  const {
    // Data
    displayDate, selectedFacility, bookingType, startTime, endTime, purpose, equipmentList,
    fileKtp, filePermohonan, filePengantar,
    // UI
    openDropdown, showSuccessModal, showErrorModal, isLoading, errorMessage,
    // Setters
    setBookingType, setStartTime, setEndTime, setPurpose,
    setFileKtp, setFilePermohonan, setFilePengantar,
    // Handlers
    toggleDropdown, handleToggleEquipment, handleChangeQty,
    handleSubmit, handleSuccessAction, setShowErrorModal, navigate
  } = useReservationForm(user);

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-sans relative flex flex-col overflow-x-hidden">
      
      {/* background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "url('/images/pattern.jpg')", opacity: 0.5, mixBlendMode: 'multiply' }} />

      {/* button back */}
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
            
            <ReservationSectionOne 
                user={user}
                bookingType={bookingType}
                setBookingType={setBookingType}
                selectedFacility={selectedFacility}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
            />

            <ReservationSectionTwo 
                displayDate={displayDate}
                startTime={startTime} setStartTime={setStartTime}
                endTime={endTime} setEndTime={setEndTime}
                purpose={purpose} setPurpose={setPurpose}
                equipmentList={equipmentList}
                handleToggleEquipment={handleToggleEquipment}
                handleChangeQty={handleChangeQty}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
            />

            <ReservationSectionThree 
                bookingType={bookingType}
                fileKtp={fileKtp} setFileKtp={setFileKtp}
                filePermohonan={filePermohonan} setFilePermohonan={setFilePermohonan}
                filePengantar={filePengantar} setFilePengantar={setFilePengantar}
            />

            {/* button submit */}
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

      {/* modal */}
      <ReservationModals 
          showSuccessModal={showSuccessModal}
          handleSuccessAction={handleSuccessAction}
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          errorMessage={errorMessage}
      />
    </div>
  );
};

export default ReservationFormPage;