"use client";

import Image from "next/image";

import TextElement from "@/components/shared/typography/TextElement.typo";

interface CompliancePackProps {
  title: string;
  isActive?: boolean;
  index: number;
  onExpand: (id: string, isExpanded: boolean) => void;
  id: string;
  isExpanded?: boolean;
}

const CompliancePack = ({
  title,
  index,
  onExpand,
  id,
  isExpanded,
}: CompliancePackProps) => {
  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    onExpand(id, newExpandedState);
  };
  const currentIndex = index + 1;
  return (
    <div
      className={`transition-all duration-200 ${index % 2 === 0 ? "bg-compliance-subcategory-grey" : "bg-white"
        } overflow-hidden rounded-2xl hover:shadow-md`}
    >
      <div
        className="hover:bg-opacity-80 cursor-pointer p-4"
        onClick={handleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`transform transition-transform duration-200 rounded-full ${isExpanded ? "rotate-90 bg-accordian-active" : ""
                }`}
            >
              <Image
                src="/dashboard/ic_next.svg"
                alt="Next"
                width={28}
                height={28}
              />
            </div>
            <TextElement className="text-[12px] md:text-[16px] lg:text-[20px] font-[400] text-[var(--gray-900)]">
              {currentIndex}  {title}
            </TextElement>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePack;
