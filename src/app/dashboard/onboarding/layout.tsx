import React, { Suspense } from "react";

import { OnboardingProvider } from "@/contexts/onboarding-context";
import VerticalSidebar from "@components/pages/dashboard/onboarding/vertical-sidebar/VerticalSidebar";

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const layout: React.FC<LayoutProps> = ({ children, modal }) => {
  return (
    <OnboardingProvider>
      <div className="rounded-xl bg-white px-4 py-7 shadow">
        <div className="flex">
          <div className="hidden h-full w-[22%] lg:block">
            <Suspense fallback={""}>
              <VerticalSidebar />
            </Suspense>
          </div>
          <div className="mx-auto w-full lg:w-[76%] lg:border-l-2 lg:border-l-gray-200 lg:px-6">
            {children}
          </div>
        </div>
      </div>
      {modal}
    </OnboardingProvider>
  );
};

export default layout;
