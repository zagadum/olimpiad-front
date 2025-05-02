import { useState, useRef, useEffect } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { cn } from "@/shared/lib/cn.ts";
import chevronDown from "@/shared/assets/icons/chevron-down-outline.svg";

export type Option<TValue> = {
  label?: React.ReactNode;
  value: TValue;
  icon?: string;
};

type CustomSelectProps<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
  TValue = string,
> = {
  field: ControllerRenderProps<TFormValues, TFieldName>;
  error?: FieldError;
  options: Option<TValue>[];
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export function CustomSelect<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
  TValue = string,
>({
  field,
  options,
  placeholder = "Select...",
  error,
  disabled = false,
  fullWidth = false,
  className,
}: CustomSelectProps<TFormValues, TFieldName, TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === field.value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", fullWidth && "w-full")} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex w-max items-center justify-between rounded-full border border-transparent bg-[--color-5] px-6 py-5 outline-none",
          "text-xl leading-6 text-[#F2F2F2]",
          "transition-colors hover:border-[#26F9FF]",
          !selectedOption && "font-light text-[#A5A5A5]",
          fullWidth && "w-full",
          disabled && "cursor-not-allowed opacity-70 hover:border-transparent",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
      >
        {/*{selectedOption?.icon && (*/}
        {/*  <img*/}
        {/*    src={selectedOption?.icon}*/}
        {/*    alt={selectedOption?.label || placeholder}*/}
        {/*    className="mr-2 h-5 w-5"*/}
        {/*  />*/}
        {/*)}*/}
        <span className="mr-2">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <img
          // className="pointer-events-none absolute right-4 top-5"
          className={cn(
            "pointer-events-none transform transition-transform",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          src={chevronDown}
          alt=""
        />
      </button>

      {isOpen && !disabled && (
        <div
          className={cn(
            "absolute z-10 w-max overflow-hidden rounded-3xl bg-[#0A2432] shadow-lg",
            fullWidth && "w-full",
          )}
        >
          <ul className="max-h-48 overflow-y-auto">
            {options.map((option) => {
              const { label, value, icon } = option;
              return (
                <li key={String(value)}>
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-3xl px-4 py-4 text-[20px] leading-[16px] text-white transition duration-300",
                      "hover:bg-[#071E2C] active:bg-[#071E2C]",
                      "focus:outline-none",
                    )}
                  >
                    {icon && <img src={icon} alt="" className="mr-2 h-5 w-5" />}
                    <span>{label ?? String(value)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && (
        <p className="pl-4 text-base font-light leading-6 text-[--color-error]">
          {error.message}
        </p>
      )}
    </div>
  );
}
