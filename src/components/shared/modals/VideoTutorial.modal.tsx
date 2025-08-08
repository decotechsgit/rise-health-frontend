import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

import CircleCard from "../cards/CircleCount.card";
import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface IVideoTutorialModalProps {
  onCancel: () => void;
  heading: string;
  stepNumber: string | number;
}

const VideoTutorialModal: React.FC<IVideoTutorialModalProps> = ({
  heading,
  onCancel,
  stepNumber,
}) => {
  //close the modal on clicking the escape button
  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onCancel]);

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex h-[100vh] w-screen items-center justify-center bg-[#00000078]"
    >
      <Row
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="h-[750px] w-[70%] flex-col items-center justify-between rounded-lg bg-white p-4"
      >
        <Row className="w-full items-center justify-between">
          <Row className="items-center gap-2">
            <CircleCard count={stepNumber} className="size-[40px]" />

            <TextElement as="h3" className="text-center">
              {heading}
            </TextElement>
          </Row>

          <RxCross2 size={20} onClick={onCancel} className="cursor-pointer" />
        </Row>

        <video
          src="https://videos.pexels.com/video-files/31421894/13403977_1920_1080_24fps.mp4"
          className="h-[650px] w-full rounded-md object-cover"
          autoPlay
          controls
        />
      </Row>
    </div>
  );
};

export default VideoTutorialModal;
