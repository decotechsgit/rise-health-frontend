import { useRouter } from "next/navigation";
import { useState } from "react";

import { formCopyService } from "@api/form.copies.service";
import FieldPreview from "@components/pages/dashboard/forms/form-builder/FieldPreview";
import FieldSettingsView from "@components/pages/dashboard/forms/form-builder/FieldSettingsView";
import SectionFieldList from "@components/pages/dashboard/forms/form-builder/SectionFieldList";
import Button from "@components/shared/button";

import { FIELD_TYPES } from "./FieldTypeSelector";

interface FormBuilderProps {
  initialFields?: TFormField[];
  onCancel?: () => void;
  originalFormId?: string;
  formTitle?: string;
  formDescription?: string;
  isCopy?: boolean;
}

const getDefaultField = (type: string): FieldType => ({
  id: `field_${Date.now()}`,
  type,
  label: `Enter your question here`,
  placeholder: "Type your message...",
  required: false,
  sections: [],
  options:
    type === "select" || type === "radio"
      ? ["Option 1", "Option 2"]
      : undefined,
});

const FormBuilder = ({
  initialFields = [],
  onCancel,
  originalFormId,
  formTitle,
  formDescription,
  isCopy,
}: FormBuilderProps) => {
  const router = useRouter();
  const [fields, setFields] = useState<TFormField[]>(initialFields);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(
    null
  );
  const [originalFields, setOriginalFields] = useState<TFormField[] | null>(
    null
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Update a property of the selected field
  const updateSelectedField = (
    key: keyof FieldType,
    value: string | boolean | string[] | undefined
  ) => {
    if (selectedFieldIndex === null) return;
    setFields((prev) => {
      const updated = [...prev];
      updated[selectedFieldIndex] = {
        ...updated[selectedFieldIndex],
        [key]: value,
      };
      return updated;
    });
  };

  // Change field type
  const changeFieldType = (type: string) => {
    if (selectedFieldIndex === null) return;
    setFields((prev) => {
      const updated = [...prev];
      const old = updated[selectedFieldIndex];
      updated[selectedFieldIndex] = {
        ...old,
        type,
        options:
          type === "select" || type === "radio"
            ? ["Option 1", "Option 2"]
            : undefined,
      };
      return updated;
    });
  };

  // Save/cancel logic
  const handleSave = async () => {
    setIsSubmitting(true);
    setOriginalFields(fields);

    const formCopyPayload = {
      originalFormId: originalFormId || "",
      title: formTitle || "",
      description: formDescription || "",
      formBody: { fields },
    };

    try {
      if (isCopy) {
        await formCopyService.updateFormCopy(formCopyPayload);
      } else {
        await formCopyService.createFormCopy(formCopyPayload);
      }

      router.back();
    } catch (error) {
      console.error("Error creating form copy:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (originalFields) setFields(originalFields);
    setSelectedFieldIndex(null);
    if (onCancel) onCancel();
  };

  // Settings for the selected field
  const selectedField =
    selectedFieldIndex !== null ? fields[selectedFieldIndex] : null;

  // Group fields by section
  const sectionMap: Record<string, TFormField[]> = {};
  fields.forEach((field) => {
    const sections = field.sections?.length
      ? field.sections
      : ["Uncategorized"];
    sections.forEach((section) => {
      if (!sectionMap[section]) sectionMap[section] = [];
      sectionMap[section].push(field);
    });
  });
  const sortedSections = Object.keys(sectionMap);

  const handleFieldClick = (field: TFormField) => {
    const idx = fields.findIndex((f) => f.id === field.id);
    if (idx !== -1) setSelectedFieldIndex(idx);
  };

  const handleDeleteField = () => {
    if (selectedFieldIndex === null) return;
    setFields((prev) => {
      const updated = [...prev];
      updated.splice(selectedFieldIndex, 1);
      setSelectedFieldIndex(null);
      return updated;
    });
  };

  const handleAddQuestion = (section: string) => {
    const newField = getDefaultField("text");
    newField.sections = [section];
    setFields((prev) => {
      const updated = [...prev, newField];
      setSelectedFieldIndex(updated.length - 1); // select the new field
      return updated;
    });
  };

  // Add new section at the end
  const handleAddSection = () => {
    // Find all current section names
    const allSections = fields.flatMap((field) =>
      field.sections?.length ? field.sections : ["Uncategorized"]
    );
    // Generate a unique section name
    let nextNum = 1;
    let newSection = `Section ${nextNum}`;
    while (allSections.includes(newSection)) {
      nextNum += 1;
      newSection = `Section ${nextNum}`;
    }
    // Add a new field with a unique section name and a default label
    setFields((prev) => [
      ...prev,
      {
        id: `section_${Date.now()}`,
        type: "text",
        label: `Enter your question here`,
        placeholder: "Type your message...",
        required: false,
        sections: [newSection],
        options: [],
      },
    ]);
  };

  // Update all fields' sections arrays when a section name is changed
  const handleUpdateSectionName = (oldName: string, newName: string) => {
    setFields((prevFields) =>
      prevFields.map((field) => {
        // If renaming "Uncategorized", update fields with no sections or empty array
        if (
          (oldName === "Uncategorized" &&
            (!field.sections || field.sections.length === 0)) ||
          (field.sections && field.sections.includes(oldName))
        ) {
          return {
            ...field,
            sections:
              oldName === "Uncategorized"
                ? [newName]
                : field.sections!.map((s) => (s === oldName ? newName : s)),
          };
        }
        return field;
      })
    );
    setEditingSection(null);
  };

  return (
    <div className="scrollbar-none relative mx-auto max-h-[90vh] w-full max-w-full overflow-y-auto rounded-xl">
      <div className="flex min-h-screen flex-col bg-[var(--light-gray)]">
        <div className="flex-1">
          <div className="scrollbar-none flex w-full flex-col gap-4 overflow-y-auto lg:flex-row">
            {/* Left: Section/Field List */}
            <div className="w-full min-w-0 flex-1">
              <SectionFieldList
                sectionMap={sectionMap}
                sortedSections={sortedSections}
                fields={fields}
                setSelectedFieldIndex={setSelectedFieldIndex}
                onFieldClick={handleFieldClick}
                onAddQuestion={handleAddQuestion}
                onAddSection={handleAddSection}
                editingSection={editingSection}
                setEditingSection={setEditingSection}
                onUpdateSectionName={handleUpdateSectionName}
              />
            </div>
            {/* Center: Field Preview */}
            <div className="w-full min-w-0 flex-1">
              <FieldPreview field={selectedField} />
            </div>
            {/* Right: Field Settings */}
            {editingSection === null && (
              <div className="mb-32 w-full min-w-0 flex-1">
                <FieldSettingsView
                  selectedField={selectedField as FieldType | null}
                  fieldTypes={FIELD_TYPES}
                  onChangeType={changeFieldType}
                  onUpdateField={updateSelectedField}
                  onDelete={handleDeleteField}
                />
              </div>
            )}
          </div>
        </div>
        {/* Save/Cancel buttons fixed at bottom right */}
        <div className="fixed right-0 bottom-0 z-50 w-full border-[var(--border-gray)] bg-[var(--color-background-page-bg)] p-4 px-6 lg:w-auto lg:min-w-[220px] lg:px-1">
          <div className="flex justify-end gap-4">
            <Button
              title="Cancel"
              className="rounded-xl border-none bg-[var(--button-cancel-bg)] px-10 py-6 text-lg font-normal text-[var(--button-text)] shadow-none"
              handleOnClick={handleCancel}
            />
            <Button
              title="Save"
              className="rounded-xl border-none bg-[var(--button-save-bg)] px-10 py-6 text-lg font-normal text-[var(--button-text)] shadow-none"
              handleOnClick={handleSave}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
