import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-[#121B22] text-[#17212B] dark:text-[#F1F5F9] rounded-lg shadow-md border border-[#E2E8F0] dark:border-[#1E2D38] text-xs font-semibold">
        <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
