import { redirect } from "next/navigation";
import React, { Suspense } from "react";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import { onboardingService } from "@api/onboarding.service";
import OnboardingContent from "@components/pages/dashboard/onboarding/main-content/OnboardingStepContent";
import OnboardingPageSkeleton from "@components/skeletons/onboaring/OnboardingPageSkeleton";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ step: string }>;
}) => {
  const { step: stepKey } = await searchParams;

  if (!stepKey) {
    redirect(PAGES_ROUTES.dashboardRegistration);
  }

  const onboardingContentPromise = onboardingService.getOnboardingSteps();
  const onboardingStepPromise = onboardingService.getOnboardingStep(stepKey);

  return (
    <Suspense fallback={<OnboardingPageSkeleton />}>
      <OnboardingContent
        stepKey={stepKey}
        onboardingStepPromise={onboardingStepPromise as Promise<Step>}
        onboardingContentPromise={onboardingContentPromise as Promise<Step[]>}
      />
    </Suspense>
  );
};

export default Page;
