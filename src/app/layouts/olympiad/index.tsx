import { FC } from "react";
import { Outlet } from "react-router-dom";

export const OlympiadLayout: FC = () => {
  return (
    <main className="flex-1 overflow-auto px-24 py-14">
      <Outlet />
    </main>
  );
};
