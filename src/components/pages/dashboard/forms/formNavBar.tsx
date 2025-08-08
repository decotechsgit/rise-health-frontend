"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import NavBar from "@components/shared/form/NavBar";

interface FormNavProps {
  children?: React.ReactNode;
}

const navItems = [
  {
    id: "legislation",
    href: (formId: string) => `${PAGES_ROUTES.legislation}${formId}`,
    label: "Legislation",
  },
  {
    id: "policies_procedures",
    href: () =>
      // `/dashboard/forms-modules/policies-procedures/${formId}`,
      `${PAGES_ROUTES.policy}`,
    label: "Policies & Procedures",
  },
  {
    id: "Procedures",
    // href: (formId: string) => `/dashboard/forms-modules/forms/${formId}`,
    href: () => `${PAGES_ROUTES.procedure}`,
    label: "Forms",
  },
];

const FormNav = ({ children }: FormNavProps) => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formId = params.id as string;
  const selectedFromUrl = searchParams.get("selected") || "form";
  const isNavDisabled = searchParams.get("navDisabled") || false;
  const [selectedTab, setSelectedTab] = useState<string>(selectedFromUrl);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const currentPath =
      pathSegments.length === 5
        ? pathSegments[pathSegments.length - 2]
        : pathSegments[pathSegments.length - 1];

    let activeTab = "Procedures";

    if (currentPath === "legislation") {
      activeTab = "legislation";
    } else if (currentPath === "policies" || currentPath === "policy-detail") {
      activeTab = "policies_procedures";
    } else if (currentPath === "forms" || currentPath === "procedure") {
      activeTab = "Procedures";
    }

    setSelectedTab(activeTab);
  }, [pathname]);

  // Get the current search params as a string
  const search = searchParams.toString();

  return (
    <div>
      {
        !(isNavDisabled === "true") &&
        <NavBar
          items={navItems.map((item) => ({
            ...item,
            href: search ? `${item.href(formId)}?${search}` : item.href(formId),
          }))}
          activeItem={selectedTab}
        />
      }
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default FormNav;
