import TextElement from "../typography/TextElement.typo";

interface SectionValidationSummaryProps {
  sectionName: string;
  requiredFields: TFormField[];
}

const getStatus = (index: number) => {
  // For demo: alternate status for required fields: success, success, error
  if (index === 2) return "error";
  return "success";
};

const getStatusIcon = (status: string) => {
  if (status === "success")
    return (
      <svg
        className="h-5 w-5 text-[var(--color-compliance-green)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  if (status === "error")
    return (
      <svg
        className="h-5 w-5 text-[var(--color-risk-pink)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01"
        />
      </svg>
    );
  return null;
};

const SectionValidationSummary = ({
  sectionName,
  requiredFields,
}: SectionValidationSummaryProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[var(--color-compliance-subcategory-grey)] p-6 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        {/* The section number should be passed by parent if needed */}
        <TextElement className="font-semibold text-[var(--color-text-primary)]">
          {sectionName}
        </TextElement>
        <TextElement className="text-xs text-[var(--color-text-primary)]">
          {requiredFields.length > 0 ? "Required Fields" : "No required fields"}
        </TextElement>
      </div>
      {requiredFields.map((field, idx) => {
        const status = getStatus(idx);
        const requiredMsg = "This field is required";

        return (
          <div key={field.id} className="flex items-start gap-2">
            <span className="mt-1">{getStatusIcon(status)}</span>
            <div>
              <TextElement className="text-sm text-[var(--color-text-primary)]">
                {field.label}
              </TextElement>
              <TextElement
                className={`text-xs ${
                  status === "error"
                    ? "text-[var(--color-risk-pink)]"
                    : "text-[var(--color-compliance-green)]"
                }`}
              >
                {requiredMsg}
              </TextElement>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionValidationSummary;
