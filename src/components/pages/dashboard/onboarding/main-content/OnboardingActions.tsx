"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { altform } from "@/app/fonts/altform";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { useOnboarding } from "@/contexts/onboarding-context";
import Button from "@components/shared/button";
import Toast from "@components/shared/toast/Toast";

type OnboardingActionsProps = {
  stepKey: string;
  steps: string[];
  onboardingStep: Step;
  mobileScreen?: boolean;
};

type ToastType = "success" | "failure" | "info";

const OnboardingActions = ({
  stepKey,
  steps,
  onboardingStep,
  mobileScreen,
}: OnboardingActionsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { onboarding, setOnboarding } = useOnboarding();

  const currentStepIndex = steps.indexOf(stepKey);
  const prevStep = steps.at(
    currentStepIndex === 0 ? 0 : currentStepIndex - 1
  ) as string;
  const isPreviousStepCompleted =
    onboarding?.progress?.completedSteps?.includes(prevStep) ?? false;
  const isStepAlreadyCompleted =
    onboarding?.progress?.completedSteps?.includes(stepKey) ?? false;

  useEffect(() => {
    if (onboarding) {
      setOnboarding({
        ...onboarding,
        currentStepKey: stepKey,
      });
    }
  }, [stepKey]);

  const markAsComplete = async () => {
    if (isStepAlreadyCompleted) {
      setToast({
        show: true,
        message: "step already marked as completed",
        type: "info",
      });
      return;
    }
    if (prevStep !== stepKey) {
      if (!isPreviousStepCompleted) {
        setToast({
          show: true,
          message: "please complete previous step first.",
          type: "failure",
        });
        return;
      }
    }
    setLoading(true);

    let hasGroupItem = false;
    let hasFileItem = false;

    const stepChildIds =
      onboardingStep?.children?.flatMap((item) => {
        if (item.type === "registration_list") hasGroupItem = true;
        else if (item.type === "file_upload") hasFileItem = true;
        return [item.id];
      }) ?? [];

    const allCheckboxes = onboarding?.progress?.checkboxes;
    const areAllCheckboxesTicked = stepChildIds.every(
      (id) => allCheckboxes && allCheckboxes[id]
    );

    if (!areAllCheckboxesTicked) {
      let toastMessage = "Please complete all steps before proceeding";
      if (hasFileItem && hasGroupItem) {
        toastMessage =
          "Please complete all steps, select at least one registration group, and upload at least one file before proceeding.";
      } else if (hasFileItem) {
        toastMessage =
          "Please complete all steps, and upload at least one file before proceeding.";
      } else if (hasGroupItem) {
        toastMessage =
          "Please complete all steps, and select at least one registration group before proceeding.";
      }
      setToast({
        ...toast,
        show: true,
        message: toastMessage,
        type: "failure",
      });
      setLoading(false);
      return;
    }
    const newOnboardingState = {
      ...onboarding,
      progress: {
        ...onboarding?.progress,
        completedSteps: [
          ...(onboarding?.progress?.completedSteps ?? []),
          stepKey,
        ],
      },
    };

    setOnboarding(newOnboardingState);
    setToast({
      ...toast,
      show: true,
      message: "completed successfully",
      type: "success",
    });
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-between md:flex-nowrap">
      {currentStepIndex !== 0 && (
        <Button
          title={mobileScreen ? "" : "Previous Step"}
          Icon={mobileScreen ? ChevronLeft : undefined}
          iconColor={"text-black"}
          className={`text-nowrap ${mobileScreen ? "!w-[15%] border-none !bg-[#F8F8F8] !p-0" : "mx-4 !rounded border-[#F59432] bg-[#F59432] p-2 !py-6"}`}
          btnClassName={`lg:!text-[16px] text-white text-nowrap ${altform.className}`}
          handleOnClick={() => {
            if (currentStepIndex !== 0) {
              router.push(
                `${PAGES_ROUTES.dashboardOnboarding}?step=${steps.at(currentStepIndex - 1)}`
              );
            }
          }}
        />
      )}
      <Button
        title={"Mark as complete"}
        className={`mx-2 !rounded !border-[#A3A3A3] p-1 py-3 text-wrap lg:mx-4 lg:p-3 lg:!py-6 lg:text-nowrap ${isStepAlreadyCompleted ? "border-none bg-[#F59432]" : "bg-white"} ${mobileScreen && "!w-[50%]"}`}
        btnClassName={`!text-[12px] sm:!text-[16px] text-nowrap ${altform.className} ${isStepAlreadyCompleted && "!text-white"}`}
        handleOnClick={markAsComplete}
        isLoading={loading}
      />
      {steps.length - 1 === currentStepIndex ? (
        <>
          <Button
            title={"Summary"}
            className={`mx-2 !rounded border-[#F59432] bg-[#F59432] p-1 py-3 text-nowrap lg:mx-4 lg:p-3 lg:!py-6 ${mobileScreen && "!mx-0 !w-[30%]"}`}
            btnClassName={`!text-[12px] sm:!text-[16px] text-white text-nowrap ${altform.className}`}
            handleOnClick={() => {
              router.push(PAGES_ROUTES.onboardingSummary);
            }}
          />
        </>
      ) : (
        <Button
          title={mobileScreen ? "" : "Next Step"}
          Icon={mobileScreen ? ChevronRight : undefined}
          iconColor={"text-black"}
          className={`text-nowrap ${mobileScreen ? "!w-[15%] border-none !bg-[#F8F8F8] !p-0" : "mx-4 !rounded border-[#F59432] bg-[#F59432] p-2 !py-6"}`}
          btnClassName={`lg:!text-[16px] text-white text-nowrap ${altform.className}`}
          handleOnClick={() => {
            router.push(
              `${PAGES_ROUTES.dashboardOnboarding}?step=${steps.at(currentStepIndex + 1)}`
            );
          }}
        />
      )}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type as ToastType}
          onClose={() => {
            setToast({ ...toast, show: false });
          }}
        />
      )}
    </div>
  );
};
export default OnboardingActions;
