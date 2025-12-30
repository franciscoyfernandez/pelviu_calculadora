
import React from 'react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHowItWorks, onGoHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={onGoHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#EE8866] flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">pelvi<span className="text-[#EE8866]">U</span></span>
        </button>
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <button 
            onClick={onOpenHowItWorks}
            className="text-gray-600 hover:text-[#EE8866] transition-colors font-semibold"
          >
            ¿Cómo funciona pelviU?
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
