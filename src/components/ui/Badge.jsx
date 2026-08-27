import React from 'react';

/**
 * Badge / Tag component
 *
 * @param {'maroon' | 'gold' | 'neutral' | 'success' | 'error'} variant
 * @param {string} className
 */
export function Badge({
  children,
  variant = 'maroon',
  className = '',
  ...props
}) {
  let variantClasses = '';

  switch (variant) {
    case 'gold':
      // Gold is decorative only as per Section 2.3
      variantClasses = 'bg-gold-500/15 text-charcoal-900 border border-gold-500/30';
      break;
    case 'neutral':
      variantClasses = 'bg-cream-050 text-charcoal-600 border border-border';
      break;
    case 'success':
      variantClasses = 'bg-emerald-50 text-success border border-success/20';
      break;
    case 'error':
      variantClasses = 'bg-red-50 text-error border border-error/20';
      break;
    case 'maroon':
    default:
      variantClasses = 'bg-maroon-050 text-maroon-900 border border-maroon-900/10';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-sm type-label tracking-wide font-medium ${variantClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
