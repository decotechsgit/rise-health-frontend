"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { formSubmissionService } from "@/services/api/form.submission.service";

import FormBuilder from "@/app/dashboard/policy-packs/form-builder/FormBuilder";
import { formCopyService } from "@api/form.copies.service";
import Button from "@components/shared/button";
import FormsContent from "@components/shared/form/Form";
import TextElement from "@components/shared/typography/TextElement.typo";

const FormContainer = ({
  formData,
  isCopy,
  status,
}: {
  formData: TFormData;
  isCopy?: boolean;
  status?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const formCopy = formData.formCopy ? formData.formCopy : formData;

  const createFormSubmission = async ({
    formCopyId,
    data,
    files,
    removedFiles,
  }: {
    formCopyId: string;
    data: Record<string, string | boolean | number>;
    formFields: TFormField[];
    files?: Record<string, File[]>;
    removedFiles?: Record<string, TFormFileData[]>;
  }) => {
    setIsSubmitting(true);
    try {
      let finalFormCopyId = formCopyId;

      // Create a form copy if not a copy
      if (!isCopy) {
        const { id } = await formCopyService.createFormCopy({
          originalFormId: formData.id,
          title: formData.title || "",
          description: formData.description || "",
          formBody: { fields: formData.formBody?.fields || [] },
        });
        finalFormCopyId = id;
      }

      // Create or update submission
      if (status !== "submitted") {
        await formSubmissionService.createFormSubmission({
          formCopyId: finalFormCopyId,
          data,
          files,
          removedFiles,
        });
      } else {
        await formSubmissionService.updateFormSubmission(formData.id, {
          data,
          files,
          removedFiles,
        });
      }

      router.back();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (
    data: Record<string, string | number | boolean>,
    formFields: TFormField[],
    files?: Record<string, File[]>,
    removedFiles?: Record<string, TFormFileData[]>
  ) => {
    createFormSubmission({
      formCopyId: formData.id,
      data,
      formFields,
      files,
      removedFiles,
    });
  };

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="flex flex-col">
      {!isEditing && (
        <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:mt-4">
          <div>
            <TextElement className="pl-0.9 pl-1 text-[12px] leading-[150%] font-[500] tracking-[0%] md:text-[16px] lg:text-[20px]">
              {formData.title}
            </TextElement>
            <TextElement className="pl-0.9 pl-1 text-[12px] leading-[150%] font-[400] tracking-[0%] md:text-[16px] lg:text-[18px]">
              {formData.description}
            </TextElement>
          </div>
          <div className="flex gap-2">
            <Button
              title="Save"
              type="submit"
              handleOnClick={handleSaveClick}
              className="rounded-xl border-none bg-[var(--button-save-bg)] px-5 py-1 text-lg font-normal text-[var(--button-text)] shadow-none md:px-6 md:py-2"
              btnClassName="!text-[14px] md:!text-[16px] lg:!text-[20px]"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              title={isEditing ? "Cancel" : "Edit"}
              handleOnClick={() => setIsEditing((prev) => !prev)}
              className="rounded-xl border-none bg-[var(--button-save-bg)] px-5 py-1 text-lg font-normal text-[var(--button-text)] shadow-none md:px-6 md:py-2"
              btnClassName="!text-[14px] md:!text-[16px] lg:!text-[20px]"
              disabled={isSubmitting}
            />
          </div>
        </div>
      )}

      {isEditing ? (
        status === "submitted" ? (
          <FormBuilder
            initialFields={formCopy.formBody?.fields || []}
            onCancel={() => setIsEditing(false)}
            originalFormId={formCopy.id}
            formTitle={formCopy.title}
            isCopy={isCopy}
            formDescription={formData.description}
          />
        ) : (
          <FormBuilder
            initialFields={formData.formBody?.fields || []}
            onCancel={() => setIsEditing(false)}
            originalFormId={formData.id}
            formTitle={formData.title}
            isCopy={isCopy}
            formDescription={formData.description}
          />
        )
      ) : (
        <FormsContent
          formData={formData.formBody?.fields || []}
          onSubmit={handleFormSubmit}
          formRef={formRef}
          initialValues={formData.data?.fields}
          initialFiles={
            formData.data?.files as unknown as Record<string, TFormFileData[]>
          }
        />
      )}
    </div>
  );
};

export default FormContainer;
