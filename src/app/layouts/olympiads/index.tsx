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
      className={cn(
        "flex-1 overflow-auto px-4 py-6",
        "md:px-10 md:py-8",
        "lg:px-11 lg:py-10",
        "xl:px-14 xl:py-10",
        "2xl:px-20 2xl:py-14"
      )}
    >
      <div className="mb-6 md:mb-12">
        <h2
          className={cn(
            "text-[24px] font-bold leading-6",
            "md:text-[36px]",
            "2xl:text-[42px]",
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
