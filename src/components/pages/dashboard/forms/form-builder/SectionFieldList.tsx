import { useState } from "react";

import TextElement from "@components/shared/typography/TextElement.typo";

interface SectionFieldListProps {
  sectionMap: Record<string, TFormField[]>;
  sortedSections: string[];
  fields: TFormField[];
  setSelectedFieldIndex: (idx: number) => void;
  onFieldClick?: (field: TFormField) => void;
  onAddQuestion?: (section: string) => void;
  onAddSection?: () => void;
  editingSection?: string | null;
  setEditingSection?: (section: string | null) => void;
  onUpdateSectionName?: (oldName: string, newName: string) => void;
}

const SectionFieldList = ({
  sectionMap,
  sortedSections,
  fields,
  setSelectedFieldIndex,
  onFieldClick,
  onAddQuestion,
  onAddSection,
  editingSection,
  setEditingSection,
  onUpdateSectionName,
}: SectionFieldListProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="scrollbar-none flex max-h-[80vh] w-full min-w-0 flex-1 flex-col overflow-y-auto">
      {/* Header */}
      <div className="m-0 flex w-full items-center justify-between p-0">
        <TextElement className="text-[16px] font-[600] tracking-[0%] text-[var(--primary-text)]">
          Content
        </TextElement>
        <button
          className="h-20 w-32 rounded-xl border-none px-6 text-right text-xl font-semibold text-[var(--primary-text)] shadow-none"
          onClick={() => onAddSection && onAddSection()}
        >
          +
        </button>
      </div>
      {sortedSections.map((section) => (
        <div
          key={section}
          className="mb-4 rounded-2xl bg-[var(--color-compliance-subcategory-grey)] p-6"
        >
          {/* Section name or edit input */}
          {(() => {
            if (editingSection === section) {
              return (
                <div className="flex items-center gap-2">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mb-2 w-full rounded border border-[var(--border-gray)] px-2 py-1 font-semibold text-[var(--primary-text)]"
                    autoFocus
                    onBlur={() => {}}
                    onKeyDown={() => {}}
                  />
                  <button
                    className="rounded bg-[var(--button-save-bg)] px-2 py-1 text-xs"
                    onClick={() => {
                      if (inputValue && onUpdateSectionName)
                        onUpdateSectionName(section, inputValue);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="rounded bg-[var(--button-cancel-bg)] px-2 py-1 text-xs"
                    onClick={() => {
                      if (setEditingSection) setEditingSection(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              );
            } else {
              return (
                <TextElement
                  className="mb-2 cursor-pointer text-base text-[16px] font-[400] text-[var(--primary-text)]"
                  onClick={() => {
                    if (setInputValue && setEditingSection) {
                      setInputValue(section);
                      setEditingSection(section);
                    }
                  }}
                >
                  {section}
                </TextElement>
              );
            }
          })()}
          {sectionMap[section].map((field, idx) => (
            <div key={field.id} className="mb-2 flex items-start gap-3">
              <span className="mt-1 flex h-6 min-h-6 w-6 min-w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[var(--primary-text)] shadow">
                {idx + 1}
              </span>
              <div
                className="flex max-w-[calc(100%-2rem)] cursor-pointer flex-col"
                onClick={() => {
                  setSelectedFieldIndex(
                    fields.findIndex((f) => f.id === field.id)
                  );
                  if (onFieldClick) onFieldClick(field);
                }}
              >
                <TextElement
                  className="w-full overflow-hidden text-[14px] font-[600] text-ellipsis whitespace-nowrap text-[var(--primary-text)] sm:text-[16px]"
                  title={field.label}
                >
                  {field.label}
                </TextElement>
                <TextElement className="text-[14px] font-[400] text-[var(--primary-text)] sm:text-[16px]">
                  {field.placeholder || "Placeholder"}
                </TextElement>
              </div>
            </div>
          ))}
          <button
            className="mt-2 flex cursor-pointer items-center gap-2 font-medium text-[var(--primary-bg)]"
            onClick={() => {
              if (onAddQuestion) onAddQuestion(section);
            }}
          >
            <span className="text-xl">+</span>
            <TextElement className="text-[14px] font-[400] text-[var(--primary-text)] underline sm:text-[16px]">
              Add question
            </TextElement>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SectionFieldList;
