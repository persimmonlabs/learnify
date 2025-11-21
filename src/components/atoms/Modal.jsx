import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Modal Component - Atomic Design
 * Overlay dialog/modal
 */

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
};

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlay = true,
  footer,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-3xl shadow-2xl w-full animate-in zoom-in-95 fade-in',
          modalSizes[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-auto p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
