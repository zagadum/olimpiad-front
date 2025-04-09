import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { OlympiadsNavbar } from "@/features/olympiads";

export const OlympiadsLayout: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const changeTitle = (title: string) => {
    setTitle(title);
  };
  return (
    <main className="flex-1 overflow-auto px-24 py-14">
      <div className="mb-12">
        <h2 className="text-[42px] font-bold leading-5">{title}</h2>
      </div>
      <OlympiadsNavbar changeTitle={changeTitle} />
      <Outlet />
    </main>
  );
};
