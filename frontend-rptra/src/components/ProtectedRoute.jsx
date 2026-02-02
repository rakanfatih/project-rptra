import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  // user ada? (app.js)
  const isAuthenticated = user || localStorage.getItem('token');

  if (!isAuthenticated) {
    // kalau belum login, redirect ke signinpage
    return <Navigate to="/masuk" replace />;
  }

  return children;
};

export default ProtectedRoute;