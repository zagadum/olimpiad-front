import { FC } from "react";
import { cn } from "@/shared/lib/cn.ts";

interface OlympiadTagProps {
  label: string;
  icon?: string;
}

export const OlympiadTag: FC<OlympiadTagProps> = ({ label, icon }) => {
  return (
    <div
      className={cn(
        "flex w-max items-center gap-1 rounded-full bg-[#0C464F] px-1.5 py-1 text-[10px] text-white",
        "md:gap-1.5",
        "lg:px-2 lg:py-1.5 lg:text-sm",
        "xl:px-3 xl:py-2 xl:text-base",
        "2xl:gap-2 2xl:px-4 2xl:py-2 2xl:text-xl",
      )}
    >
      {icon && (
        <img
          src={icon}
          alt={label}
          className={cn(
            "h-4 w-4 rounded-full object-cover",
            "lg:h-5 lg:w-5",
            "xl:h-6 xl:w-6",
            "2xl:h-8 2xl:w-8",
          )}
        />
      )}
      <span className="text-nowrap text-[--color-3]">{label}</span>
    </div>
  );
};
