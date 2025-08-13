"use client";

import React from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";
import { GoDotFill } from "react-icons/go";

interface MissingFieldsProps {
  step: Step;
}

const MissingFields = ({ step }: MissingFieldsProps) => {
  const { onboarding } = useOnboarding();
  const checked = onboarding?.progress?.checkboxes || {};
  const stepChildrens = step?.children || [];

  const missing = stepChildrens?.filter((child) => {
    const isChecked = checked[child?.id];
    return isChecked === false || isChecked === undefined;
  });

  return (
    <div>
      {missing?.length > 0 && (
        <TextElement as="h2" className="!text-[20px] font-[600]">
          Missing Fields
        </TextElement>
      )}
      {missing?.length > 0 ? (
        <ul className="list-disc">
          {missing?.map((child) => {
            return (
              <li
                key={child.id}
                className="mt-3 flex py-1 text-sm text-[#717171] md:text-lg lg:text-xl"
              >
                <GoDotFill className="mt-2 mr-2" size={15} />
                <span
                  className={` ${altform.className} flex-1`}
                  dangerouslySetInnerHTML={{ __html: child.title || "" }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>All fields are completed ✅</p>
      )}
    </div>
  );
};

export default MissingFields;
