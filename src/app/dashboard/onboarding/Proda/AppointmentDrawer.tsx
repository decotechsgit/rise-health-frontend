"use client";
import TextElement from "@components/shared/typography/TextElement.typo";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

interface AppointmentDrawerProps {
  isOpen: boolean;
  width?: "half" | "full" | "third" | "two-thirds";
  onClose: () => void;
}

const AppointmentDrawer = ({
  isOpen,
  width = "half",
  onClose,
}: AppointmentDrawerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("category") || "Forms";

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
        className={`bg-background-page-bg fixed top-10 bottom-0 left-0 z-50 w-[745px] transform rounded-t-[24px] rounded-tr-[40x] shadow-2xl transition-transform duration-300 ease-in-out sm:top-0 sm:right-0 sm:left-auto sm:h-full sm:rounded-tl-[0px] sm:rounded-tr-none ${
          isOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-x-full"
        } `}
      >
        {/* Header */}
        <div className="bg-compliance-subcategory-grey flex items-center justify-between rounded-t-[24px] rounded-tl-[40x] rounded-tr-[40x] border-b border-gray-200 p-6 sm:rounded-tl-[0px] sm:rounded-tr-none">
          <TextElement className="text-xl font-semibold text-gray-800">
            Book an appointment
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
        <div className="flex-1 overflow-y-auto p-6">
          <form className="font-[Altform TRIAL] space-y-6">
            {/* Selected Auditor */}
            <div>
              <label className="mb-1 block text-[16px] font-normal text-[#1E1F21]">
                Selected auditor
              </label>
              <select className="h-[65] w-full rounded-lg border border-[#525558] px-4 py-3 text-[16px] text-[#1E1F21]">
                <option value="assured">Assured Auditing Pty Ltd</option>
                <option value="global">AQC Group</option>
                <option value="auditwisegroup">Audit Wise Group</option>
                <option value="addedvalueassessor">Added Value Assessor</option>
                <option value="certifiinternational">
                  Certifi International
                </option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-1 block text-[16px] font-normal text-[#1E1F21]">
                Date
              </label>
              <input
                type="date"
                className="h-[65] w-full rounded-lg border border-[#525558] px-4 py-3 text-[16px] text-[#1E1F21] focus:outline-none"
              />
            </div>

            {/* Time */}
            <div>
              <label className="mb-1 block text-[16px] font-normal text-[#1E1F21]">
                Time
              </label>
              <select className="h-[65] w-full rounded-lg border border-[#525558] px-4 py-3 text-[16px] text-[#1E1F21]">
                {Array.from({ length: 48 }, (_, i) => {
                  const hour = Math.floor(i / 2);
                  const minute = i % 2 === 0 ? "00" : "30";
                  const label = `${hour.toString().padStart(2, "0")}:${minute}`;
                  return (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Scope of Audit */}
            <div>
              <label className="mb-1 block text-[16px] font-normal text-[#1E1F21]">
                Scope of audit
              </label>
              <select className="h-[65] w-full rounded-lg border border-[#525558] px-4 py-3 text-[16px] text-[#1E1F21]">
                <option value="initial">Initial audit</option>
                <option value="follow-up">Follow-up audit</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1 block text-[16px] font-normal text-[#1E1F21]">
                Notes
              </label>
              <textarea
                rows={4}
                placeholder="Anything you will like me to know before the appointment"
                className="w-full resize-none rounded-lg border border-[#525558] px-4 py-3 text-[16px] text-[#1E1F21] focus:outline-none"
              />
            </div>

            {/* Proceed Button */}
            <div>
              <button
                type="submit"
                className="h-[56] w-full rounded-sm bg-[#F59432] py-3 text-[16px] text-white transition hover:bg-[#e6862b]"
              >
                Proceed to payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentDrawer;
