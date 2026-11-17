import React, { useState } from 'react';
import { Laptop } from '../data/laptops';

export interface GalleryImage {
  url: string;
  label: string;
}

interface LaptopImageProps {
  laptop: Laptop;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customSrc?: string;
  altText?: string;
}

/**
 * Returns the verified photographic asset from PunarTech uploaded photos matching laptop model
 */
export function getModelSpecificLaptopImage(laptop: Laptop): string {
  const modelLower = (laptop.model || '').toLowerCase();
  const brandLower = (laptop.brand || '').toLowerCase();
  const fullLower = (laptop.fullName || '').toLowerCase();

  // 1. Apple MacBook
  if (brandLower === 'apple' || modelLower.includes('macbook') || fullLower.includes('macbook')) {
    return '/assets/aistudio/images_045e58c0.jpg';
  }

  // 2. ASUS Gaming / Dedicated GPU
  if (
    (brandLower === 'asus' &&
      (modelLower.includes('rog') ||
        modelLower.includes('tuf') ||
        modelLower.includes('gaming') ||
        modelLower.includes('strix'))) ||
    (laptop.hasDedicatedGraphics &&
      (laptop.graphicsBrand.toLowerCase().includes('nvidia') ||
        laptop.graphicsBrand.toLowerCase().includes('geforce') ||
        laptop.graphicsBrand.toLowerCase().includes('gtx') ||
        laptop.graphicsBrand.toLowerCase().includes('rtx')))
  ) {
    return '/assets/aistudio/images_ff5e78a3.jpg';
  }

  // 3. ASUS VivoBook / ZenBook / General
  if (brandLower === 'asus') {
    if (modelLower.includes('vivobook') || modelLower.includes('x553')) {
      return '/assets/aistudio/images_45839a23.jpg';
    }
    return '/assets/aistudio/images_74108cc3.jpg';
  }

  // 4. HP EliteBook Series (Authentic Showroom Photo)
  if (modelLower.includes('elitebook') || fullLower.includes('elitebook')) {
    return '/assets/aistudio/images_588341c0.jpg';
  }

  // 5. HP ProBook Series
  if (modelLower.includes('probook') || fullLower.includes('probook')) {
    return '/assets/aistudio/images_ea786e70.jpg';
  }

  // 6. HP Pavilion / HP Notebook / HP 14 / HP 15
  if (brandLower === 'hp') {
    return '/assets/aistudio/images_a9a546f0.jpg';
  }

  // 7. Lenovo IdeaPad Series
  if (
    modelLower.includes('ideapad') ||
    fullLower.includes('ideapad') ||
    modelLower.includes('s145') ||
    modelLower.includes('320') ||
    modelLower.includes('330')
  ) {
    return '/assets/aistudio/images_a46727d6.jpg';
  }

  // 8. Lenovo ThinkPad / ThinkBook / V-Series / Lenovo General
  if (brandLower === 'lenovo') {
    return '/assets/aistudio/images_7e575f70.jpg';
  }

  // 9. Dell Latitude Business Series
  if (modelLower.includes('latitude') || fullLower.includes('latitude')) {
    return '/assets/aistudio/images_5266062b.jpg';
  }

  // 10. Dell Vostro / Dell Inspiron / Dell General
  if (brandLower === 'dell') {
    return '/assets/aistudio/images_05a7d7f8.jpg';
  }

  // 11. Acer / MSI / Modern Ultrabooks
  if (
    brandLower === 'acer' ||
    brandLower === 'msi' ||
    modelLower.includes('aspire') ||
    modelLower.includes('swift')
  ) {
    return '/assets/aistudio/images_d052c839.jpg';
  }

  // Default fallback
  return '/assets/aistudio/images_05a7d7f8.jpg';
}

/**
 * Returns available gallery photos for a given laptop model
 */
export function getLaptopGalleryImages(laptop: Laptop): GalleryImage[] {
  const modelLower = (laptop.model || '').toLowerCase();
  const brandLower = (laptop.brand || '').toLowerCase();
  const fullLower = (laptop.fullName || '').toLowerCase();

  if (brandLower === 'apple' || modelLower.includes('macbook') || fullLower.includes('macbook')) {
    return [
      { url: '/assets/aistudio/images_045e58c0.jpg', label: 'Silver Unibody Lid' },
      { url: '/assets/aistudio/images_918d95d2.jpg', label: 'Verified Unit (PunarTech)' },
    ];
  }

  if (
    (brandLower === 'asus' &&
      (modelLower.includes('rog') ||
        modelLower.includes('tuf') ||
        modelLower.includes('gaming') ||
        modelLower.includes('strix'))) ||
    (laptop.hasDedicatedGraphics &&
      (laptop.graphicsBrand.toLowerCase().includes('nvidia') ||
        laptop.graphicsBrand.toLowerCase().includes('geforce') ||
        laptop.graphicsBrand.toLowerCase().includes('rtx')))
  ) {
    return [
      { url: '/assets/aistudio/images_ff5e78a3.jpg', label: 'ROG Gaming Display' },
      { url: '/assets/aistudio/images_45839a23.jpg', label: 'Slim Silver Chassis' },
      { url: '/assets/aistudio/images_74108cc3.jpg', label: 'Vivid Display Panel' },
    ];
  }

  if (brandLower === 'asus') {
    return [
      { url: '/assets/aistudio/images_45839a23.jpg', label: 'VivoBook Display' },
      { url: '/assets/aistudio/images_74108cc3.jpg', label: 'ASUS AI Display' },
      { url: '/assets/aistudio/images_ff5e78a3.jpg', label: 'Gaming Profile' },
    ];
  }

  if (modelLower.includes('elitebook') || fullLower.includes('elitebook')) {
    return [
      { url: '/assets/aistudio/images_588341c0.jpg', label: 'Showroom Verified Unit' },
      { url: '/assets/aistudio/images_ea786e70.jpg', label: 'Windows 11 Active Screen' },
      { url: '/assets/aistudio/images_a9a546f0.jpg', label: 'Silver Profile' },
    ];
  }

  if (brandLower === 'hp') {
    return [
      { url: '/assets/aistudio/images_a9a546f0.jpg', label: 'Front Display View' },
      { url: '/assets/aistudio/images_ea786e70.jpg', label: 'Windows 11 Desktop' },
      { url: '/assets/aistudio/images_588341c0.jpg', label: 'Showroom Angle' },
    ];
  }

  if (
    modelLower.includes('ideapad') ||
    fullLower.includes('ideapad') ||
    modelLower.includes('s145') ||
    modelLower.includes('320') ||
    modelLower.includes('330')
  ) {
    return [
      { url: '/assets/aistudio/images_a46727d6.jpg', label: 'IdeaPad Display & Keyboard' },
      { url: '/assets/aistudio/images_7e575f70.jpg', label: 'Sleek Dark Chassis' },
    ];
  }

  if (brandLower === 'lenovo') {
    return [
      { url: '/assets/aistudio/images_7e575f70.jpg', label: 'Business Front View' },
      { url: '/assets/aistudio/images_a46727d6.jpg', label: 'IdeaPad Profile' },
    ];
  }

  if (modelLower.includes('latitude') || fullLower.includes('latitude')) {
    return [
      { url: '/assets/aistudio/images_5266062b.jpg', label: 'Outer Shell & Ports' },
      { url: '/assets/aistudio/images_05a7d7f8.jpg', label: 'Front Display View' },
    ];
  }

  if (brandLower === 'dell') {
    return [
      { url: '/assets/aistudio/images_05a7d7f8.jpg', label: 'Front Display View' },
      { url: '/assets/aistudio/images_5266062b.jpg', label: 'Outer Shell & Ports' },
    ];
  }

  return [
    { url: '/assets/aistudio/images_d052c839.jpg', label: 'Ultra-Slim Display' },
    { url: '/assets/aistudio/images_05a7d7f8.jpg', label: 'Front Open View' },
  ];
}

export const LaptopImage: React.FC<LaptopImageProps> = ({
  laptop,
  className = '',
  size = 'md',
  customSrc,
  altText,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imgSrc =
    customSrc ||
    (hasError ? '/assets/aistudio/images_05a7d7f8.jpg' : getModelSpecificLaptopImage(laptop));

  const aspectClass =
    size === 'sm'
      ? 'aspect-[4/3]'
      : size === 'lg'
      ? 'aspect-[4/3] sm:aspect-[16/10] max-h-72 sm:max-h-80'
      : size === 'xl'
      ? 'aspect-[4/3] sm:aspect-[16/10] max-h-80 sm:max-h-96'
      : 'aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11]';

  const padClass =
    size === 'sm'
      ? 'p-1.5 sm:p-2'
      : size === 'md'
      ? 'p-2.5 sm:p-3.5 lg:p-4'
      : 'p-4 sm:p-6';

  return (
    <div
      className={`relative w-full ${aspectClass} bg-[#F1F5F9] dark:bg-[#16212A] overflow-hidden flex items-center justify-center ${padClass} select-none ${className}`}
    >
      <img
        src={imgSrc}
        alt={altText || `${laptop.fullName} - PunarTech Stock ${laptop.stockId}`}
        loading="lazy"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#E2E8F0]/50 dark:bg-[#1E2D38]/50" />
      )}
    </div>
  );
};
