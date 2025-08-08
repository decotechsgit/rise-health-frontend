"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { altform } from "@/app/fonts/altform";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { useOnboarding } from "@/contexts/onboarding-context";
import SelectedItem from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/SelectedItem";
import TextElement from "@components/shared/typography/TextElement.typo";

const GroupSelectItem = ({
  stepId,
  stepKey,
}: {
  stepId: string;
  stepKey: string;
}) => {
  const router = useRouter();
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const { onboarding, registrationGroups, setOnboarding } = useOnboarding();

  const handleRemoveItem = (id: string) => {
    const selectedGroupsSet: Set<string> = new Set();

    let completedSteps = onboarding?.progress?.completedSteps ?? [];

    if (onboarding?.progress?.registrations?.prepare_registration_select) {
      const temp =
        onboarding?.progress?.registrations?.prepare_registration_select;
      Object.keys(
        onboarding?.progress?.registrations?.prepare_registration_select
      ).forEach((key) => {
        if (temp[key] && key !== id) selectedGroupsSet.add(key);
      });
    }
    if (completedSteps.includes(stepKey) && selectedGroupsSet.size === 0) {
      completedSteps = completedSteps.filter((item) => item !== stepKey);
    }
    setOnboarding({
      ...onboarding,
      progress: {
        ...onboarding?.progress,
        checkboxes: {
          ...(onboarding?.progress?.checkboxes || {}),
          [stepId]: !(selectedGroupsSet.size === 0),
        },
        registrations: {
          ...onboarding?.progress?.registrations,
          prepare_registration_select: {
            ...(onboarding?.progress?.registrations
              ?.prepare_registration_select || {}),
            [id]: false,
          },
        },
        completedSteps: [...completedSteps],
      },
    });
  };

  useEffect(() => {
    const selectedGroupsSet: Set<string> = new Set();
    if (onboarding?.progress?.registrations?.prepare_registration_select) {
      const temp =
        onboarding?.progress?.registrations?.prepare_registration_select;
      Object.keys(
        onboarding?.progress?.registrations?.prepare_registration_select
      ).forEach((key) => {
        if (temp[key]) selectedGroupsSet.add(key);
      });
      setSelectedGroups(selectedGroupsSet);
    }
  }, [onboarding]);

  return (
    <div className="mt-8 w-auto">
      <div className="flex items-center justify-between">
        <TextElement as="h2" className={`${altform.className} lg:!text-[20px]`}>
          Registration groups
          <span
            className="ml-2 cursor-pointer text-[#F59432] underline underline-offset-2"
            onClick={() => {
              router.push(
                `${PAGES_ROUTES["onboardingRegistration"]}?stepId=${stepId}&parentKey=${stepKey}`
              );
            }}
          >
            Select
          </span>
        </TextElement>
        {selectedGroups.size > 0 && (
          <TextElement
            as="h2"
            className={`${altform.className} text-gray-700 lg:!text-[20px]`}
          >
            {selectedGroups.size} Group(s) Selected
          </TextElement>
        )}
      </div>
      <div className="h-[35vh] overflow-y-auto">
        {registrationGroups.map((group) => {
          if (selectedGroups.has(group.id)) {
            return (
              <SelectedItem
                name={group.name}
                id={group.id}
                handleRemoveItem={(id) => {
                  handleRemoveItem(id);
                }}
                key={group.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
export default GroupSelectItem;
