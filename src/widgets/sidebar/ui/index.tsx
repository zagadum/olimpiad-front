import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "@/shared/assets/images/sidebar-logo.svg";
// import mySpaceIcon from "@/shared/assets/icons/rocket.png";
import mySpaceIcon from "@/shared/assets/icons/rocket-mini.png";
import logoutIcon from "@/shared/assets/icons/logout.svg";
import { cn } from "@/shared/lib/cn.ts";
import { Button } from "@/shared/ui/button";
import { NavItem } from "./nav-item";
import { langOptions } from "@/shared/lib/constants";
import { Select } from "@/shared/ui/select";
import { getLang } from "@/shared/lib/getLang.ts";
import { getNavItems } from "@/shared/lib/getNavItems.ts";

interface SidebarProps {
  small?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ small }) => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);

  const navItems = getNavItems(t);

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
        "flex w-[--sidebar-expanded-xs] flex-col justify-between rounded-r-[24px] bg-gradient-to-t from-[#04151D] to-[#193C4D] px-6 py-6 shadow-[1px_-1px_1px_-0px_#657E8A] xl:w-[--sidebar-expanded] xl:px-12 xl:py-14",
        small &&
          "ease-[cubic-bezier(0.7, -0.4, 0.4, 1.4)] absolute bottom-0 left-0 top-0 z-40 w-[--sidebar-collapsed-xs] transition-all duration-300 hover:w-[--sidebar-expanded-xs] xl:w-[--sidebar-collapsed] xl:hover:w-[--sidebar-expanded]",
      )}
    >
      {/* Логотип та назва */}
      <div className="h-[80px] xl:h-[100px] 2xl:h-[110px]">
        <img
          src={logoImage}
          alt="SpaceM Logo"
          className={cn(
            "mx-auto h-[80px] transition-all duration-300 xl:h-[100px] 2xl:h-[110px]",
            small && !isHovered && "h-[64px]",
          )}
        />
      </div>

      {/* Меню */}
      <nav
        className={cn(
          "flex flex-col gap-2 text-sm xl:gap-4",
          small && !isHovered && "items-center",
        )}
      >
        {navItems.map(({ link, label, icon }) => (
          <NavItem
            key={link}
            link={link}
            icon={icon}
            label={label}
            hideLabel={!!small && !isHovered}
          />
        ))}
        <NavLink
          to="https://space-memory.com/games/platform"
          className="mt-4 flex w-full justify-center xl:mt-6"
        >
          <Button
            className={cn(
              "h-[64px] w-full",
              small &&
                !isHovered &&
                "flex h-[64px] w-[64px] items-center justify-center px-0 py-0 lg:px-0 lg:py-0 xl:px-0 xl:py-0 2xl:px-0 2xl:py-0",
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
      <div className="flex flex-col gap-2">
        <Select
          targetClassName={cn(
            "mt-4 lg:px-3 lg:py-2 lg:text-sm xl:px-4 xl:py-3 xl:text-base",
            isHovered && "w-full",
          )}
          dropdownClassName="w-full"
          placeholder="UA"
          options={langOptions}
          value={lang}
          onChange={(value) => {
            if (value) {
              i18n.changeLanguage(value as string).then().catch();
            }
          }}
        />
        <NavLink
          to="https://space-memory.com/logout"
          className="flex items-center"
        >
          <img className="p-4" src={logoutIcon} alt="Logout" />
          {(!small || isHovered) && <span>{t("sidebar.logout")}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
