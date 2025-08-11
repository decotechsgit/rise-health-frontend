import { ApiClient } from "./client.service";

class OnboardingService extends ApiClient {
  constructor() {
    super("/onboarding");
  }

  async getOnboardingSteps() {
    return this.get<Step[]>("/steps");
  }
  async getOnboardingStep(stepKey: string) {
    return this.get<Step>(`/steps/${stepKey}`);
  }
  async updateOnboardingProcess(currentProgress: OnboardingProgress) {
    return this.patch<OnboardingProgress>("/progress", currentProgress);
  }
  async getOnboardingProgress() {
    return this.get<OnboardingProgress>("/progress");
  }
  async getRegistrationGroups() {
    return this.get<RegistrationGroup[]>("/registration-groups");
  }
  async getPackagesLinkedWithSelectedGroups() {
    return this.get<SuggestedPackage[]>("/packages");
  }
}

export const onboardingService = new OnboardingService();
