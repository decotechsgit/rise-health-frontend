"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import { onboardingService } from "@api/onboarding.service";
import Button from "@components/shared/button";
import TextElement from "@components/shared/typography/TextElement.typo";
import VideoPlayer from "@components/shared/videoPlayer/VideoPlayer";

import Summary from "./Summary";

const Registration = () => {
  const [step, setStep] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchOnboardingSteps = async () => {
      const data = await onboardingService.getOnboardingSteps();
      let stepKeys;
      if (data.length > 0) {
        stepKeys = data.map((step) => {
          if (step.order === 1) {
            return step.stepKey;
          } else {
            return null;
          }
        });
        setStep(stepKeys[0]);
      }
    };
    fetchOnboardingSteps();
  }, []);

  const videoLink = "/videos/intro.mp4";
  return (
    <>
      <div className="flex items-center justify-between rounded-2xl bg-gray-800 p-6">
        <div className="space-y-2">
          <TextElement className="mb-5 !text-2xl font-semibold text-white">
            Register as a Provider
          </TextElement>
          <TextElement as="p" className="max-w-xl text-gray-300">
            {" "}
            To register as a provider, you need to select the types of support
            services you will offer. This helps ensure that participants can
            find the right providers for their needs.
          </TextElement>
          <div className="mt-4 space-x-4">
            <Button
              title={"Get Started"}
              handleOnClick={() => {
                router.push(
                  `${PAGES_ROUTES["dashboardOnboarding"]}/?step=${step}`
                );
              }}
              isLoading={!step}
              disabled={!step}
              className="!w-full !border-none bg-yellow-500 hover:bg-yellow-600 sm:!w-[30%]"
              btnClassName="!text-[12px] md:!text-[16px] lg:!text-[18px] font-semibold"
            />
          </div>
        </div>
        <div className="hidden w-[50%] md:flex">
          <VideoPlayer videoUrl={videoLink} />
        </div>
      </div>
      <div className="pt-4">
        <Summary />
      </div>
    </>
  );
};

export default Registration;
