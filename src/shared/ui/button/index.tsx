import { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

const baseClasses = `
    px-4
    py-3
    cursor-pointer
    rounded-full
    text-sm
    leading-4
    font-semibold
    text-white
    border-2
    transition-all
    duration-300
    ease-in-out
    hover:transition-all
    focus:outline-none
    disabled:cursor-not-allowed
    disabled:text-[#FFFFFF85]
    text-nowrap
    lg:text-sm
    lg:leading-4
    lg:px-4
    lg:py-2.5
    xl:text-base
    xl:leading-4
    xl:px-6
    xl:py-3
    2xl:border-4
    2xl:text-xl
    2xl:leading-5
    2xl:px-8
    2xl:py-3
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
    active:from-[#996517]
    active:to-[#996517]
    disabled:from-[#996917]
    disabled:to-[#996917]
  `;

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled = false,
  className,
  ...rest
}) => {
  const variantClasses = (() => {
    switch (variant) {
      case "primary":
        return primaryVariant;
      case "secondary":
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
