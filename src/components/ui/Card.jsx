import React from 'react';

/**
 * Card component strictly following DESIGN_SYSTEM.md Section 4.4 & 4.5
 *
 * @param {'standard' | 'feature' | 'subtle' | 'inverse'} variant
 * @param {string} className
 */
export function Card({
  children,
  variant = 'standard',
  className = '',
  as: Component = 'div',
  ...props
}) {
  let variantClasses = '';

  switch (variant) {
    case 'feature':
      variantClasses = 'bg-bg-surface border border-border rounded-lg shadow-feature p-8';
      break;
    case 'inverse':
      variantClasses = 'bg-bg-inverse text-text-on-primary rounded-lg shadow-feature p-8';
      break;
    case 'subtle':
      variantClasses = 'bg-bg-surface-subtle border border-border rounded-md shadow-card p-6';
      break;
    case 'standard':
    default:
      variantClasses = 'bg-bg-surface border border-border rounded-md shadow-card p-6';
      break;
  }

  return (
    <Component className={`${variantClasses} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export default Card;
