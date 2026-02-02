import React from 'react';
import { useAdminLogin } from '../hooks/useAdminLogin';

import AdminLoginHeader from '../components/admin/AdminLoginHeader';
import AdminLoginForm from '../components/admin/AdminLoginForm';

const AdminLoginPage = () => {
  const { showPassword, togglePassword, handleLogin } = useAdminLogin();

  return (
    <div className="min-h-screen bg-white font-sans relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/pattern.jpg')",
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top center',
          backgroundSize: '400px',
          mixBlendMode: 'darken',
          opacity: 0.05
        }}
      />

      {/* konten */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        
        <AdminLoginHeader />
        <AdminLoginForm 
            handleLogin={handleLogin}
            showPassword={showPassword}
            togglePassword={togglePassword}
        />

      </div>
    </div>
  );
};

export default AdminLoginPage;