import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  forceTheme?: 'light' | 'dark';
}

export const PunarTechLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  forceTheme,
}) => {
  const [lightErr, setLightErr] = useState(false);
  const [darkErr, setDarkErr] = useState(false);

  const lightSrc = lightErr ? '/logo.png' : '/logo-cropped.png';
  const darkSrc = darkErr
    ? '/assets/aistudio/transparent_logo_1a40ff06.png'
    : '/logo-dark-cropped.png';

  // Tuned height and max-width across Mobile (<640px), Tablet (640-1023px), and Laptop (1024px+)
  const responsiveSizeClass =
    size === 'sm'
      ? 'h-7 sm:h-8 max-w-[132px] sm:max-w-[155px]'
      : size === 'lg'
      ? 'h-9 sm:h-10 lg:h-12 max-w-[165px] sm:max-w-[195px] lg:max-w-[230px]'
      : 'h-7 sm:h-8 lg:h-9 max-w-[126px] sm:max-w-[160px] lg:max-w-[185px]';

  if (forceTheme === 'dark') {
    return (
      <div className={`inline-flex items-center shrink-0 min-w-0 ${className}`}>
        <img
          src={darkSrc}
          alt="PunarTech"
          onError={() => setDarkErr(true)}
          className={`${responsiveSizeClass} w-auto object-contain object-left brightness-110 contrast-105 select-none`}
          loading="eager"
        />
      </div>
    );
  }

  if (forceTheme === 'light') {
    return (
      <div className={`inline-flex items-center shrink-0 min-w-0 ${className}`}>
        <img
          src={lightSrc}
          alt="PunarTech"
          onError={() => setLightErr(true)}
          className={`${responsiveSizeClass} w-auto object-contain object-left select-none`}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center shrink-0 min-w-0 ${className}`}>
      <img
        src={lightSrc}
        alt="PunarTech"
        onError={() => setLightErr(true)}
        className={`${responsiveSizeClass} w-auto object-contain object-left dark:hidden select-none`}
        loading="eager"
      />
      <img
        src={darkSrc}
        alt="PunarTech"
        onError={() => setDarkErr(true)}
        className={`${responsiveSizeClass} w-auto object-contain object-left hidden dark:block brightness-110 contrast-105 select-none`}
        loading="eager"
      />
    </div>
  );
};
