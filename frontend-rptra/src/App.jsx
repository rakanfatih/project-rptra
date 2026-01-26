import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
// Pastikan nama file ini sesuai dengan yang kamu buat (GalleryPage.jsx atau GaleriPage.jsx)
import GaleriPage from './pages/GalleryPage'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardWarga from './pages/DashboardWarga'; 

// === TAMBAHKAN IMPORT INI ===
import ReservationPage from './pages/ReservationPage';
import ReservationFormPage from './pages/ReservationFormPage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log("Login Berhasil:", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
        <Route path="/dashboard" element={<DashboardWarga user={user} onLogout={handleLogout} />} />
        
        {/* Pastikan path ini sesuai dengan nama file kamu */}
        <Route path="/galeri" element={<GaleriPage />} />
        
        <Route path="/login" element={<SignInPage onLogin={handleLogin} />} />
        <Route path="/daftar" element={<SignUpPage />} />
        <Route path="/lupa-password" element={<ForgotPasswordPage />} />
        
        {/* Rute Baru untuk Reservasi */}
        <Route path="/reservasi" element={<ReservationPage user={user} />} />
        <Route path="/reservasi/form" element={<ReservationFormPage user={user} />} />

      </Routes>
    </Router>
  );
}

export default App;