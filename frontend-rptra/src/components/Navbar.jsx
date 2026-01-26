import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, isProfileOpen, setIsProfileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // State untuk melacak section mana yang sedang aktif
  const [activeSection, setActiveSection] = useState('home');

  // === 1. LOGIKA SCROLL SPY (Mendeteksi posisi user) ===
  useEffect(() => {
    const handleScroll = () => {
      // Jika tidak di halaman home, jangan jalankan logika scroll spy
      if (path !== '/') return;

      const scrollPosition = window.scrollY + 120; // +120 untuk offset navbar & sedikit jarak

      // Daftar ID section yang ada di LandingPage
      const sections = ['home', 'reservasi', 'galeri', 'tentang'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          // Cek apakah scroll saat ini berada di dalam area section ini
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Jalankan sekali saat mount agar status awal benar
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  // === 2. HELPER SCROLL (Sama seperti sebelumnya) ===
  const scrollToSection = (id) => {
    setActiveSection(id); // Set manual biar instan berubah pas diklik
    
    if (path !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // === 3. HELPER CLASS UNTUK STYLE AKTIF ===
  // Ini yang bikin garis biru muncul
  const getMenuClass = (id) => {
    return activeSection === id
      ? "text-rptra-blue font-bold border-b-2 border-rptra-blue pb-1 transition-all duration-300" // Style AKTIF
      : "text-gray-500 hover:text-rptra-blue pb-1 transition-colors duration-300 border-b-2 border-transparent hover:border-rptra-blue/30"; // Style TIDAK AKTIF
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50 shadow-sm h-20 flex items-center">
      <div className="container mx-auto px-8 md:px-24 lg:px-32 relative flex justify-between items-center h-full">
        
        {/* LOGO */}
        <div className="flex items-center z-20">
          <button onClick={() => scrollToSection('home')}>
            <img src="/images/logo.jpg" alt="Logo" className="h-12 w-auto object-contain cursor-pointer" />
          </button>
        </div>

        {/* MENU TENGAH */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 text-sm font-poppins font-medium">
          
          <button 
            onClick={() => scrollToSection('home')} 
            className={getMenuClass('home')}
          >
            Home
          </button>

          <button 
            onClick={() => scrollToSection('reservasi')} 
            className={getMenuClass('reservasi')}
          >
            Reservasi
          </button>

          <button 
            onClick={() => scrollToSection('galeri')} 
            className={getMenuClass('galeri')}
          >
            Galeri
          </button>

          <button 
            onClick={() => scrollToSection('tentang')} 
            className={getMenuClass('tentang')}
          >
            Tentang
          </button>

        </div>

        {/* AVA PROFIL */}
        <div className="flex items-center z-20">
          {user ? (
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                isProfileOpen ? 'border-rptra-blue scale-110 shadow-lg' : 'border-[#008C9E] shadow-md'
              }`}
            >
              <img src={user.avatar || "/images/galeri-1.jpg"} alt="Avatar" className="w-full h-full object-cover" />
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-[#008C9E] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md transition-all hover:bg-[#007a8a]">
                Masuk / Daftar
              </button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;