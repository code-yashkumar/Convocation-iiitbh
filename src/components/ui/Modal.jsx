import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Modal Dialog component conforming to DESIGN_SYSTEM.md Section 5.8 & Section 6
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} title
 * @param {string} ariaLabel
 * @param {React.ReactNode} children
 */
export function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
  className = '',
}) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store element that had focus before modal opened
      previousActiveElement.current = document.activeElement;
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';

      // Focus first focusable element or modal container
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      // Restore focus
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Trap focus & listen to Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-label={!title ? (ariaLabel || 'Dialog') : undefined}
    >
      {/* Apple Frosted Scrim Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-modal animate-fadeIn"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Dialog Content Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-[36rem] max-h-[85vh] flex flex-col bg-bg-surface rounded-[1.5rem] sm:rounded-[1.75rem] border border-[#E8E2D8] shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-6 sm:p-8 overflow-hidden focus:outline-none transition-all duration-modal animate-scaleIn ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
          {title && (
            <h2 id="modal-title" className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 tracking-tight leading-snug">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex items-center justify-center w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-maroon-050/80 active:scale-95 transition-all focus-visible:outline-none cursor-pointer shrink-0"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable Body if content exceeds max-height */}
        <div className="flex-1 overflow-y-auto pt-5 text-charcoal-800 font-body text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
