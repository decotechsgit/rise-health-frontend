import TextElement from "@components/shared/typography/TextElement.typo";

interface FieldPreviewProps {
  field: TFormField | null;
}

const inputClass =
  "w-full rounded-[8px] border-[1px] border-[var(--border-input)] text-[14px] text-[var(--primary-text)] sm:text-[16px]";
const labelClass =
  "max-h-[200px] w-full overflow-y-auto text-[14px] font-[400] break-words whitespace-normal text-[var(--primary-text)] sm:text-[16px]";

function renderInput(field: TFormField) {
  const commonProps = {
    className: `${inputClass} p-2 sm:p-3`,
    placeholder: field.placeholder,
    disabled: true,
  };
  switch (field.type) {
    case "text":
      return <input type="text" {...commonProps} />;
    case "email":
      return <input type="email" {...commonProps} />;
    case "number":
      return <input type="number" {...commonProps} />;
    case "date":
      return <input type="date" {...commonProps} />;
    case "textarea":
      return (
        <textarea
          className={`${inputClass} px-2 py-1 sm:px-3 sm:py-2`}
          placeholder={field.placeholder}
          disabled
        />
      );
    default:
      return null;
  }
}

function renderOptions(field: TFormField) {
  if (!field.options) return null;
  if (field.type === "select") {
    return (
      <select className={`${inputClass} px-2 py-1 sm:px-3 sm:py-2`} disabled>
        {field.options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </select>
    );
  }
  if (field.type === "radio") {
    return (
      <div className="flex flex-col gap-1">
        {field.options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input type="radio" disabled className="h-4 w-4 sm:h-5 sm:w-5" />
            <TextElement className="text-[14px] text-[var(--primary-text)] sm:text-[16px]">
              {opt}
            </TextElement>
          </label>
        ))}
      </div>
    );
  }
  return null;
}

const FieldPreview = ({ field }: FieldPreviewProps) => {
  if (!field) {
    return (
      <div className="mx-auto flex w-full max-w-[400px] min-w-[200px] flex-col items-center rounded-lg pt-7 sm:max-w-[500px] md:max-w-[600px]">
        <TextElement className="text-[var(--primary-text)] opacity-60">
          Select a field to preview
        </TextElement>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full min-w-0 flex-1 flex-col items-start rounded-lg pt-7">
      {/* Header row: radio icon + label */}
      <div className="mb-6 flex w-full items-start justify-between">
        <div className="flex w-full items-start gap-2 sm:gap-3">
          <span className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--primary-text)] bg-white sm:h-6 sm:w-6">
              <span className="block h-4 w-5 rounded-full border-4 border-white bg-black sm:h-5 sm:w-6"></span>
            </span>
          </span>
          <TextElement className={labelClass}>{field.label}</TextElement>
        </div>
      </div>
      {renderInput(field)}
      {field.type === "checkbox" && (
        <div className="flex items-center gap-2">
          <input type="checkbox" disabled className="h-4 w-4 sm:h-5 sm:w-5" />
          <TextElement className="text-[14px] text-[var(--primary-text)] sm:text-[16px]">
            {field.placeholder}
          </TextElement>
        </div>
      )}
      {field.type === "file" && (
        <div className="w-full space-y-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <label className="flex cursor-not-allowed items-center gap-1 rounded-md border border-gray-400 px-2 py-1 opacity-50 sm:gap-2 sm:px-4 sm:py-2">
              <span className="text-xs text-gray-600 sm:text-sm">
                Choose File
              </span>
            </label>
          </div>
        </div>
      )}
      {(field.type === "select" || field.type === "radio") && field.options && (
        <div className="mt-2 w-full">{renderOptions(field)}</div>
      )}
    </div>
  );
};

export default FieldPreview;
