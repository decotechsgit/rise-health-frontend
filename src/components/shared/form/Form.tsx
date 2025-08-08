import { useState } from "react";
import { useForm } from "react-hook-form";

import TextElement from "../typography/TextElement.typo";

import FilePicker from "./FilePicker";
import LabeledInput from "./Labeled.input";
import LabeledRadio from "./Labeled.radio";
import LabeledSelect from "./Labeled.select";
import LabeledTextarea from "./Labeled.textarea";
import LabeledCheckbox from "./LabeledCheckBox.input";

interface FormsContentProps {
  formData: TFormField[];
  initialValues?: Record<string, string | boolean | number>;
  initialFiles?: Record<string, TFormFileData[]>;
  onSave?: (
    values: Record<string, string | boolean | number>,
    formData: TFormField[]
  ) => void;
  onSubmit?: (
    data: Record<string, string | boolean | number>,
    formData: TFormField[],
    fileFields: Record<string, File[]>,
    removedFiles: Record<string, TFormFileData[]>
  ) => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

interface TValidationRules {
  [key: string]: {
    value: boolean | RegExp;
    message: string;
  };
}

interface FormSectionProps {
  section: string;
  sectionIndex: number;
  requiredFields: TFormField[];
  formValues: Record<string, string | boolean | number>;
  dirtyFields: Record<string, boolean | undefined>;
}

interface Option {
  value: string;
  label: string;
}

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  if (status === "success") {
    return (
      <div className="relative my-0 mr-[6px] flex items-center justify-center md:my-[3px] lg:mr-[10px]">
        <input
          type="checkbox"
          defaultChecked={true}
          className="peer size-[14px] appearance-none rounded-full border border-[#2D2F32] checked:border-transparent checked:bg-black focus:outline-none lg:size-[18px]"
        />
        <svg
          className="pointer-events-none absolute hidden h-[10px] w-[10px] text-center text-white peer-checked:block lg:h-[14px] lg:w-[14px]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  if (status === "error") {
    return (
      <svg
        className="h-5 w-5 text-[var(--color-risk-pink)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="11" fill="var(--color-risk-pink)" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01"
          stroke="white"
        />
      </svg>
    );
  }

  return (
    <div className="relative my-0 mr-[6px] flex items-center justify-center md:my-[3px] lg:mr-[10px]">
      <div className="size-[14px] rounded-full border border-[#2D2F32] lg:size-[18px]" />
    </div>
  );
};

const FormSection: React.FC<FormSectionProps> = ({
  section,
  sectionIndex,
  requiredFields,
  formValues,
  dirtyFields,
}) => {
  const getFieldStatus = (field: TFormField) => {
    if (!field.required) return "success";
    if (!dirtyFields[field.id || ""]) return "pending";
    const value = formValues[field.id || ""];
    if (value === undefined || value === "" || value === false) return "error";
    return "success";
  };

  const getStatusMessage = (status: string) => {
    const messages = {
      pending: "Required field",
      error: "This field is required",
      success: "Field completed",
    };
    return messages[status as keyof typeof messages] || "";
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-[var(--color-compliance-subcategory-grey)] p-6 shadow-sm md:max-w-xs">
      <div className="mb-2 flex flex-nowrap items-center gap-2">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white font-semibold text-[var(--color-text-primary)]">
          {sectionIndex + 1}
        </span>
        <TextElement
          className="w-full truncate font-semibold text-[var(--color-text-primary)]"
          title={section}
        >
          {section}
        </TextElement>
      </div>
      {requiredFields.length === 0 && (
        <TextElement className="text-xs text-[var(--color-text-primary)]">
          No required fields
        </TextElement>
      )}
      {requiredFields.map((field: TFormField) => {
        const status = getFieldStatus(field);
        const statusMessage = getStatusMessage(status);
        return (
          <div key={field.id} className="flex items-start gap-2">
            <span className="mt-1">
              <StatusIcon status={status} />
            </span>
            <div>
              <TextElement className="text-sm font-[600] text-[var(--color-text-primary)]">
                {field.label}
              </TextElement>
              <TextElement
                className={`text-xs ${
                  status === "error"
                    ? "text-[var(--color-risk-pink)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {statusMessage}
              </TextElement>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const getValidationRules = (field: TFormField): TValidationRules => {
  const rules: TValidationRules = {};
  if (field.required === true || field.required === "true") {
    rules.required = {
      value: true,
      message: `${field.label} is required`,
    };
  }

  if (field.type === "number") {
    rules.pattern = {
      value: /^[0-9]*$/,
      message: "Please enter numbers only",
    };
  }

  if (field.type === "email") {
    rules.pattern = {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    };
  }

  return rules;
};

const FormsContent = function ({
  formData,
  onSave,
  onSubmit,
  formRef,
  initialValues,
  initialFiles,
}: FormsContentProps) {
  const sectionMap: Record<string, TFormField[]> = {};
  console.log("formData", formData);
  formData.forEach((field) => {
    const sections = field.sections?.length
      ? field.sections
      : ["Uncategorized"];
    sections.forEach((section) => {
      if (!sectionMap[section]) sectionMap[section] = [];
      sectionMap[section].push(field);
    });
  });

  const sortedSections = Object.keys(sectionMap);

  const normalizedInitialValues = Object.fromEntries(
    Object.entries(initialValues || {}).map(([key, value]) => [
      key,
      value === "true" ? true : value === "false" ? false : value,
    ])
  );

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: normalizedInitialValues,
  });

  const formValues = watch();

  const [fileFields, setFileFields] = useState<Record<string, File[]>>({});

  const [removedFiles, setRemovedFiles] = useState<
    Record<string, TFormFileData[]>
  >({});

  const handleFileChange = (fieldId: string, files: File[]) => {
    setFileFields((prev) => ({
      ...prev,
      [fieldId]: files,
    }));
  };

  const handleRemoveRemoteFile = (fieldId: string, file: TFormFileData) => {
    setRemovedFiles((prev) => ({
      ...prev,
      [fieldId]: [...(prev[fieldId] || []), file],
    }));
  };

  const handleFormSubmit = (
    data: Record<string, string | boolean | number>
  ) => {
    const formDataObj = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formDataObj.append(key, value.toString());
    });

    Object.entries(fileFields).forEach(([fieldId, files]) => {
      files.forEach((file, index) => {
        formDataObj.append(`files[${fieldId}][${index}]`, file);
      });
    });

    console.log("removedFiles", removedFiles);
    console.log("fileFields", fileFields);

    onSave?.(data, formData);
    onSubmit?.(data, formData, fileFields, removedFiles);
  };

  const renderField = (field: TFormField) => {
    const commonProps = {
      name: field.id || "",
      placeHolder: field.placeholder || "",
      register,
      errors,
      validationRules: getValidationRules(field),
    };

    const formatOptions = (options: string[]): Option[] => {
      return options.map((option) => ({
        value: option,
        label: option,
      }));
    };

    switch (field.type) {
      case "text":
        return (
          <LabeledInput
            {...commonProps}
            type="text"
            isForm={true}
            className="w-full rounded-md border border-gray-400 p-2"
            defaultValue=""
          />
        );
      case "textarea":
        return (
          <LabeledTextarea
            {...commonProps}
            className="w-full rounded-md border border-gray-400 p-2 focus:border-black focus:outline-none"
            defaultValue=""
            formClassName="bg-none focus:bg-white border-[1px] border-[#525558] text-[#272725] font-[400] rounded-[8px] w-full outline-slate-500 p-[8px] lg:p-[12px] leading-[26px] text-[12px] lg:text-[16px] placeholder:font-[400] placeholder:text-[#525558"
          />
        );
      case "email":
        return (
          <LabeledInput
            {...commonProps}
            type="email"
            isForm={true}
            className="w-full rounded-md border border-gray-400 p-2"
            defaultValue=""
          />
        );
      case "date":
        return (
          <LabeledInput
            {...commonProps}
            type="date"
            isForm={true}
            className="w-full rounded-md border border-gray-400 p-2"
            defaultValue=""
          />
        );
      case "number":
        return (
          <LabeledInput
            {...commonProps}
            type="text"
            isForm={true}
            className="w-full [appearance:textfield] rounded-md border border-gray-400 p-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            defaultValue=""
          />
        );
      case "checkbox":
        return (
          <LabeledCheckbox
            {...commonProps}
            options={formatOptions(field.options as string[])}
            initialValues={initialValues}
            label={field.label}
            rules={getValidationRules(field)}
          />
        );
      case "file":
        return field.id ? (
          <FilePicker
            fieldId={field.id}
            onFileChange={handleFileChange}
            onFileRemove={() => handleFileChange(field.id || "", [])}
            initialFiles={initialFiles?.[`files[${field.id}]`] || []}
            onRemoveRemoteFile={handleRemoveRemoteFile}
          />
        ) : null;
      case "select":
        return (
          <LabeledSelect
            id={field.id || ""}
            {...commonProps}
            options={formatOptions(field.options || [])}
            className="w-full rounded-md border border-gray-400 p-2"
          />
        );
      case "radio":
        return (
          <LabeledRadio
            {...commonProps}
            options={formatOptions(field.options || [])}
            className="space-y-2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="scrollbar-none flex h-screen flex-col gap-4 overflow-y-auto bg-[var(--color-background-page-bg)] pt-4 pb-70"
    >
      {sortedSections.map((section, sectionIdx) => {
        const requiredFields = sectionMap[section]?.filter(
          (field) => field.required === true || field.required === "true"
        );
        return (
          <div
            key={section}
            className="mb-6 flex flex-row flex-wrap gap-2 md:flex-nowrap md:gap-6"
          >
            <FormSection
              section={section}
              sectionIndex={sectionIdx}
              requiredFields={requiredFields}
              formValues={formValues}
              dirtyFields={dirtyFields}
            />
            <div className="flex-1 space-y-4 rounded-xl bg-[var(--color-compliance-subcategory-grey)] p-6 shadow-sm">
              <TextElement className="mb-6 border-l-4 border-black pl-2 text-lg font-semibold">
                {section}
              </TextElement>
              {sectionMap[section].map((field) => (
                <div key={field.id} className="space-y-1">
                  {
                    <TextElement className="block text-sm font-medium">
                      {field.label}
                    </TextElement>
                  }
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default FormsContent;
