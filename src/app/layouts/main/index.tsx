import React from "react";
import { Sidebar } from "@/widgets/sidebar";
import { useLocation, Outlet } from "react-router-dom";
import { cn } from "@/shared/lib/cn.ts";
import { useCurrentUserQuery } from "@/entities/auth";
import { useDimensions } from "@/shared/hooks";
import { MobileNavbar } from "@/widgets/mobile-navbar";

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { isMobile, isTablet } = useDimensions()
  const isSmallSidebar = pathname !== "/";

  const { isLoading } = useCurrentUserQuery();

  return (
    <div
      className={cn(
        "flex h-screen bg-gradient-to-b from-[#071E2C] to-[#03141B] text-white",
        !isMobile && !isTablet && isSmallSidebar && "pl-[--sidebar-collapsed-xs] xl:pl-[--sidebar-collapsed]",
        (isMobile || isTablet) && "flex-col"
      )}
    >
      {!isMobile && !isTablet ? <Sidebar small={isSmallSidebar} /> : <MobileNavbar />}
      {isLoading ? <div>Завантаження...</div> : <Outlet />}
    </div>
  );
};
