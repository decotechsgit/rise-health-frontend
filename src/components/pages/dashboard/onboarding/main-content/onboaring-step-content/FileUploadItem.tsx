"use client";
import DOMPurify from "isomorphic-dompurify";
import { LoaderCircle } from "lucide-react";
import React, { useRef, useState } from "react";

import { altform } from "@/app/fonts/altform";
import { useOnboarding } from "@/contexts/onboarding-context";
import { mediaService } from "@api/media.service";
import SelectedItem from "@components/pages/dashboard/onboarding/main-content/onboaring-step-content/SelectedItem";
import TextElement from "@components/shared/typography/TextElement.typo";


type FileUploadItemProps = {
  step: Step;
  stepKey: string;
};

// --- Component Definition ---

const FileUploadItem = ({ step, stepKey }: FileUploadItemProps) => {
  const [loading, setloading] = useState(false);
  const { onboarding, setOnboarding } = useOnboarding();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedMimeTypes = ["image/png", "image/jpeg", "application/pdf"];

  const title = step.title
    ? DOMPurify.sanitize(step.title)
    : null;

  const handleFiles = async (files: FileList | null) => {
    setloading(true);
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter((file) =>
      acceptedMimeTypes.includes(file.type),
    );

    if (validFiles.length === 0) return;

    const formData = new FormData();
    formData.append("category", "onboarding_scope");
    const metadata = {
      source: "user onboarding",
      stepKey: stepKey,
      taskId: step.id,
    };
    formData.append("metadata", JSON.stringify(metadata));
    validFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const uploadedFilesResponse = await mediaService.uploadMultipleFiles(
        formData,
      );

      if (uploadedFilesResponse.length > 0) {
         const newFiles = uploadedFilesResponse.map((item) => ({
          id: item.id,
          name: item.originalName,
          size: item.size,
          type: item.mimeType,
          signedUrl: item.signedUrl,
          isDeleted: false,
        }));

        const existingFiles =
          onboarding?.progress?.uploads?.receive_file_upload?.[step.id] || [];

        setOnboarding({
          ...onboarding,
          progress: {
            ...onboarding?.progress,
            checkboxes: {
              ...onboarding?.progress?.checkboxes,
              [step.id]: true,
            },
            uploads: {
              ...onboarding?.progress?.uploads,
              receive_file_upload: {
                ...onboarding?.progress?.uploads?.receive_file_upload,
                [step.id]: [...existingFiles, ...newFiles],
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
    setloading(false);

  };

  const handleRemoveFile = async (id: string) => {
    const currentFiles =
      onboarding?.progress?.uploads?.receive_file_upload?.[step.id] || [];

    const updatedFiles = currentFiles.map((file) =>
      file.id === id ? { ...file, isDeleted: true } : file,
    );

    const hasActiveFiles = updatedFiles.some((file) => !file.isDeleted);

    let completedSteps = onboarding?.progress?.completedSteps || [];

    if(completedSteps.includes(stepKey)){
      if(!hasActiveFiles){
        completedSteps = completedSteps.filter((item)=>item!==stepKey)
      }
    }

    setOnboarding({
      ...onboarding,
      progress: {
        ...onboarding?.progress,
        checkboxes: {
          ...onboarding?.progress?.checkboxes,
          [step.id]: hasActiveFiles,
        },
        uploads: {
          ...onboarding?.progress?.uploads,
          receive_file_upload: {
            ...onboarding?.progress?.uploads?.receive_file_upload,
            [step.id]: updatedFiles,
          },
        },
        completedSteps:[...completedSteps],
      },
    });

    try {
      await mediaService.deleteFile(id);
    } catch (error) {
      console.error("Failed to delete file from server:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <section>
        <div className="py-4">
          {
            title &&
            (
              <div
                className={`!text-[14px] leading-[16px] font-[400] text-[#1E1F21] md:leading-[26px] lg:!text-[20px] ${altform.className} link-text`}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )
          }
        </div>

      {
        loading ? (
          <div className="flex h-[100px] w-full max-w-[744px] items-center justify-center rounded-lg bg-white ">
            <LoaderCircle className="h-8 w-8 animate-spin text-[#F59432]" />
            <TextElement className={`${altform.className} ml-2`}>
              Uploading file
            </TextElement>
          </div>
        ) : (<div>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex h-[320px] w-full max-w-[744px] items-center justify-center overflow-hidden rounded-lg border bg-[#F8F8F8] transition-colors duration-200 ${
              isDragging ? "border-blue-500 border-dashed bg-blue-50" : "border-[#DDDDDD]"
            }`}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files)}
              accept="image/png, image/jpeg, application/pdf"
              multiple
            />
            <div className="flex flex-col items-center justify-center text-center">
              <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="mb-3">
                  <rect width="40" height="40" rx="20" fill="#FABA5E" />
                  <path
                    d="M19 24V15.85L16.4 18.45L15 17L20 12L25 17L23.6 18.45L21 15.85V24H19ZM14 28C13.45 28 12.9793 27.8043 12.588 27.413C12.1967 27.0217 12.0007 26.5507 12 26V23H14V26H26V23H28V26C28 26.55 27.8043 27.021 27.413 27.413C27.0217 27.805 26.5507 28.0007 26 28H14Z"
                    fill="black" />
                </svg>
              </div>
              <TextElement as="p" className={`${altform.className} text-[#535353]`}>
                Drag and Drop or{" "}
                <TextElement
                  as="span"
                  onClick={() => fileInputRef.current?.click()}
                  className={`${altform.className} cursor-pointer text-[#F59432] hover:underline`}
                >
                  Choose file
                </TextElement>{" "}
                to upload
              </TextElement>
              <TextElement as="p" className={`${altform.className} text-[#8C8C8C]`}>
                Supported formats: PDF, JPG, PNG
              </TextElement>
            </div>
          </div>

          <div className="mt-4 space-y-2 ">
            {onboarding?.progress?.uploads?.receive_file_upload?.[step.id]?.map(
              (file) =>
                !file.isDeleted && (
                  <SelectedItem
                    key={file.id as string}
                    name={file.name as string}
                    id={file.id as string}
                    handleRemoveItem={handleRemoveFile}
                  />
                ),
            )}
          </div>
        </div>)
      }

    </section>
  );
};

export default FileUploadItem;
