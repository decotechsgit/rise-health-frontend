import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";

const VideoPlayer = ({ videoUrl }: { videoUrl?: string | null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const openModal = () => {
    if (videoUrl) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* --- Video Thumbnail and Trigger --- */}
      <div
        className="mx-auto w-[90%] max-w-[357px] cursor-pointer"
        onClick={openModal}
        title="Watch video guide"
      >
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded bg-[#F8F8F8]">
          {videoUrl ? (
            // This div makes the player immune to clicks, so the parent div's onClick is always used.
            <div className="pointer-events-none h-full w-full">
              <ReactPlayer
                src={videoUrl}
                light={true}
                playing={false}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            // Placeholder for when there is no video
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5 19H19V5H5V19ZM7 17H17C17.2 17 17.35 16.9083 17.45 16.725C17.55 16.5417 17.5333 16.3667 17.4 16.2L14.65 12.525C14.55 12.3917 14.4167 12.325 14.25 12.325C14.0833 12.325 13.95 12.3917 13.85 12.525L11.25 16L9.4 13.525C9.3 13.3917 9.16667 13.325 9 13.325C8.83333 13.325 8.7 13.3917 8.6 13.525L6.6 16.2C6.46667 16.3667 6.45 16.5417 6.55 16.725C6.65 16.9083 6.8 17 7 17Z"
                fill="#B8B8B8"
              />
            </svg>
          )}
        </div>
        <TextElement
          as="p"
          className={`text-[#F59432] ${altform.className} my-2 flex items-center`}
        >
          <span className="mr-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#FABA5E" />
              <path
                d="M9.59961 8.40234L15.5996 12.0023L9.59961 15.6023V8.40234Z"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Watch video guide
        </TextElement>
      </div>

      {/* --- Video Modal (unchanged) --- */}
      {hasWindow && isModalOpen && videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div
            className="relative w-[90%] max-w-6xl md:w-[80%] lg:w-[70%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 z-50 rounded-full bg-black/50 p-1.5 text-white transition-transform hover:scale-110"
              aria-label="Close video player"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="player-wrapper">
              <ReactPlayer
                src={videoUrl}
                className="react-player"
                playing={true}
                controls={true}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
