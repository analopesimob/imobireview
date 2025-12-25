import React, { useState, useRef, useEffect } from 'react';
import { LogoIcon } from './icons';
import { Menu } from "lucide-react";

interface HeaderProps {
    onAuthClick?: () => void;
    onHomeClick?: () => void;
    onAboutClick?: () => void;
    onContactClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onHomeClick, onAboutClick, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    // Ativa o menu ao passar o mouse apenas na visão mobile/tablet onde o menu é visível
    if (window.innerWidth < 1024) {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setIsMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) {
        timeoutRef.current = window.setTimeout(() => {
          setIsMenuOpen(false);
        }, 300);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-6 md:px-10 bg-white/95 backdrop-blur-md sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center text-primary cursor-pointer group" onClick={onHomeClick}>
        <div className="size-16 text-accent">
          <img src="logo.png" alt="Logo" className=""/> 
        </div>
        <h2 className="text-xl font-bold tracking-tight">ImobiReview</h2>
      </div>

      {/* Desktop Navigation (Visível apenas em telas grandes - lg) */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
        <a className="text-gray-600 hover:text-primary transition-all py-2 relative group" href="#" onClick={(e) => { e.preventDefault(); onHomeClick && onHomeClick(); }}>
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
        </a>
        <a className="text-gray-600 hover:text-primary transition-all py-2 relative group" href="#" onClick={(e) => { e.preventDefault(); onAboutClick && onAboutClick(); }}>
          Sobre Nós
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
        </a>
        <a className="text-gray-600 hover:text-primary transition-all py-2 relative group" href="#" onClick={(e) => { e.preventDefault(); onContactClick && onContactClick(); }}>
          Contato
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
        </a>
      </nav>

      {/* Botões de Ação e Toggle de Menu Mobile */}
      <div className="flex items-center gap-4">
        {/* Desktop Auth (Visível apenas em lg) */}
        <div className="hidden lg:flex items-center gap-3">
            <button 
                onClick={onAuthClick}
                className="px-5 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-[#0f3461] transition-all shadow-md active:scale-95"
            >
                Cadastrar
            </button>
        </div>

        {/* Mobile Hamburger (Escondido em lg) */}
        <div 
          className="lg:hidden relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            onClick={toggleMenu}
            className={`p-2.5 rounded-xl transition-all duration-300 ${isMenuOpen ? 'bg-primary text-white shadow-lg rotate-90' : 'text-primary hover:bg-gray-100'}`}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Dropdown Menu com leve cor de fundo */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-[#F8FAFC] backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl py-4 overflow-hidden animate-slideDown z-50">
              <div className="px-6 py-2 border-b border-gray-100 mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Acesso Rápido</span>
              </div>
              
              <div className="flex flex-col">
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onHomeClick && onHomeClick(); setIsMenuOpen(false); }}
                    className="px-6 py-4 text-sm font-bold text-gray-700 hover:bg-primary hover:text-white transition-all flex items-center gap-4 group"
                >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
                    Home
                </a>
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onAboutClick && onAboutClick(); setIsMenuOpen(false); }}
                    className="px-6 py-4 text-sm font-bold text-gray-700 hover:bg-primary hover:text-white transition-all flex items-center gap-4 group"
                >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
                    Sobre Nós
                </a>
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onContactClick && onContactClick(); setIsMenuOpen(false); }}
                    className="px-6 py-4 text-sm font-bold text-gray-700 hover:bg-primary hover:text-white transition-all flex items-center gap-4 group"
                >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
                    Contato
                </a>
              </div>

              <div className="mx-6 my-4 border-t border-gray-200 pt-5">
                  <button 
                    onClick={() => { onAuthClick && onAuthClick(); setIsMenuOpen(false); }}
                    className="w-full bg-accent text-primary font-bold py-3.5 rounded-xl hover:bg-[#76bc84] transition-colors text-sm shadow-sm"
                  >
                    Criar Conta
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;