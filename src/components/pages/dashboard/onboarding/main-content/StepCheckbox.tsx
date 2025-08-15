"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

import { useOnboarding } from "@/contexts/onboarding-context";

type StepCheckboxProps = {
  stepId: string;
  className?: string;
  disabled?: boolean;
};

const StepCheckbox = ({
  stepId,
  className,
  disabled = false,
}: StepCheckboxProps) => {
  const { onboarding, setOnboarding, allSteps } = useOnboarding();
  const searchParams = useSearchParams();
  const currentStepKey = searchParams.get("step") as string;
  const isChecked = onboarding?.progress?.checkboxes?.[stepId] ?? false;

  const handleChange = () => {
    const currentStep = allSteps?.find((v) => v?.stepKey === currentStepKey);
    const currentStepChildrenIds =
      currentStep?.children?.map((v) => v?.id) ?? [];
    const checkedIds = {
      ...onboarding?.progress?.checkboxes,
      [stepId]: !isChecked,
    };

    const hasAnyUnchecked = currentStepChildrenIds.some(
      (id) => checkedIds?.[id] !== true
    );

    if (onboarding && !disabled) {
      let completedSteps = onboarding.progress?.completedSteps ?? [];

      if (hasAnyUnchecked) {
        completedSteps = completedSteps.filter(
          (item) => item !== currentStepKey
        );
      } else {
        if (!completedSteps.includes(currentStepKey)) {
          completedSteps.push(currentStepKey);
        }
      }

      const obj = {
        ...onboarding,
        progress: {
          ...onboarding.progress,
          checkboxes: checkedIds,
          completedSteps,
        },
      };

      setOnboarding(obj);
    }
  };

  return (
    <div className={`flex-shrink-0 pt-0.5 ${className}`}>
      <label className="flex cursor-pointer flex-row items-center gap-2.5 text-black">
        <input
          type="checkbox"
          className="peer hidden"
          disabled={disabled}
          checked={isChecked}
          onChange={handleChange}
        />

        <div
          className={`flex h-6 w-6 items-center justify-center rounded transition ${
            isChecked ? "bg-[#FABA5E]" : "border border-black bg-white"
          }`}
        >
          {isChecked && (
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12.6111L8.92308 17.5L20 6.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </label>
    </div>
  );
};

export default StepCheckbox;
