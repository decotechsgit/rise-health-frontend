'use client'
import React, { useRef } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    startTime?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, startTime }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    if (!videoUrl) {
        return (
            <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg">
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
        <div className="w-[473px] h-[266px] mx-auto my-8 rounded overflow-hidden">
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