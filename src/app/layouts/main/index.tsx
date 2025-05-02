import React from "react";
import { Sidebar } from "@/widgets/sidebar";
import { useLocation, Outlet } from "react-router-dom";
import { cn } from "@/shared/lib/cn.ts";
import { useCurrentUserQuery } from "@/entities/auth";

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isSmallSidebar = pathname !== "/";

  useCurrentUserQuery();

  return (
    <div
      className={cn(
        "flex h-screen bg-gradient-to-b from-[#071E2C] to-[#03141B] text-white",
        isSmallSidebar && "pl-[--sidebar-collapsed]",
      )}
    >
      <Sidebar small={isSmallSidebar} />
      <Outlet />
    </div>
  );
};
