import React, { useState } from "react";
// import logoImage from "@/shared/assets/images/sidebar-logo.svg";
import logoImage from "@/shared/assets/images/spacem-logo.svg";
import { MenuToggle } from "./menu-toggle";
import { cn } from "@/shared/lib/cn";
import { NavItem } from "@/widgets/sidebar/ui/nav-item.tsx";
import { NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import logoutIcon from "@/shared/assets/icons/logout.svg";
import { useTranslation } from "react-i18next";
import { langOptions, platformUrl } from "@/shared/lib/constants";
import { Select } from "@/shared/ui/select";
import { getLang } from "@/shared/lib/getLang";
import { getNavItems } from "@/shared/lib/getNavItems";
import { useCurrentUserQuery } from "@/entities/auth";

export const MobileNavbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useCurrentUserQuery();

  const navItems = getNavItems(t);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-[84px] items-center justify-between px-4">
      <img src={logoImage} alt="SpaceM Logo" className="w-[64px]" />
      <MenuToggle isOpen={isOpen} toggleOpen={toggleOpen} />
      <div
        className={cn(
          "fixed left-0 right-0 top-[84px] z-40 box-border h-0 w-full overflow-y-auto overflow-x-hidden",
          "flex items-center justify-center",
          "bg-gradient-to-b from-[#071E2C] to-[#03141B] transition-all duration-500",
          isOpen &&
            "h-[calc(100%-84px)] bg-gradient-to-b from-[#071E2C] to-[#03141B] transition-all duration-500",
        )}
      >
        <div className="flex h-full w-[212px] flex-col justify-between py-20 md:py-10">
          <nav className="flex flex-col gap-4 text-sm">
            {navItems.map(({ link, label, icon }) => (
              <NavItem
                key={link[(user?.domain as keyof typeof link) || 'uk']}
                link={link[(user?.domain as keyof typeof link) || 'uk']}
                icon={icon}
                label={label}
                onClick={toggleOpen}
              />
            ))}
            <NavLink to={`${platformUrl[(user?.domain as keyof typeof platformUrl) || "uk"]}/games/platform`} className="mt-6 w-full">
              <Button className="h-[52px] w-full text-base">
                {t("sidebar.mySpace")}
              </Button>
            </NavLink>
            <Select
              targetClassName="mt-6 w-full"
              dropdownClassName="w-full"
              placeholder="UA"
              options={langOptions}
              value={lang}
              onChange={(value) => {
                if (value) {
                  i18n.changeLanguage(value as string).catch();
                }
              }}
            />
          </nav>
          <NavLink
            to={`${platformUrl[(user?.domain as keyof typeof platformUrl) || "uk"]}/logout`}
            className="flex items-center gap-4"
          >
            <img className="p-4" src={logoutIcon} alt="Logout" />
            <span>{t("sidebar.logout")}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
