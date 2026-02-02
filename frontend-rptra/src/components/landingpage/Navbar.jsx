import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, isProfileOpen, setIsProfileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (path !== '/') return;

      const scrollPosition = window.scrollY + 120; 
      const sections = ['home', 'reservasi', 'galeri', 'tentang'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  // scroll helper
  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false); 

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

  const getMenuClass = (id) => {
    return activeSection === id
      ? "text-rptra-blue font-bold border-b-2 border-rptra-blue pb-1 transition-all duration-300"
      : "text-gray-500 hover:text-rptra-blue pb-1 transition-colors duration-300 border-b-2 border-transparent hover:border-rptra-blue/30";
  };
  
  const getMobileMenuClass = (id) => {
    return activeSection === id
      ? "text-rptra-blue font-bold bg-blue-50 w-full text-center py-3 rounded-lg transition-all"
      : "text-gray-600 hover:text-rptra-blue w-full text-center py-3 hover:bg-gray-50 rounded-lg transition-all";
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50 shadow-sm h-20 flex items-center">
      <div className="container mx-auto px-6 md:px-24 lg:px-32 relative flex justify-between items-center h-full">
        
        {/* logo */}
        <div className="flex items-center z-20">
          <button onClick={() => scrollToSection('home')}>
            <img src="/images/logo.jpg" alt="Logo" className="h-10 md:h-12 w-auto object-contain cursor-pointer" />
          </button>
        </div>

        {/* menu (dekstop only) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 text-sm font-poppins font-medium">
          {['home', 'reservasi', 'galeri', 'tentang'].map((item) => (
             <button key={item} onClick={() => scrollToSection(item)} className={getMenuClass(item)}>
               {item.charAt(0).toUpperCase() + item.slice(1)}
             </button>
          ))}
        </div>

        {/* hamburger (mobile only) */}
        <div className="flex items-center gap-4 z-20">
          
          <button 
            className="md:hidden text-gray-600 focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>

          {/* button profil/login  */}
          {user ? (
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                isProfileOpen ? 'border-rptra-blue scale-110 shadow-lg' : 'border-[#008C9E] shadow-md'
              }`}
            >
              <img src={user.avatar || "/images/galeri-1.jpg"} alt="Avatar" className="w-full h-full object-cover" />
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-[#008C9E] text-white px-4 md:px-6 py-2 rounded-full font-semibold text-xs md:text-sm shadow-md transition-all hover:bg-[#007a8a]">
                Masuk / Daftar
              </button>
            </Link>
          )}
        </div>

      </div>

      {/* dropdown (mobile) */}
      <div className={`absolute top-20 left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-4 px-6 space-y-2 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          {['home', 'reservasi', 'galeri', 'tentang'].map((item) => (
             <button key={item} onClick={() => scrollToSection(item)} className={getMobileMenuClass(item)}>
               {item.charAt(0).toUpperCase() + item.slice(1)}
             </button>
          ))}
      </div>

    </nav>
  );
};

export default Navbar;