import { useCallback, useState } from "react";

import ProgressBar from "@/components/layout/progress-bar";
import IconButton from "@/components/shared/button";
import CategoryCard from "@/components/shared/cards/Category.card";
import CircleCard from "@/components/shared/cards/CircleCount.card";
import VideoTutorialModal from "@/components/shared/modals/VideoTutorial.modal";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

import WatchVideo from "../WatchVideo";

import { RegistrationStepsFlowEnum } from ".";

interface IReviewSelectedSupportProps {
  handleNextStep: (step: RegistrationStepsFlowEnum) => void;
}

const ReviewSelectedSupport: React.FC<IReviewSelectedSupportProps> = ({
  handleNextStep,
}) => {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  /**
   * We're using useCallback here to memoize the toggleVideoModal function.
   * This ensures that the function reference stays stable across re-renders.
   * It's important because we're passing this function as a prop to the WatchVideo component.
   * Combined with React.memo in the child, this avoids unnecessary re-renders of WatchVideo.
   */

  const toggleVideoModal = useCallback(() => {
    setShowVideoModal((prev) => !prev);
  }, []);

  const stepHeading = "Review your selected supports";

  return (
    <Row className="w-full flex-col items-end gap-4 rounded-2xl bg-white p-4">
      <Row className="w-full items-center justify-between">
        <Row className="w-[28%] items-center justify-between">
          <ProgressBar />
          <ProgressBar colorClassName="!bg-indigo-400" />
          <CircleCard count={3} className="z-40 size-[40px]" />
        </Row>

        <WatchVideo
          title="Watch Video"
          className="justify-end"
          imgURL="https://images.unsplash.com/photo-1726179612723-124312ff97a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          handleOnClick={toggleVideoModal}
        />
      </Row>

      <TextElement as="h3" className="w-full">
        {stepHeading}
      </TextElement>

      <Row className="w-full justify-between">
        <Row className="w-[25%] items-start gap-4">
          <CircleCard count={1} className="size-[40px]" />

          <Row className="w-full flex-col gap-6">
            <TextElement as="h3">Main Support Category</TextElement>

            <Row className="w-full flex-wrap gap-3">
              {[
                {
                  title: "Assistive Tech & Access",
                  description:
                    "Equipment and modifications to improve mobility, and home accessibility for greater independence.",
                },
              ].map((item, index) => (
                <CategoryCard
                  key={index}
                  title={item.title}
                  containerClassName="w-full"
                  description={item.description}
                />
              ))}
            </Row>
          </Row>
        </Row>

        <Row className="w-[60%] items-start gap-4">
          <CircleCard count={2} className="size-[40px]" />

          <Row className="w-full flex-col gap-6">
            <TextElement as="h3">Main Support Category</TextElement>

            <Row className="w-full flex-wrap gap-3">
              {[
                {
                  title: "Personal mobility equipment",
                  description:
                    "Device that assist individuals in moving independently, such as wheelchairs, scooters, and walking aids.",
                },
                {
                  title: "Hearing equipment",
                  description:
                    "Technology specifically designed to support hearing needs, including hearing aids and assistive listening devices.",
                },
                {
                  title: "Specialized driver training",
                  description:
                    "Tailored driving lessons specifically for individuals with disabilities to help them safely operate a personal vehicle.",
                },
              ].map((item, index) => (
                <CategoryCard
                  key={index}
                  title={item.title}
                  containerClassName="w-[32%]"
                  description={item.description}
                />
              ))}
            </Row>
          </Row>
        </Row>
      </Row>

      <Row className="gap-2">
        <IconButton
          title="Back"
          className="border-2 border-orange-300"
          handleOnClick={() =>
            handleNextStep(RegistrationStepsFlowEnum.SELECT_SUB_SUPPORT)
          }
        />
        <IconButton
          title="Confirm"
          className="bg-orange-300"
          handleOnClick={() =>
            handleNextStep(RegistrationStepsFlowEnum.SUMMARY)
          }
        />
      </Row>

      {showVideoModal && (
        <VideoTutorialModal
          heading={stepHeading}
          onCancel={toggleVideoModal}
          stepNumber={3}
        />
      )}
    </Row>
  );
};

export default ReviewSelectedSupport;
