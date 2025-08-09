import React from "react";
import { cn } from "@/shared/lib/cn.ts";

type CustomCheckboxProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        "flex h-8 w-8 cursor-pointer items-center justify-center",
        "rounded-xl border border-[--color-1] bg-[--color-5] transition-colors",
        disabled && "cursor-not-allowed opacity-70",
        checked && "bg-gradient-to-b from-[#26F9FF] to-[#179599]",
      )}
      onClick={() => onChange?.(!checked)}
    >
      {checked && (
        <svg
          className="h-3 w-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};
