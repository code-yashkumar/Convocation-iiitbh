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
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#231F20]/50 transition-opacity duration-modal animate-fadeIn"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Dialog Content Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-[560px] max-h-[80vh] flex flex-col bg-bg-surface rounded-md shadow-modal p-8 overflow-hidden focus:outline-none transition-all duration-modal animate-scaleIn ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
          {title && (
            <h2 id="modal-title" className="type-display-md text-text-default">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-pill text-text-muted hover:text-text-default hover:bg-maroon-050 transition-colors focus-visible:outline-none"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* Scrollable Body if content exceeds 80vh */}
        <div className="flex-1 overflow-y-auto pt-6 text-text-default font-body text-[16px] leading-[24px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
