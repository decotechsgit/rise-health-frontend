"use client";
import React, { useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  startTime?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, startTime }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!videoUrl) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200">
        <p className="text-gray-500">No video URL provided.</p>
      </div>
    );
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current && startTime) {
      videoRef.current.currentTime = startTime;
    }
  };
  return (
    <div className="mx-auto my-8 h-[266px] w-[473px] overflow-hidden rounded">
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
        >
          Your browser does not support the video player.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
