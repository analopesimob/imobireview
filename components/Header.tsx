import React from 'react';
import { MenuIcon } from './icons';

interface HeaderProps {
    onAuthClick?: () => void;
    onHomeClick?: () => void;
	onAboutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onHomeClick, onAboutClick  }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-6 md:px-10 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={onHomeClick}>
        <div className="size-6 text-accent">
          <img src="/public/logo.png" alt="Logo" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">ImobiReview</h2>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-8 text-sm font-medium">
          <a className="text-gray-700 hover:text-primary" href="#" onClick={(e) => { e.preventDefault(); onHomeClick && onHomeClick(); }}>Home</a>
          <a className="text-gray-700 hover:text-primary" href="#" onClick={(e) => { e.preventDefault(); onAboutClick && onAboutClick(); }}>Sobre nós</a>
          <a className="text-gray-700 hover:text-primary" href="#">Contato</a>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onAuthClick}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-colors"
          >
            <span className="truncate">Log In</span>
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <button className="text-gray-800">
          <MenuIcon className="text-3xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;