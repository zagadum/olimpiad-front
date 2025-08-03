import { useState, useRef, FC, useEffect } from "react";
import { cn } from "@/shared/lib/cn";
import chevronDown from "../../assets/icons/chevron-down.svg";

export type Value = string | number;

export interface SelectOption {
  id: string | number;
  label?: string;
  value?: Value;
  icon?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: Value;
  onChange?: (value?: Value) => void;
  placeholder?: string;
  variant?: "primary" | "secondary";
  targetClassName?: string;
  dropdownClassName?: string;
}

type OptionProps = Pick<SelectOption, "label" | "icon" | "value"> & {
  onClick: () => void;
};

const Option: FC<OptionProps> = ({ label, value, icon, onClick }) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center rounded-3xl px-3 py-2 text-sm leading-4 text-white transition duration-300",
          "md:px-3 md:py-2.5 md:text-base",
          "xl:px-4 xl:py-4 xl:text-xl xl:leading-6",
          "hover:bg-[#071E2C] active:bg-[#071E2C]",
          "focus:outline-none",
        )}
      >
        {icon && <img src={icon} alt="" className="mr-2 h-5 w-5 rounded-full object-cover" />}
        <span>{label ?? value}</span>
      </button>
    </li>
  );
};

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  variant = "primary",
  targetClassName,
  dropdownClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Знаходимо опцію, яка відповідає поточному value
  const selectedOption = options.find((opt) => opt.value === value);

  // Для закриття меню при кліку поза компонентом
  const containerRef = useRef<HTMLDivElement>(null);

  // Обробник кліку за межами компоненту
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value?: Value) => () => {
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Кнопка для відкриття списку */}
      <button
        type="button"
        onClick={toggleOpen}
        className={cn(
          "flex w-max items-center justify-between rounded-full border px-2 py-1 outline-none",
          "text-sm leading-4 text-white transition-colors text-nowrap",
          "md:px-3 md:py-2 md:text-sm",
          "lg:px-4 lg:py-3 lg:text-base",
          variant === "primary" && "border-[#0C464F] hover:border-[#26F9FF]",
          variant === "secondary" &&
            "border-[#C2721D] hover:border-[--color-2]",
          targetClassName,
        )}
      >
        <div className="flex items-center line-clamp-1">
          {selectedOption?.icon && (
            <img
              src={selectedOption?.icon}
              alt=""
              className="mr-2 h-5 w-5 rounded-full object-cover"
            />
          )}
          <span className="mr-2">
            {selectedOption
              ? (selectedOption.label ?? selectedOption.value)
              : placeholder}
          </span>
        </div>
        <img
          src={chevronDown}
          alt=""
          className={cn(
            "h-5 w-5 transform transition-transform lg:h-6 lg:w-6",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      {/* Поповер зі списком опцій */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-10 w-max rounded-3xl bg-[#0A2432] py-1 shadow-lg",
            dropdownClassName,
          )}
        >
          <ul>
            {options.map((option, index) => (
              <Option
                key={`${option.id}-${index}`}
                {...option}
                onClick={handleSelect(option.value)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
