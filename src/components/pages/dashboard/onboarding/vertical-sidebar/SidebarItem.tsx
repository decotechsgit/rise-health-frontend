"use client";

import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";
import React from "react";

import { altform } from "@/app/fonts/altform";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { useOnboarding } from "@/contexts/onboarding-context";
import TextElement from "@components/shared/typography/TextElement.typo";

const SidebarItem = ({
  step,
  lastStep,
  isSelected,
  highlightBorder,
}: {
  step: Step;
  lastStep: boolean;
  isSelected: boolean;
  highlightBorder: boolean;
}) => {
  const router = useRouter();
  const { onboarding } = useOnboarding();

  const handleClick = (stepKey: string) => {
    router.push(`${PAGES_ROUTES.dashboardOnboarding}?step=${stepKey}`);
  };

  const isCompleted =
    onboarding?.progress?.completedSteps?.includes(step.stepKey) ?? false;
  const title = DOMPurify.sanitize(step.title);

  return (
    <div key={step.stepKey} className="relative mx-auto w-full">
      <div className="flex w-full justify-between py-4 pt-0">
        {!lastStep && (
          <div
            className={`${highlightBorder ? "bg-black" : "bg-gray-400"} absolute top-5 left-[14px] -ml-px h-full w-0.5`}
          />
        )}
        <div
          className={`${isSelected ? "border-black" : "border-gray-400"} ${isCompleted ? "!border-[#FABA5E] bg-[#FABA5E]" : "bg-white"} z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border-2`}
        >
          <TextElement
            as="span"
            className={` ${isSelected ? "text-black" : "text-gray-400"} ${altform.className}`}
          >
            {isCompleted ? (
              step.order
            ) : (
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6.3537L2.33833 7.7887C3.07667 8.58036 3.44583 8.97537 3.85917 9.10037C4.2225 9.20953 4.60917 9.18036 4.955 9.01703C5.34917 8.83036 5.665 8.38286 6.29833 7.48703L11 0.832031"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </TextElement>
        </div>
        <TextElement
          as="h2"
          className={`${isSelected ? "text-black" : "text-gray-400"} w-[80%] cursor-pointer !text-[20px] text-wrap ${altform.className}`}
          onClick={() => {
            handleClick(step.stepKey);
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </TextElement>
      </div>
    </div>
  );
};

export default SidebarItem;
