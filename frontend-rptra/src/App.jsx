import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage'; // Pastikan nama import sesuai file
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
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (loggedInUser && token) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return null; 

  return (
    <Router>
      <Routes>
        
        {/* HALAMAN PUBLIK */}
        <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
        
        {/* PERBAIKAN: TAMBAHKAN ROUTE INI AGAR TIDAK BLANK */}
        <Route path="/galeri" element={<GalleryPage />} />

        <Route 
          path="/login" 
          element={
            !user ? (
              <SignInPage onLogin={handleLogin}/> 
            ) : user.role === 'Admin' ? (
              <Navigate to="/admin/dashboard" /> // Redirect ke Admin jika role Admin
            ) : (
              <Navigate to="/dashboard" />       // Redirect ke Warga jika bukan Admin
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
              {user?.role === 'Admin' ? (
                 <AdminDashboardPage user={user} onLogout={handleLogout} />
              ) : (
                 <Navigate to="/dashboard" />
              )}
            </ProtectedRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;