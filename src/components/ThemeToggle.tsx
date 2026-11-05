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
          ? 'bg-[#152227] text-[#34D399] hover:bg-[#1B2B32] border border-[#22353D] shadow-xs'
          : 'bg-white text-[#007A52] hover:bg-[#E8F7EE] border border-[#E3EBE7] shadow-xs'
      } ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-transform duration-300 transform">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 rotate-0 scale-100 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 rotate-0 scale-100 text-[#007A52]" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
