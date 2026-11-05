import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const PunarTechLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass =
    size === 'sm'
      ? 'h-6 sm:h-7'
      : size === 'lg'
      ? 'h-7 sm:h-9 md:h-12'
      : 'h-6 sm:h-8 md:h-10';

  return (
    <div className={`flex items-center gap-2 shrink-0 ${className}`}>
      {/* Light Theme Logo */}
      <img
        src="/logo.png"
        alt="पुनरTech - PunarTech Laptops"
        className={`${heightClass} w-auto object-contain dark:hidden transition-all duration-200 select-none`}
        loading="eager"
      />
      {/* Dark Theme Logo (Transparent logo provided by user) */}
      <img
        src="/assets/aistudio/transparent_logo_1a40ff06.png"
        alt="पुनरTech - PunarTech Laptops"
        className={`${heightClass} w-auto object-contain hidden dark:block transition-all duration-200 select-none drop-shadow-[0_1px_8px_rgba(16,185,129,0.25)]`}
        loading="eager"
      />
    </div>
  );
};
