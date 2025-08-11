"use client";
import React, { useEffect } from "react";

import { altform } from "@/app/fonts/altform";

const SuccessIcon = () => (
  <svg
    className="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FailureIcon = () => (
  <svg
    className="h-6 w-6 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    className="h-6 w-6 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-5 w-5"
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
);

// --- Toast Component ---

type ToastType = "success" | "failure" | "info";

type ToastProps = {
  message: string;
  type: ToastType;
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  // Updated style mapping for light backgrounds
  const toastStyles = {
    success: {
      bg: "bg-[#DEF6F1]",
      icon: <SuccessIcon />,
      text: "text-black",
      closeButton: "text-[#1C7C6A] hover:bg-green-200",
    },
    failure: {
      bg: "bg-[#FFF0F3]",
      icon: <FailureIcon />,
      text: "text-black",
      closeButton: "text-[#F83B66] hover:bg-red-200",
    },
    info: {
      bg: "bg-blue-100",
      icon: <InfoIcon />,
      text: "text-blue-800",
      closeButton: "text-blue-500 hover:bg-blue-200",
    },
  };

  const { bg, icon, text, closeButton } = toastStyles[type];

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex w-full max-w-xs items-center justify-between rounded-lg p-4 shadow-lg ${bg} translate-x-0 transform transition-transform duration-300`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
          {icon}
        </div>
        <div
          className={`ms-3 text-sm font-normal ${text} ${altform.className}`}
        >
          {message}
        </div>
      </div>
      <button
        type="button"
        className={`-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 focus:ring-2 focus:ring-gray-300 ${closeButton}`}
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <CloseIcon />
      </button>
    </div>
  );
};
export default Toast;
