import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "@/shared/assets/images/sidebar-logo.svg";
import homeIcon from "@/shared/assets/icons/home.svg";
import homeworkIcon from "@/shared/assets/icons/homework.svg";
import trainingIcon from "@/shared/assets/icons/training.svg";
import olympiadIcon from "@/shared/assets/icons/olympiad.svg";
import mySpaceIcon from "@/shared/assets/icons/rocket.png";
import logoutIcon from "@/shared/assets/icons/logout.svg";
import { cn } from "@/shared/lib/cn.ts";
import { Button } from "@/shared/ui/button";
import i18n from "@/shared/i18n";
import { NavItem } from "./nav-item";

interface SidebarProps {
  small?: boolean;
}

const navItems = [
  {
    icon: homeIcon,
    label: i18n.t("sidebar.home"),
    link: "/",
  },
  {
    icon: homeworkIcon,
    label: i18n.t("sidebar.homework"),
    link: "/homework",
  },
  {
    icon: trainingIcon,
    label: i18n.t("sidebar.training"),
    link: "/training",
  },
  {
    icon: olympiadIcon,
    label: i18n.t("sidebar.olympiads"),
    link: "/olympiads",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ small }) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "flex w-[--sidebar-expanded] flex-col justify-between rounded-r-[24px] bg-gradient-to-t from-[#04151D] to-[#193C4D] px-10 py-14 shadow-[1px_-1px_1px_-0px_#657E8A]",
        small &&
          "ease-[cubic-bezier(0.7, -0.4, 0.4, 1.4)] absolute bottom-0 left-0 top-0 z-40 w-[--sidebar-collapsed] transition-all duration-300 hover:w-[--sidebar-expanded]",
      )}
    >
      {/* Логотип та назва */}
      <div className="h-[138px]">
        <img
          src={logoImage}
          alt="SpaceM Logo"
          className={cn(
            "mx-auto h-[138px] transition-all duration-300",
            small && !isHovered && "h-[64px]",
          )}
        />
      </div>

      {/* Меню */}
      <nav className="flex flex-col gap-4 text-sm">
        {navItems.map(({ link, label, icon }) => (
          <NavItem
            key={link}
            link={link}
            icon={icon}
            label={label}
            hideLabel={!!small && !isHovered}
          />
        ))}
        <NavLink to="/my-space" className="w-full mt-16">
          <Button
            className={cn(
              "h-[64px] w-full",
              small &&
                !isHovered &&
                "flex h-[64px] w-[64px] items-center justify-center px-0 py-0 lg:px-0 lg:py-0 2xl:px-0 2xl:py-0",
            )}
          >
            {small && !isHovered ? (
              <img src={mySpaceIcon} alt="" className="h-[52px] w-[52px]" />
            ) : (
              t("sidebar.mySpace")
            )}
          </Button>
        </NavLink>
      </nav>
      <div className="mt-6">
        <img className="p-4" src={logoutIcon} alt="Logout" />
      </div>
    </aside>
  );
};
