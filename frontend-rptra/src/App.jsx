import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import GaleriPage from './pages/GalleryPage'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardWarga from './pages/DashboardWarga'; 
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ReservationPage from './pages/ReservationPage';
import ReservationFormPage from './pages/ReservationFormPage';

// Components
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan loading state agar tidak kedip

  // 1. Cek Login saat Refresh (Persistensi)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (loggedInUser && token) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  // 2. Handler Login & Logout
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return null; // Tunggu cek localStorage selesai

  return (
    <Router>
      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/lupa-password" element={<ForgotPasswordPage />} />

        {/* === HALAMAN LOGIN (PERBAIKAN LOGIKA REDIRECT) === */}
        <Route 
          path="/login" 
          element={
            !user ? (
              <SignInPage onLogin={handleLogin} /> 
            ) : (
              // Jika sudah login, cek role untuk redirect yang benar
              user.role === 'Admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />
            )
          } 
        />
        
        <Route 
          path="/admin/login" 
          element={
            !user ? <AdminLoginPage onLogin={handleLogin}/> : <Navigate to="/admin/dashboard" />
          } 
        />

        <Route 
          path="/daftar" 
          element={!user ? <SignUpPage /> : <Navigate to="/" />} 
        />


        {/* === PROTECTED ROUTES (Harus Login) === */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <DashboardWarga user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/reservasi" 
          element={
            <ProtectedRoute user={user}>
              <ReservationPage user={user} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reservasi/form" 
          element={
            <ProtectedRoute user={user}>
              <ReservationFormPage user={user} />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute user={user}>
              {/* Opsional: Tambahan proteksi agar user biasa tidak bisa akses admin */}
              {user?.role === 'Admin' ? (
                 <AdminDashboardPage user={user} onLogout={handleLogout} />
              ) : (
                 <Navigate to="/dashboard" />
              )}
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;