'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch';

import { altform } from "@/app/fonts/altform";
import { mediaService } from '@api/media.service';
import TextElement from "@components/shared/typography/TextElement.typo";

interface MediaItem {
  id: string;
  name: string;
  size: number;
  type: string;
  isDeleted: boolean;
}


const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const FileIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type.startsWith('image/')) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-gray-500 flex-shrink-0"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
  }
  if (type === 'application/pdf') {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-gray-500 flex-shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
  }
  return null;
};

const Controls: React.FC = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-2 right-2 z-10 flex space-x-1">
      <button onClick={() => zoomIn()} className="bg-gray-800 text-white w-8 h-8 rounded-md flex items-center justify-center text-xl hover:bg-gray-700 transition-colors" aria-label="Zoom In">+</button>
      <button onClick={() => zoomOut()} className="bg-gray-800 text-white w-8 h-8 rounded-md flex items-center justify-center text-xl hover:bg-gray-700 transition-colors" aria-label="Zoom Out">-</button>
      <button onClick={() => resetTransform()} className="bg-gray-800 text-white px-2 h-8 rounded-md flex items-center justify-center text-sm hover:bg-gray-700 transition-colors" aria-label="Reset Zoom">Reset</button>
    </div>
  );
};



const PreviewArea: React.FC<{ selectedMedia: MediaItem | null }> = ({ selectedMedia }) => {

  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedMedia) return;

    let isMounted = true;
    setIsLoading(true);
    setUrl(null);
    setError(null);

    const fetchSignedUrl = async () => {
      try {
        const response = await mediaService.getSignedUrl(selectedMedia.id);
        if (isMounted) setUrl(response.signedUrl);
      } catch (err) {
        console.error("Failed to fetch signed URL:", err);
        if (isMounted) setError("Could not load the media file.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSignedUrl();

    return () => { isMounted = false; };
  }, [selectedMedia]);

  if (!selectedMedia) {
    return <div className="flex items-center justify-center w-full h-full"><p className="text-gray-500">Select an item to preview</p></div>;
  }
  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-full"><p className="text-gray-500">Loading...</p></div>;
  }
  if (error || !url) {
    return <div className="flex items-center justify-center w-full h-full"><p className="text-red-500">{error || "An unknown error occurred."}</p></div>;
  }

  if (selectedMedia.type.startsWith('image/')) {
    return (
      <div className="w-full h-full relative cursor-grab bg-gray-100">
        <TransformWrapper>
          <Controls />
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
            <Image src={url} alt={`Preview of ${selectedMedia.name}`} fill className="object-scale-down" draggable={false} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    );
  }

  if (selectedMedia.type === 'application/pdf') {
    return <iframe src={url} title={`Preview of ${selectedMedia.name}`} className="w-full h-full border-0" />;
  }

  return <div className="flex items-center justify-center w-full h-full"><p>Unsupported file type: {selectedMedia.type}</p></div>;
};

const MediaTile: React.FC<{ item: MediaItem; isSelected: boolean; onClick: () => void; }> = ({ item, isSelected, onClick }) => {
  return (
    <button onClick={onClick} disabled={item.isDeleted} className={`w-full p-3 text-left border-b border-gray-200 transition-colors duration-200 flex items-center ${isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'} ${item.isDeleted ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <FileIcon type={item.type} />
      <div className="flex-grow overflow-hidden">
        <p className={`font-semibold truncate ${item.isDeleted ? 'text-gray-400' : 'text-gray-900'}`}>{item.name}</p>
        <p className="text-sm text-gray-500">{formatBytes(item.size)} {item.isDeleted && '(Deleted)'}</p>
      </div>
    </button>
  );
};


// 2. Define props for the component
interface MediaViewerProps {
  mediaData: MediaItem[];
  title: string;
}

const MediaViewer: React.FC<MediaViewerProps> = ({ mediaData, title }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!selectedMedia && mediaData.length > 0) {
      const firstAvailableItem = mediaData.find(item => !item.isDeleted);
      if (firstAvailableItem) setSelectedMedia(firstAvailableItem);
    }
  }, [mediaData, selectedMedia]);

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-end"
      onClick={() => router.back()}
    >
      <div
        className="w-full md:w-3/4 h-full bg-white flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-grow overflow-hidden">
          <div className="w-2/3 h-full p-4">
            <TextElement as="h2" className={`${altform.className} font-semibold`}>{selectedMedia?.name}</TextElement>
            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
              <PreviewArea selectedMedia={selectedMedia} />
            </div>
          </div>

          <div className="w-1/3 h-full border-l border-gray-200 flex flex-col">
            <div className="flex-grow overflow-y-auto">
              {mediaData.map((item) => (
                <MediaTile
                  key={item.id}
                  item={item}
                  isSelected={selectedMedia?.id === item.id}
                  onClick={() => setSelectedMedia(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaViewer;