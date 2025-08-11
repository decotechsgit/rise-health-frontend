"use client";
import { usePathname } from "next/navigation";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import NavBar from "@components/shared/form/NavBar";

interface DashboardNavProps {
  activeItem?: string;
}

const DashboardNav = ({ activeItem }: DashboardNavProps) => {
  const pathname = usePathname();
  const isRoot = pathname === "/dashboard" || pathname === "/dashboard/";

  const navItems = [
    {
      id: "registration",
      href: PAGES_ROUTES.dashboardRegistration,
      label: "Registration",
    },
    {
      id: "forms",
      href: PAGES_ROUTES.dashboardForms,
      label: "Policy Packs",
    },
    {
      id: "compliance",
      href: PAGES_ROUTES.dashboardCompliance,
      label: "Compliance",
    },
    { id: "files", href: PAGES_ROUTES.dashboardFiles, label: "Files" },
    { id: "feed", href: PAGES_ROUTES.dashboardFeed, label: "Feed" },
  ];

  const getActiveItem = () => {
    if (activeItem) return activeItem;
    if (isRoot) return "registration";

    if (pathname.includes(PAGES_ROUTES.dashboardForms)) {
      return "forms";
    }
    if (pathname.includes(PAGES_ROUTES.dashboardOnboarding)) {
      return "registration";
    }
    return navItems.find((item) => item.href === pathname)?.id || "";
  };

  return (
    <div className="w-full overflow-x-scroll rounded-2xl bg-gray-50 sm:overflow-x-auto">
      <NavBar items={navItems} activeItem={getActiveItem()} />
    </div>
  );
};

export default DashboardNav;
