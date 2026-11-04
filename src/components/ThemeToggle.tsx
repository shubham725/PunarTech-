import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-[12px] transition-all duration-300 cursor-pointer ${
        isDark
          ? 'bg-[#181818] text-white hover:bg-[#252525] border border-[#2D2D2D]'
          : 'bg-white text-[#111111] hover:bg-[#F2F2F2] border border-[#E5E5E5]'
      } ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-transform duration-300 transform">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 rotate-0 scale-100 text-white" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 rotate-0 scale-100 text-[#111111]" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-xs font-bold text-[#555555] dark:text-[#CCCCCC]">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
