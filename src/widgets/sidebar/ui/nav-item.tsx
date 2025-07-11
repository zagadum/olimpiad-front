import { FC } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn.ts";
import { useDimensions } from "@/shared/hooks";

interface NavItemProps {
  icon: string;
  label: string;
  link: string;
  hideLabel?: boolean;
  onClick?: () => void;
}

export const NavItem: FC<NavItemProps> = ({
  icon,
  label,
  link,
  hideLabel,
  onClick,
}) => {
  const { isMobile, isTablet } = useDimensions();
  return (
    <NavLink
      to={link}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 xl:px-4 xl:py-4",
          "hover:bg-gradient-to-t hover:from-[#1F4258] hover:to-[#24566F] hover:shadow-[-3px_0px_0px_0px_#26F9FF]",
          hideLabel && "w-[64px] gap-0",
          isActive &&
            "rounded-2xl bg-gradient-to-t from-[#1F4258] to-[#24566F] shadow-[-3px_0px_0px_0px_#26F9FF]",
          (isMobile || isTablet) && "px-3 py-3.5",
        )
      }
    >
      <img src={icon} alt=""></img>
      <span
        className={cn(
          "inline-block w-full overflow-hidden text-xl transition-all duration-300",
          hideLabel && "w-0",
        )}
      >
        {label}
      </span>
    </NavLink>
  );
};
