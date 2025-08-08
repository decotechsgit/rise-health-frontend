"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import TextElement from "../typography/TextElement.typo";

interface SlidePanelProps {
  isOpen: boolean;
  children: React.ReactNode;
  width?: "half" | "full" | "third" | "two-thirds";
  className?: string;
}

const SlidePanel = ({
  isOpen,
  children,
  width = "half",
  className = "",
}: SlidePanelProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("category") || "Forms";
  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getWidthClass = (width: string) => {
    switch (width) {
      case "half":
        return "w-full sm:w-2/3 md:w-1/2";
      case "third":
        return "w-full sm:w-1/2 md:w-1/3";
      case "two-thirds":
        return "w-full sm:w-2/3 md:w-2/3";
      case "full":
        return "w-full";
      default:
        return "w-full sm:w-2/3 md:w-1/2";
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`bg-opacity-25 fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "visible opacity-50" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide Panel */}
      <div
        className={`bg-background-page-bg fixed z-50 transform rounded-t-[24px] rounded-tr-[40x] shadow-2xl transition-transform duration-300 ease-in-out sm:rounded-tl-[40px] sm:rounded-tr-none ${getWidthClass(width)} top-10 bottom-0 left-0 w-full sm:top-0 sm:right-0 sm:left-auto sm:h-full ${
          isOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-x-full"
        } ${className} `}
      >
        {/* Header */}
        <div className="bg-compliance-subcategory-grey flex items-center justify-between rounded-t-[24px] rounded-tl-[40x] rounded-tr-[40x] border-b border-gray-200 p-6 sm:rounded-tl-[40px] sm:rounded-tr-none">
          <TextElement className="text-xl font-semibold text-gray-800">
            {title}
          </TextElement>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-gray-200"
            aria-label="Close panel"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
};

export default SlidePanel;
