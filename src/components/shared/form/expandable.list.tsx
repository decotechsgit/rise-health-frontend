"use client";
import Image from "next/image";
import { useState } from "react";

import TextElement from "@/components/shared/typography/TextElement.typo";

import CompliancePack from "@components/pages/dashboard/forms/CompliancePack";

interface ExpandableListProps {
  packs: TPackage[];
  onClick: (item: string, pack: TSubCategory, isParent?: boolean) => void;
}

interface CategoryListProps {
  categories: (TCategory | TSubCategory)[];
  onClick: (item: string, pack: TSubCategory, isParent?: boolean) => void;
  level?: number;
  parentIndex?: string;
  parentBgColor?: "white" | "grey";
}

const CategoryList = function ({
  categories,
  onClick,
  level = 0,
  parentIndex = "",
  parentBgColor = "white",
}: CategoryListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div>
      {categories.map((item, i) => {
        const currentIndex = parentIndex
          ? `${parentIndex}.${i + 1}`
          : `${i + 1}`;
        const hasChildren = item.subCategories && item.subCategories.length > 0;
        const isExpanded = expandedIndex === i;
        const currentBgColor =
          parentBgColor === "white"
            ? i % 2 === 0
              ? "grey"
              : "white"
            : i % 2 === 0
              ? "white"
              : "grey";
        const borderColor = currentBgColor === "white"
          ? "#c7cace"
          : "#ffffff"
        const childBottomBorder = `${(level > 1 && i === (categories.length - 1) && !isExpanded) ? `solid 2px ${borderColor}` : 'none'}`;
        const parentBottomBorder = `${(level === 1 && i === (categories.length - 1) && !isExpanded) ? `solid 2px ${borderColor}` : 'none'}`;
        const childLeftPadding = level === 0 ? 16 : level === 1 ? 60 : level === 2 ? 104 : level * 50;
        const parentLeftPadding = hasChildren ? 16 : 58;
        const isParent = level === 0 ? true : false;
        return (
          <div key={item.id}>
            <div
              className={`hover:bg-compliance-background-hover flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-3 transition-colors ${currentBgColor === "white"
                ? "bg-white"
                : "bg-compliance-subcategory-grey"
                }`}
              style={{
                paddingLeft: isParent ? `${parentLeftPadding}px` : `${childLeftPadding}px`,
                borderBottom: level === 1 ? parentBottomBorder : childBottomBorder
              }}
            >
              <div
                className="flex w-full items-center gap-2"
                onClick={hasChildren ? () => handleToggle(i) : undefined}
              >
                {hasChildren && (
                  <span
                    className="mr-2 transition-transform duration-200 select-none rounded-full"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                      backgroundColor: isExpanded ? "#c7cace" : 'transparent',
                    }}
                  >
                    <Image
                      src="/dashboard/ic_next.svg"
                      alt="Expand"
                      width={28}
                      height={28}
                    />
                  </span>
                )}
                <TextElement className="text-[12px] md:text-[16px] lg:text-[18px] font-[400] text-[var(--color-compliance-text-secondary)]">
                  {currentIndex} {item.name}
                </TextElement>
              </div>
              <div className={`flex gap-4 justify-between md:justify-end md:my-0 w-full ${"legislationLinks" in item && item.legislationLinks ? "mt-2" : ""}`}>
                {"legislationLinks" in item && item.legislationLinks && (
                  <button
                    onClick={() => onClick("Legislation", item as TSubCategory, isParent)}
                    className="text-compliance-text-secondary cursor-pointer underline transition-colors hover:text-blue-600"
                  >
                    <TextElement className="cursor-pointer whitespace-nowrap transition-colors hover:text-blue-600">
                      Legislation
                    </TextElement>
                  </button>
                )}
                {"policies" in item && item.policies && (
                  <button
                    onClick={() =>
                      onClick("Policies & Procedures", item as TSubCategory, isParent)
                    }
                    className="text-compliance-text-secondary cursor-pointer underline transition-colors hover:text-blue-600"
                  >
                    <TextElement className="cursor-pointer whitespace-nowrap transition-colors hover:text-blue-600">
                      Policies & Procedures
                    </TextElement>
                  </button>
                )}
                {"forms" in item && item.forms && (
                  <button
                    onClick={() => onClick("Forms", item as TSubCategory, isParent)}
                    className="text-compliance-text-secondary cursor-pointer underline transition-colors hover:text-blue-600"
                  >
                    <TextElement className="cursor-pointer whitespace-nowrap transition-colors hover:text-blue-600">
                      Forms
                    </TextElement>
                  </button>
                )}
              </div>
            </div>
            {hasChildren && isExpanded && (
              <CategoryList
                categories={item.subCategories}
                onClick={onClick}
                level={level + 1}
                parentIndex={currentIndex}
                parentBgColor={currentBgColor}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const ExpandableList = function ({ packs, onClick }: ExpandableListProps) {
  const [expandedPackId, setExpandedPackId] = useState<string | null>(null);

  const handleExpand = (id: string, isExpanded: boolean) => {
    setExpandedPackId(isExpanded ? id : null);
  };

  return (
    <div className="space-y-6">
      <div className="pt-4">
        <div className="space-y-2">
          {packs?.map((pack: TPackage, index: number) => (
            <div key={pack.id} className="relative">
              <CompliancePack
                id={pack.id}
                title={pack.name}
                index={index}
                onExpand={handleExpand}
                isExpanded={expandedPackId === pack.id}
              />
              {expandedPackId === pack.id && (
                <div className="pt-4 pb-4">
                  <div className="rounded-lgborder border-compliance-border-light overflow-hidden rounded-[20px] bg-white">
                    <div>
                      <CategoryList
                        categories={pack.categories}
                        onClick={onClick}
                        parentIndex={`${index + 1}`}
                        parentBgColor={index % 2 !== 0 ? "white" : "grey"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandableList;
