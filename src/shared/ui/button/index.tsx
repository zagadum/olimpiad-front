import { FC, ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const baseClasses = `
    px-6
    py-2
    rounded-full
    text-base
    leading-4
    font-semibold
    text-white
    border-4
    transition-all
    duration-300
    ease-in-out
    hover:transition-all
    focus:outline-none
    disabled:cursor-not-allowed
    disabled:text-[#FFFFFF85]
    text-nowrap
    lg:text-xl
    lg:leading-5
    lg:px-11
    lg:py-4
  `;

const primaryVariant = `
    bg-gradient-to-b
    from-[#26F9FF]
    to-[#179599]
    border-[#1DBDC2]
    hover:from-[#179599]
    hover:to-[#26F9FF]
    active:from-[#19A0A3]
    active:to-[#19A0A3]
    disabled:from-[#19A0A3]
    disabled:to-[#19A0A3]
  `;

const secondaryVariant = `
    bg-gradient-to-b
    from-[#FF9A26]
    to-[#996517]
    border-[#C2721D]
    hover:from-[#996517]
    hover:to-[#FF9A26]
    active:from-[#19A0A3]
    active:to-[#19A0A3]
    disabled:from-[#19A0A3]
    disabled:to-[#19A0A3]
  `;

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  className,
  ...rest

}) => {
  const variantClasses = (() => {
    switch (variant) {
      case 'primary':
        return primaryVariant;
      case 'secondary':
        return secondaryVariant;
      default:
        return primaryVariant;
    }
  })();

  return (
    <button
      type="button"
      className={cn(baseClasses, variantClasses, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
