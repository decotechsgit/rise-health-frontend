import Button from "@components/shared/button";
import TextElement from "@components/shared/typography/TextElement.typo";

interface FieldSettingsViewProps {
  selectedField: FieldType | null;
  fieldTypes: { value: string; label: string }[];
  onChangeType: (type: string) => void;
  onUpdateField: (
    key: keyof FieldType,
    value: string | boolean | string[] | undefined
  ) => void;
  onDelete?: () => void;
}

const FieldSettingsView = ({
  selectedField,
  fieldTypes,
  onChangeType,
  onUpdateField,
  onDelete,
}: FieldSettingsViewProps) => {
  if (!selectedField) {
    return (
      <div className="flex w-full max-w-md flex-col items-center rounded-lg pt-7">
        <TextElement className="text-[var(--primary-text)] opacity-60">
          Select a field to edit settings
        </TextElement>
      </div>
    );
  }

  return (
    <div className="flex h-[60vh] w-full min-w-0 flex-1 flex-col gap-4 overflow-y-auto rounded-lg pt-7 pl-2">
      <TextElement className="text-[16px] font-[600] text-[var(--primary-text)]">
        Question Settings
      </TextElement>
      {selectedField ? (
        <>
          <div>
            <TextElement className="mb-1 text-[14px] font-[400] text-[var(--primary-text)] sm:text-[16px]">
              Type
            </TextElement>
            <select
              className="mb-2 w-full rounded-[8px] border-[1px] border-[var(--border-input)] p-2 text-[14px] sm:text-[16px]"
              value={selectedField.type}
              onChange={(e) => onChangeType(e.target.value)}
            >
              {fieldTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <TextElement className="mb-1 text-[14px] font-[400] text-[var(--primary-text)] sm:text-[16px]">
              Label
            </TextElement>
            <input
              className="mb-2 w-full rounded-[8px] border-[1px] border-[var(--border-input)] p-2 text-[14px] sm:p-3 sm:text-[16px]"
              value={selectedField.label}
              onChange={(e) => onUpdateField("label", e.target.value)}
            />
          </div>
          <div>
            <TextElement className="mb-1 text-[14px] font-[400] text-[var(--primary-text)] sm:text-[16px]">
              Placeholder
            </TextElement>
            <input
              className="mb-2 w-full rounded-[8px] border-[1px] border-[var(--border-input)] p-2 text-[14px] sm:p-3 sm:text-[16px]"
              value={selectedField.placeholder}
              onChange={(e) => onUpdateField("placeholder", e.target.value)}
            />
          </div>
          {(selectedField.type === "select" ||
            selectedField.type === "radio") && (
            <div>
              <TextElement className="mb-1 text-xs font-semibold text-[var(--primary-text)]">
                Options
              </TextElement>
              {selectedField.options?.map((opt: string, idx: number) => (
                <div key={idx} className="mb-1 flex items-center gap-2">
                  <input
                    className="flex-1 rounded border border-[var(--border-gray)] px-2 py-2"
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...(selectedField.options || [])];
                      newOptions[idx] = e.target.value;
                      onUpdateField("options", newOptions);
                    }}
                  />
                  <Button
                    title="×"
                    className="flex h-[40px] w-[36px] items-center justify-center rounded-md bg-[var(--danger)] text-base text-white"
                    handleOnClick={() => {
                      const newOptions = [...(selectedField.options || [])];
                      newOptions.splice(idx, 1);
                      onUpdateField("options", newOptions);
                    }}
                  />
                </div>
              ))}
              <Button
                title="Add Option"
                className="mt-1 px-2 py-1 text-xs"
                handleOnClick={() => {
                  onUpdateField("options", [
                    ...(selectedField.options || []),
                    `Option ${(selectedField.options?.length || 0) + 1}`,
                  ]);
                }}
              />
            </div>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <TextElement className="text-xs text-[var(--primary-text)]">
              Required
            </TextElement>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={
                  selectedField.required === true ||
                  selectedField.required === "true"
                }
                onChange={(e) => onUpdateField("required", e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-[var(--color-compliance-subcategory-grey)] peer-checked:bg-black peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <div className="mt-4 border-[var(--border-gray)]">
            <Button
              title="Delete Field"
              className="w-full rounded-lg px-4 text-white"
              handleOnClick={onDelete}
              lgHeight="45px"
            />
          </div>
        </>
      ) : (
        <TextElement className="text-[var(--primary-text)] opacity-60">
          Select a field to edit settings
        </TextElement>
      )}
    </div>
  );
};

export default FieldSettingsView;
