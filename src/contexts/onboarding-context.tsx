"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { updateOnboardingProgress } from "@/actions/onboarding.actions";
import { onboardingService } from "@api/onboarding.service";

type OnboardingContextType = {
  loading: boolean;
  onboarding: OnboardingProgress | null;
  onboardingStep: Step | null;
  setOnboardingStep: Dispatch<SetStateAction<Step | null>>;
  setOnboarding: Dispatch<SetStateAction<OnboardingProgress | null>>;
  stepCompleted: boolean;
  setStepCompleted: Dispatch<SetStateAction<boolean>>;
  refreshOnboarding: () => Promise<void>;
  registrationGroups: RegistrationGroup[];
  completedSteps: string[];
  setCompletedSteps: Dispatch<SetStateAction<string[] | []>>;
  allSteps: Step[] | null;
  registrationGroupStepId: string;
  registrationGroupParentKey: string;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onboarding, setOnboarding] = useState<OnboardingProgress | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<Step | null>(null);
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [registrationGroups, setRegistrationGroups] = useState<
    RegistrationGroup[]
  >([]);
  const [allSteps, setAllSteps] = useState<Step[] | null>(null);
  const [registrationGroupStepId, setRegistrationGroupStepId] = useState("");
  const [registrationGroupParentKey, setRegistrationGroupParentKey] =
    useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOnboarding = async () => {
    try {
      const data = await onboardingService.getOnboardingProgress();
      const regData = await onboardingService.getRegistrationGroups();
      setRegistrationGroups(regData);
      setOnboarding(data);
    } catch (err) {
      console.error("Failed to fetch onboarding progress:", err);
    }
  };

  const fetchAllSteps = async () => {
    try {
      const data = await onboardingService.getOnboardingSteps();
      setAllSteps(data);
    } catch (err) {
      console.error("Failed to fetch onboarding steps:", err);
    }
  };

  const fetchRegistrationGroupStepId = () => {
    allSteps?.forEach((step) => {
      step?.children?.forEach((child) => {
        if (child.type === "registration_list") {
          setRegistrationGroupStepId(child.id);
          setRegistrationGroupParentKey(step.stepKey);
        }
      });
    });
  };

  useEffect(() => {
    fetchOnboarding();
    fetchAllSteps();
  }, []);

  useEffect(() => {
    const updateProgress = async () => {
      if (onboarding) {
        setLoading(true);
        await updateOnboardingProgress(onboarding);
        setLoading(false);
      }
    };
    updateProgress();
  }, [onboarding]);

  useEffect(() => {
    if (allSteps) {
      fetchRegistrationGroupStepId();
    }
  }, [allSteps]);

  useEffect(() => {
    if (stepCompleted) {
      setCompletedSteps([
        ...(completedSteps || []),
        ...(onboarding?.progress?.completedSteps || []),
      ]);
    }
  }, [stepCompleted]);

  return (
    <OnboardingContext.Provider
      value={{
        loading,
        onboarding,
        setOnboarding,
        onboardingStep,
        setOnboardingStep,
        refreshOnboarding: fetchOnboarding,
        setStepCompleted,
        stepCompleted,
        registrationGroups,
        completedSteps,
        setCompletedSteps,
        allSteps,
        registrationGroupStepId,
        registrationGroupParentKey,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
