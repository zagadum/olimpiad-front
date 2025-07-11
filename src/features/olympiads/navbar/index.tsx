import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn.ts";
import { useTranslation } from "react-i18next";

interface Props {
  changeTitle?: (title: string) => void;
}

export const OlympiadsNavbar: React.FC<Props> = ({ changeTitle }) => {
  const { t } = useTranslation();

  const navItems = [
    {
      label: t("olympiadsNavbar.item1"),
      path: "/olympiads/all",
    },
    {
      label: t("olympiadsNavbar.item2"),
      path: "/olympiads/my",
    },
    {
      label: t("olympiadsNavbar.item3"),
      path: "/olympiads/ranking",
    },
  ];

  return (
    <div className="mb-8 flex gap-4 md:gap-6">
      {navItems.map(({ label, path }) => (
        <NavLink
          end
          key={path}
          to={path}
          className={({ isActive }) =>
            cn(
              "text-base font-medium leading-5 text-[--color-3] hover:text-[--color-1] transition",
              "md:text-xl",
              isActive && "text-[--color-1] underline",
            )
          }
        >
          {({ isActive }) => {
            if (isActive) {
              changeTitle?.(label);
            }
            return label;
          }}
        </NavLink>
      ))}
    </div>
  );
};
