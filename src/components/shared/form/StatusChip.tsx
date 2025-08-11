import React from "react";

import TextElement from "@/components/shared/typography/TextElement.typo";

interface StatusChipProps {
  text: string;
}

const statusStyles: Record<string, string> = {
  Pending:
    "bg-[var(--status-pending-bg)] border-[var(--status-pending-border)] text-[var(--status-pending-text)]",
  Approved:
    "bg-[var(--status-approved-bg)] border-[var(--status-approved-border)] text-[var(--status-approved-text)]",
  Rejected:
    "bg-[var(--status-rejected-bg)] border-[var(--status-rejected-border)] text-[var(--status-rejected-text)]",
};

const StatusChip: React.FC<StatusChipProps> = ({ text }) => {
  const styleKey = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  const style =
    statusStyles[styleKey] || "bg-gray-200 border-gray-300 text-gray-700";
  return (
    <span
      className={`inline-flex w-[120px] items-center justify-center rounded-full border px-5 py-1 text-[18px] font-normal ${style}`}
    >
      <TextElement className="font-normal lg:text-[18px]">
        {styleKey}
      </TextElement>
    </span>
  );
};

export default StatusChip;
