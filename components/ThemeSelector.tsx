import React from 'react';
import { HorrorTheme } from '../types';

interface ThemeSelectorProps {
  currentTheme: HorrorTheme;
  onSelect: (theme: HorrorTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSelect }) => {
  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-4 bg-black/80 p-2 border border-gray-800 backdrop-blur-sm">
      {(Object.keys(HorrorTheme) as Array<keyof typeof HorrorTheme>).map((themeKey) => {
        const theme = HorrorTheme[themeKey];
        const isActive = currentTheme === theme;
        
        let labelColor = '';
        if (theme === HorrorTheme.NUCLEAR) labelColor = isActive ? 'text-yellow-400' : 'text-yellow-900';
        if (theme === HorrorTheme.CASSETTE) labelColor = isActive ? 'text-amber-500' : 'text-amber-900';
        if (theme === HorrorTheme.PUNK) labelColor = isActive ? 'text-red-600' : 'text-red-900';

        return (
          <button
            key={theme}
            onClick={() => onSelect(theme)}
            className={`
              relative px-6 py-2 uppercase tracking-widest font-bold transition-all duration-300
              ${labelColor}
              ${isActive ? 'border-b-2' : 'border-b border-transparent hover:text-white'}
            `}
          >
            <span className="font-vhs text-lg">{theme}</span>
            {isActive && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-current animate-ping" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
