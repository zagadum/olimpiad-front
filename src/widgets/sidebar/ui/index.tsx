import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "@/shared/assets/images/sidebar-logo.svg";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn.ts";

interface SidebarProps {
  small?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ small }) => {
  const { t } = useTranslation();
  return (
    <aside
      className={cn(
        "flex w-[--sidebar-expanded] flex-col justify-between rounded-r-[24px] bg-gradient-to-t from-[#04151D] to-[#193C4D] p-6 shadow-[1px_-1px_1px_-0px_#657E8A]",
        small &&
          "ease-[cubic-bezier(0.7, -0.4, 0.4, 1.4)] absolute bottom-0 left-0 top-0 z-40 w-[--sidebar-collapsed] transition-all duration-300 hover:w-[--sidebar-expanded]",
      )}
    >
      {/* Логотип та назва */}
      <div className="mb-6">
        <img
          src={logoImage}
          alt="SpaceM Logo"
          className="mx-auto mb-4 h-auto w-32"
        />
      </div>

      {/* Меню */}
      <nav className="flex flex-col space-y-2 text-sm">
        <Link
          to="/"
          className="rounded px-3 py-2 transition-colors hover:bg-[#1A1F25]"
        >
          {t("sidebar.home")}
        </Link>
        <Link
          to="/homework"
          className="rounded px-3 py-2 transition-colors hover:bg-[#1A1F25]"
        >
          {t("sidebar.homework")}
        </Link>
        <Link
          to="/training"
          className="rounded px-3 py-2 transition-colors hover:bg-[#1A1F25]"
        >
          {t("sidebar.training")}
        </Link>
        <Link
          to="/olympiads"
          className="rounded px-3 py-2 transition-colors hover:bg-[#1A1F25]"
        >
          {t("sidebar.olympiads")}
        </Link>
      </nav>

      <div>
        <Link
          to="/my-space"
          className="rounded px-3 py-2 transition-colors hover:bg-[#1A1F25]"
        >
          {t("sidebar.mySpace")}
        </Link>
        <Button>{!small && t("sidebar.mySpace")}</Button>
      </div>

      {/* Кнопка виходу */}
      <div className="mt-6">
        <Button>{!small && t("sidebar.logout")}</Button>
      </div>
    </aside>
  );
};
