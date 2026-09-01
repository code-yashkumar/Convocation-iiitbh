import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Button component strictly built from DESIGN_SYSTEM.md Section 5.1 & Section 10.
 *
 * @param {'primary' | 'secondary' | 'ghost'} variant - Button visual variant
 * @param {'default' | 'compact'} size - 'default' (48px height) or 'compact' (40px height)
 * @param {boolean} fullWidth - Whether button stretches full width
 * @param {React.ReactNode} iconLeft - Optional icon placed before label
 * @param {React.ReactNode} iconRight - Optional icon placed after label
 * @param {string} to - If provided, renders as React Router Link
 * @param {string} href - If provided, renders as <a> tag
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'default',
    fullWidth = false,
    iconLeft,
    iconRight,
    to,
    href,
    className = '',
    disabled = false,
    type = 'button',
    onClick,
    ...props
  },
  ref
) {
  const baseClasses = [
    'inline-flex items-center justify-center select-none font-body font-semibold transition-all duration-button focus-visible:outline-none',
    'rounded-pill border text-center',
    size === 'compact'
      ? 'min-h-[2.5rem] px-4 text-[0.875rem] leading-[1.25rem]'
      : 'min-h-[3rem] px-6 text-[1rem] leading-[1.5rem]',
    // Ensure minimum touch target requirement (44px x 44px)
    'min-w-[2.75rem]',
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
  ];

  let variantClasses = '';
  switch (variant) {
    case 'secondary':
      variantClasses =
        'bg-transparent text-action-secondary border-action-secondary hover:bg-maroon-050 active:bg-maroon-050';
      break;
    case 'ghost':
      variantClasses =
        'bg-transparent text-action-primary border-transparent hover:bg-maroon-050 hover:underline active:bg-maroon-050';
      break;
    case 'primary':
    default:
      variantClasses =
        'bg-action-primary text-text-on-primary border-transparent hover:bg-action-primary-hover active:bg-action-primary-hover';
      break;
  }

  const combinedClasses = `${baseClasses.filter(Boolean).join(' ')} ${variantClasses} ${className}`.trim();

  const content = (
    <>
      {iconLeft && <span className="inline-flex items-center mr-2" aria-hidden="true">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex items-center ml-2" aria-hidden="true">{iconRight}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link ref={ref} to={to} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a ref={ref} href={href} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
