"use client";
import { X } from "lucide-react";
import {  useRouter } from "next/navigation";
import { Suspense } from "react";

import { altform } from "@/app/fonts/altform";
import { useOnboarding } from "@/contexts/onboarding-context";
import RegistrationGroupsTable from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/RegistrationGroupsTable";
import Button from "@components/shared/button";
import TextElement from "@components/shared/typography/TextElement.typo";
import RegistrationGroupsTableSkeleton from "@components/skeletons/onboaring/RegistrationGroupsTableSkeleton";

const RegistrationGroupsModal = () => {
  const router = useRouter();
  const { registrationGroups } = useOnboarding();

  const handleClick = () => {
    router.back();
  };

  if (registrationGroups.length <= 0) {
    return (
      <div className="absolute top-0 left-0 z-20 h-[100vh] w-[100%] bg-[rgba(0,0,0,0.5)] p-6">
        <section className="absolute top-0 right-0 h-[100vh] w-[66%] bg-white">
          <RegistrationGroupsTableSkeleton />
        </section>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 z-20 h-[100vh] w-[100%] bg-[rgba(0,0,0,0.5)] p-6">
      <section className="absolute top-0 left-0 h-[100vh] w-full bg-white lg:right-0 lg:left-auto lg:w-[66%]">
        <div className="flex h-[100px] items-center justify-between bg-[#E0E3E7] px-6">
          <TextElement
            className={`${altform.className} !text-[16px] !text-[#1E1F21] lg:!text-[24px]`}
          >
            Select your registration groups.
          </TextElement>
          <X className="text-[#1E1F21]" onClick={handleClick} />
        </div>
        <div className="mb-24 h-[79%] overflow-y-auto py-6">
          <Suspense fallback={"loading groups..."}>
            <RegistrationGroupsTable
              data={registrationGroups}
              itemsPerPage={6}
            />
          </Suspense>
        </div>
        <div className="absolute right-10 bottom-7 flex justify-end">
          <Button
            title={"Cancel"}
            className="mx-2 !rounded-md !border-[#E0E3E7] !bg-[#E0E3E7] !px-4 md:!w-[109px] md:!px-0"
            btnClassName={`md:!text-[20px] ${altform.className}`}
            handleOnClick={handleClick}
          />
          <Button
            title={"Save"}
            className="!rounded-md !px-4 md:!w-[109px] md:!px-0"
            btnClassName={`md:!text-[20px] ${altform.className}`}
            handleOnClick={handleClick}
          />
        </div>
      </section>
    </div>
  );
};
export default RegistrationGroupsModal;
