import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServiceSection from '../components/ServiceSection';
import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        isProfileOpen={isProfileOpen} 
        setIsProfileOpen={setIsProfileOpen} 
      />

      {/* Blur */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${
          user && isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsProfileOpen(false)} 
      ></div>

      {/* Menu */}
      {user && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 z-[60] transition-all duration-300 ease-in-out ${isProfileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5 pointer-events-none'}`}>
           <div className="bg-[#008C9E] rounded-xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between border border-white/20 backdrop-blur-sm relative overflow-hidden">
             
             {/* KONTEN MENU */}
             <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "url('/images/pattern.jpg')", backgroundRepeat: 'repeat', backgroundSize: '300px' }}></div>
             <div className="flex flex-col items-center z-10 mb-4 md:mb-0 w-full md:w-auto justify-center">
                <div className="relative mb-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 overflow-hidden shadow-lg shrink-0">
                        <img src={user.avatar || "/images/galeri-1.jpg"} alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                    <Link to="/dashboard" state={{ tab: 'pengaturan' }}>
                        <div className="absolute -bottom-1 -right-1 cursor-pointer transition-transform duration-500 hover:rotate-180 hover:scale-110 active:scale-95 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white filter drop-shadow-md group-hover:text-yellow-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </div>
                    </Link>
                </div>
                <div className="text-white text-center z-10 relative"><h3 className="font-bold font-poppins text-sm leading-tight tracking-wide drop-shadow-md">Profile</h3></div>
             </div>
             
             <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto z-10 justify-center items-center">
                <Link to="/dashboard" className="w-full md:w-auto"><div className="w-full md:w-auto bg-transparent hover:bg-[#005f6b] text-white/90 hover:text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 border border-transparent hover:border-[#004d57] hover:shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg><span className="font-poppins text-xs font-medium">Dashboard</span></div></Link>
                <Link to="/dashboard" state={{ tab: 'pengaturan' }} className="w-full md:w-auto"><div className="w-full md:w-auto bg-transparent hover:bg-[#005f6b] text-white/90 hover:text-white px-6 py-3 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 rounded-lg border border-transparent hover:border-[#004d57] hover:shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span className="font-poppins text-xs font-medium">Pengaturan</span></div></Link>
                <Link to="/dashboard" state={{ tab: 'riwayat' }} className="w-full md:w-auto"><div className="w-full md:w-auto bg-transparent hover:bg-[#005f6b] text-white/90 hover:text-white px-6 py-3 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 rounded-lg border border-transparent hover:border-[#004d57] hover:shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="font-poppins text-xs font-medium">Riwayat</span></div></Link>
             </div>

             <div className="flex items-center gap-3 z-10 mt-4 md:mt-0 opacity-100 w-full md:w-auto justify-center md:justify-end">
                <img src="/images/logo.jpg" alt="Logo" className="h-10 w-auto rounded shadow-sm mix-blend-screen brightness-150" />
                <div className="text-white text-right leading-none drop-shadow-md"><h2 className="font-bold text-sm">Lenteng <br/> Agung</h2></div>
             </div>
          </div>
        </div>
      )}

      <section id="home" className="scroll-mt-20">
        <HeroSection user={user} isProfileOpen={isProfileOpen} />
      </section>
      
      <section id="reservasi" className="scroll-mt-20">
        <ServiceSection user={user}/>
      </section>

      <section id="galeri" className="scroll-mt-20">
        <GallerySection />
      </section>

      <section id="tentang" className="scroll-mt-20">
        <Footer />
      </section>
    </>
  );
};

export default LandingPage;