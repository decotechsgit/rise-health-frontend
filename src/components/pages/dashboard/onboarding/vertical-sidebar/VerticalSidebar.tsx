"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import { onboardingService } from "@api/onboarding.service";
import TextElement from "@components/shared/typography/TextElement.typo";

import SidebarItem from "./SidebarItem";

const VerticalSidebar = () => {
  const [steps, setSteps] = useState<Step[] | null>(null);
  const params = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const fetchSteps = async () => {
      const data: Step[] = await onboardingService.getOnboardingSteps();
      setSteps(data);
    };
    fetchSteps();
  }, []);

  if (steps === null || steps.length <= 0) {
    return (
      <TextElement as="p" className="p-4 text-gray-500">
        Loading registration guide...
      </TextElement>
    );
  }

   const selectedStepKey = params.get("step");
  const selectedStepIndex = steps.findIndex(
    (step) => step.stepKey === selectedStepKey
  );

  return (
    <div className="ml-[5%] flex w-[80%] flex-col justify-start">
      <TextElement
        as="h2"
        className="pb-10 !text-sm font-semibold text-gray-500"
      >
        NDS Registration Guide
      </TextElement>
      {steps.map((step, index) => {
        const lastStep = index === steps.length - 1;

        const isSelected = step.stepKey === selectedStepKey;
        const highlightBorder =
          selectedStepIndex !== -1 && index <= selectedStepIndex;

        return (
          <SidebarItem
            key={step.stepKey}
            step={step}
            lastStep={lastStep}
            isSelected={isSelected}
            highlightBorder={highlightBorder}
          />
        );
      })}
      <TextElement
        as="h2"
        className={`pt-10 !text-[20px] font-semibold cursor-pointer ${selectedStepKey === "summary" ? "text-black" : "text-gray-500"}`}
        onClick={() => {
          if (selectedStepKey !== "summary") {
            router.push(PAGES_ROUTES.onboardingSummary);
          }
        }}
      >
        Summary
      </TextElement>
    </div>
  );
};

export default VerticalSidebar;
