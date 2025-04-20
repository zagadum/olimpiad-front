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
        "flex w-max items-center gap-2 rounded-full bg-[#0C464F] px-3 py-2 text-base text-white",
        "2xl:gap-2 2xl:px-4 2xl:py-2 2xl:text-xl",
      )}
    >
      {icon && (
        <img
          src={icon}
          alt={label}
          className={cn("h-6 w-6 rounded-full object-cover", "2xl:h-8 2xl:w-8")}
        />
      )}
      <span
        className="text-nowrap text-[--color-3]"
      >
        {label}
      </span>
    </div>
  );
};
