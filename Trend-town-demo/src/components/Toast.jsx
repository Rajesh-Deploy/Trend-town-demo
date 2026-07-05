import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-brand-neutral-900 border-brand-neutral-800 text-white';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          bgColor = 'bg-brand-neutral-950 border-emerald-500/30 text-white';
          Icon = CheckCircle;
          iconColor = 'text-emerald-500';
        } else if (toast.type === 'error') {
          bgColor = 'bg-red-950 border-red-800 text-red-100';
          Icon = AlertCircle;
          iconColor = 'text-red-500';
        } else if (toast.type === 'info') {
          bgColor = 'bg-brand-neutral-900 border-brand-neutral-700 text-brand-neutral-200';
          Icon = Info;
          iconColor = 'text-brand-accent-light';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center p-4 rounded-lg border shadow-premium animate-slide-in duration-300 transition-all ${bgColor}`}
            role="alert"
          >
            <div className="flex-shrink-0 mr-3">
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div className="flex-1 text-sm font-medium pr-2">
              {toast.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};
