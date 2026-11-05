import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-from-top-4 duration-300">
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-[#152227] text-zinc-950 dark:text-white rounded-[14px] shadow-2xl border border-[#E3EBE7] dark:border-[#22353D] text-xs font-['Poppins'] font-semibold">
        <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
