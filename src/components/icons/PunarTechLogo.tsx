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
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="dark:bg-white/95 dark:px-2 dark:py-0.5 sm:dark:px-2.5 sm:dark:py-1 rounded-lg sm:rounded-xl dark:shadow-xs transition-all duration-200 inline-flex items-center shrink-0">
        <img
          src="/logo.png"
          alt="पुनरTech - PunarTech Laptops"
          className={`${heightClass} w-auto object-contain transition-all duration-200`}
          loading="eager"
        />
      </div>
    </div>
  );
};
