import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn.ts";

interface Props {
  changeTitle?: (title: string) => void;
}

const navItems = [
  {
    label: "Все олимпиады",
    path: "/olympiads/all",
  },
  {
    label: "Мои олимпиады",
    path: "/olympiads/my",
  },
  {
    label: "Рейтинг",
    path: "/olympiads/ranking",
  },
];

export const OlympiadsNavbar: React.FC<Props> = ({ changeTitle }) => {
  return (
    <div className="mb-8 flex gap-6">
      {navItems.map(({ label, path }) => (
        <NavLink
          end
          key={path}
          to={path}
          className={({ isActive }) =>
            cn(
              "text-xl font-medium leading-5 text-[--color-3] hover:text-[--color-1] transition",
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
