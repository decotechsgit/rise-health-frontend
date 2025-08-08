import Button from "@components/shared/button";
import TextElement from "@components/shared/typography/TextElement.typo";

export const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Long Text" },
  { value: "email", label: "Email" },
  { value: "file", label: "File" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "checkbox", label: "Checkbox" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
];

interface FieldTypeSelectorProps {
  onAddField: (type: string) => void;
}

const FieldTypeSelector = ({ onAddField }: FieldTypeSelectorProps) => (
  <div className="mb-4 rounded-lg bg-[var(--light-gray)] p-4">
    <TextElement className="mb-2 font-semibold text-[var(--primary-text)]">
      Add New Field:
    </TextElement>
    <div className="flex flex-wrap gap-2">
      {FIELD_TYPES.map((type) => (
        <Button
          key={type.value}
          title={`+ ${type.label}`}
          className="px-3 py-1 text-xs"
          handleOnClick={() => onAddField(type.value)}
        />
      ))}
    </div>
  </div>
);

export default FieldTypeSelector;
