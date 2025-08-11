"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Registration from "@components/pages/dashboard/registration/Registration";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/registration");
  }, [router]);

  return <Registration />;
};

export default DashboardPage;
