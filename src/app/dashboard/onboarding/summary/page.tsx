import React from "react";

import { onboardingService } from "@api/onboarding.service";
import Summary from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/Summary";

const Page = () => {
  const onboardingContentPromise = onboardingService.getOnboardingSteps();
  return <Summary steps={onboardingContentPromise} />;
};
export default Page;
