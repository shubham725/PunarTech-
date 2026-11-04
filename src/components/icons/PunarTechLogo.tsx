import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const PunarTechLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass =
    size === 'sm'
      ? 'h-7 sm:h-8'
      : size === 'lg'
      ? 'h-10 sm:h-12 md:h-14'
      : 'h-8 sm:h-10 md:h-11';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="dark:bg-white/95 dark:px-2.5 dark:py-1 dark:rounded-xl dark:shadow-xs transition-all duration-200 inline-flex items-center">
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
