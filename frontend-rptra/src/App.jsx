import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardWarga from './pages/DashboardWarga'; 
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ReservationPage from './pages/ReservationPage';
import ReservationFormPage from './pages/ReservationFormPage';

import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  const { user, loading, handleLogin, handleLogout } = useAuth();

  if (loading) return null; 

  return (
    <Router>
      <Routes>
        
        {/* publik */}
        <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
        <Route path="/galeri" element={<GalleryPage />} />

        {/* warga (login) */}
        <Route 
          path="/login" 
          element={
            !user ? (
              <SignInPage onLogin={handleLogin}/> 
            ) : user.role === 'Admin' ? (
              <Navigate to="/admin/dashboard" /> 
            ) : (
              <Navigate to="/dashboard" />       
            )
          } 
        />
        
        {/* admin */}
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

        {/* harus login */}
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

        <Route path="*" element={<Navigate to="/" />} />
          <Route path="/lupa-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;