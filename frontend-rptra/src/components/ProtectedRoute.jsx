import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  // Cek apakah user object ada (dari state App.js)
  // Atau cek token di localStorage sebagai backup
  const isAuthenticated = user || localStorage.getItem('token');

  if (!isAuthenticated) {
    // Jika tidak login, redirect ke halaman Login
    // replace: agar user tidak bisa back ke halaman ini
    return <Navigate to="/masuk" replace />;
  }

  // Jika login, tampilkan halaman yang diminta (children)
  return children;
};

export default ProtectedRoute;