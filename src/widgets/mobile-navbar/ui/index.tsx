import React, { useState } from "react";
import logoImage from "@/shared/assets/images/sidebar-logo.svg";
import { MenuToggle } from "./menu-toggle";
import { cn } from "@/shared/lib/cn.ts";
import { NavItem } from "@/widgets/sidebar/ui/nav-item.tsx";
import { NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import logoutIcon from "@/shared/assets/icons/logout.svg";
import { useTranslation } from "react-i18next";
import { navItems } from "@/shared/lib/constants";

export const MobileNavbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-[84px] items-center justify-between px-4">
      <img src={logoImage} alt="SpaceM Logo" className="w-[64px]" />
      <MenuToggle isOpen={isOpen} toggleOpen={toggleOpen} />
      <div
        className={
          cn(
            "box-border fixed left-0 right-0 top-[84px] z-40 h-0 w-full overflow-hidden",
            "flex justify-center items-center",
            "bg-gradient-to-b from-[#071E2C] to-[#03141B] transition-all duration-500",
            isOpen && "h-[calc(100%-84px)] bg-gradient-to-b from-[#071E2C] to-[#03141B] transition-all duration-500"
          )
        }
      >
        <div className="w-[212px] py-20 h-full flex flex-col justify-between">
          <nav className="flex flex-col gap-4 text-sm">
            {navItems.map(({ link, label, icon }) => (
              <NavItem
                key={link}
                link={link}
                icon={icon}
                label={label}
                onClick={toggleOpen}
              />
            ))}
            <NavLink to="/my-space" className="mt-16 w-full">
              <Button
                className="h-[52px] w-full text-base"
              >
                {t("sidebar.mySpace")}
              </Button>
            </NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <img className="p-4" src={logoutIcon} alt="Logout" />
            <span>{t("sidebar.logout")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
