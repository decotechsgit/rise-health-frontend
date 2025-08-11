"use server";

import { revalidatePath } from "next/cache";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import { onboardingService } from "@api/onboarding.service";

export const updateOnboardingProgress = async (
  onboarding: OnboardingProgress
) => {
  await onboardingService.updateOnboardingProcess(onboarding);
  revalidatePath(PAGES_ROUTES.onboardingSummary);
  revalidatePath(PAGES_ROUTES.dashboardForms);
};
