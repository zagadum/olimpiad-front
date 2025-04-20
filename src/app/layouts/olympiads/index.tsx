import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { OlympiadsNavbar } from "@/features/olympiads";
import { cn } from "@/shared/lib/cn.ts";

export const OlympiadsLayout: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const changeTitle = (title: string) => {
    setTitle(title);
  };
  return (
    <main
      className={cn("flex-1 overflow-auto px-20 py-12", "2xl:px-24 2xl:py-14")}
    >
      <div className="mb-12">
        <h2
          className={cn(
            "text-[36px] font-bold leading-5",
            "2xl:text-[42px] 2xl:leading-5",
          )}
        >
          {title}
        </h2>
      </div>
      <OlympiadsNavbar changeTitle={changeTitle} />
      <Outlet />
    </main>
  );
};
