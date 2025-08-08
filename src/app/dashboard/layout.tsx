"use client";
import { usePathname } from "next/navigation";

import DashboardNav from "@components/pages/dashboard/DashboardNav";
import OnboardingCard from "@components/pages/dashboard/OnboardingCard";
import Sidebar from "@components/pages/dashboard/Sidebar";
import StatCard from "@components/pages/dashboard/StatCard";
import TopBar from "@components/pages/dashboard/TopBar";

const DashboardLayout = function ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Top Bar - Full Width */}
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Stats Section */}
          <div className="mb-6 w-full overflow-x-auto overflow-y-hidden">
            {pathname !== "/dashboard/onboarding" ? (
              <div className="grid min-w-max grid-flow-col grid-cols-[repeat(4,minmax(280px,1fr))] gap-4 pb-2 md:w-full md:min-w-0 md:grid-flow-row md:grid-cols-2 md:pb-0 lg:grid-cols-4">
                <StatCard
                  title="Overall Compliance"
                  percentage={92}
                  className="w-full border-[var(--color-compliance-green)]"
                />
                <StatCard
                  title="Documentation Quality"
                  percentage={88}
                  className="w-full border-[var(--color-documentation-orange)]"
                />
                <StatCard
                  title="Policy Adherence"
                  percentage={95}
                  className="w-full border-[var(--color-compliance-green)]"
                />
                <StatCard
                  title="Risk Management"
                  percentage={60}
                  className="w-full border-[var(--color-risk-pink)]"
                />
              </div>
            ) : (
              <div className="flex justify-between mb-6 w-full overflow-x-auto overflow-y-hidden">
                <OnboardingCard title="Create Your PRODA Account" number="01" />
                <OnboardingCard
                  title="Start Your NDIS Application"
                  number="02"
                />
                <OnboardingCard
                  title="Receive Your Scope of Audit"
                  number="03"
                />
                <OnboardingCard title="Choose an Auditor" number="04" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <DashboardNav />

          {/* Page Content */}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
