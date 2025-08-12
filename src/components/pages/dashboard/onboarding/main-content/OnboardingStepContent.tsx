"use client";
import DOMPurify from "isomorphic-dompurify";
import React, { use, useMemo } from "react";

import OnboardingActions from "@components/pages/dashboard/onboarding/main-content/OnboardingActions";
import OnboardingTips from "@components/pages/dashboard/onboarding/main-content/OnboardingTips";
import CheckboxItem from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/CheckboxItem";
import FileUploadItem from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/FileUploadItem";
import GroupSelectItem from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/GroupSelectItem";
import VideoPlayer from "@components/pages/dashboard/onboarding/main-content/VideoPlayer";
import TextElement from "@components/shared/typography/TextElement.typo";
import OnboardingPageSkeleton from "@components/skeletons/onboaring/OnboardingPageSkeleton";
import AuditStep from "../AuditSteps";

type OnboardingContentProps = {
  stepKey: string;
  onboardingStepPromise: Promise<Step>;
  onboardingContentPromise: Promise<Step[]>;
};

const OnboardingContent = ({
  stepKey,
  onboardingStepPromise,
  onboardingContentPromise,
}: OnboardingContentProps) => {
  const onboardingSteps = use(onboardingContentPromise);
  const onboardingStep = use(onboardingStepPromise);

  const steps = useMemo(
    () => onboardingSteps.map((item) => item.stepKey),
    [onboardingSteps]
  );

  if (!onboardingStep) {
    return <OnboardingPageSkeleton />;
  }

  const { videoUrl, tips } = onboardingStep;
  const onboardingStepTitle = DOMPurify.sanitize(onboardingStep.title);

  const isBookAnAuditStep = onboardingStep?.stepKey === "book_for_audit";

  return (
    <div className="flex w-full flex-wrap overflow-y-hidden">
      <TextElement
        as="h1"
        className="w-full !text-[20px] !font-normal sm:!text-[28px] lg:!text-[35px]"
      >
        <div dangerouslySetInnerHTML={{ __html: onboardingStepTitle }} />
      </TextElement>

      <section
        className={`w-auto overflow-x-hidden overflow-y-hidden p-2 pb-40 lg:mt-4 lg:min-h-[64vh] ${isBookAnAuditStep ? "w-full" : "lg:w-2/3"}`}
      >
        {onboardingStep.children?.map((item) => {
          switch (item.type) {
            case "checkbox":
              return <CheckboxItem step={item} key={item.id} />;
            case "file_upload":
              return (
                <FileUploadItem step={item} key={item.id} stepKey={stepKey} />
              );
            case "registration_list":
              return (
                <GroupSelectItem
                  stepKey={stepKey}
                  stepId={item.id}
                  key={item.id}
                />
              );
            default:
              return null;
          }
        })}
        {isBookAnAuditStep && <AuditStep />}
        <div className="mx-auto mt-20 flex w-full justify-center overflow-x-hidden lg:hidden">
          <OnboardingActions
            stepKey={stepKey}
            steps={steps}
            onboardingStep={onboardingStep}
            mobileScreen={true}
          />
        </div>
      </section>

      {!isBookAnAuditStep && (
        <aside className="hidden h-auto w-1/3 p-3 pb-40 lg:block">
          {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
          <div className="my-8">{tips && <OnboardingTips tips={tips} />}</div>
        </aside>
      )}
      <div className="relative">
        <div className="absolute hidden lg:right-0 lg:bottom-0 lg:block">
          <OnboardingActions
            stepKey={stepKey}
            steps={steps}
            onboardingStep={onboardingStep}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingContent;
