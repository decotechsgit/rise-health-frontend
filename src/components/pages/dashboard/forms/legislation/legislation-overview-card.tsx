import Image from "next/image";

import TextElement from "@components/shared/typography/TextElement.typo";

import LegislationItems from "./legislation-items";

interface Props {
  firstItem: TLegislation;
  relatedItems?: TLegislationLink[];
}

const LegislationOverviewCard = ({ firstItem, relatedItems }: Props) => {
  return (
    <div className="scrollbar-none max-h-[80vh] overflow-y-auto bg-[var(--page-bg)] sm:p-2">
      <div className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <TextElement className="font-[600] text-wrap break-words text-[var(--gray-900)] lg:text-[24px]">
            {firstItem.title || ""}
          </TextElement>
          <a href={firstItem.url} target="_blank" rel="noopener noreferrer">
            <Image
              src="/form/ic_link.svg"
              alt="Link Icon"
              width={18}
              height={18}
            />
          </a>
        </div>
        <TextElement className="font-[400] text-[var(--gray-700)] lg:text-[18px]">
          {firstItem.description || ""}
        </TextElement>
      </div>
      <div className="mt-8">
        <TextElement className="mb-4 pl-6 text-[20px] font-[600] text-[var(--gray-600)] lg:text-[24px]">
          Related Documentation
        </TextElement>
        <LegislationItems items={relatedItems} />
      </div>
    </div>
  );
};

export default LegislationOverviewCard;
