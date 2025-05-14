import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn.ts";
import i18n from "@/shared/i18n";

interface Props {
  changeTitle?: (title: string) => void;
}

const navItems = [
  {
    label: i18n.t("olympiadsNavbar.item1"),
    path: "/olympiads/all",
  },
  {
    label: i18n.t("olympiadsNavbar.item2"),
    path: "/olympiads/my",
  },
  {
    label: i18n.t("olympiadsNavbar.item3"),
    path: "/olympiads/ranking",
  },
];

export const OlympiadsNavbar: React.FC<Props> = ({ changeTitle }) => {
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
