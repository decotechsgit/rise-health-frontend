import { notFound } from "next/navigation";

import { formCopyService } from "@api/form.copies.service";
import { formService } from "@api/form.service";
import { formSubmissionService } from "@api/form.submission.service";
import FormContainer from "@components/pages/dashboard/forms/FormContainer";

interface FormModalProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    copyId?: string;
    status?: string;
    isCopy?: boolean;
    formId?: string;
  }>;
}

async function getFormData(id: string, copyId?: string, status?: string) {
  try {
    if (copyId) {
      if (status === "submitted") {
        const response =
          await formSubmissionService.getSubmissionByFormCopyId(copyId);
        return response as TFormData;
      } else {
        const response = await formCopyService.getFormCopyById(copyId);
        return response as TFormData;
      }
    } else {
      const response = await formService.getFormById(id);
      return response as TFormData;
    }
  } catch (error) {
    console.error("Error fetching form:", error);
    return notFound();
  }
}

const FormModal = async ({ searchParams }: FormModalProps) => {
  const { copyId, status, isCopy, formId } = await searchParams;

  const formData = await getFormData(formId || "", copyId, status);

  if (!formData) {
    return null;
  }
  return <FormContainer formData={formData} isCopy={isCopy} status={status} />;
};

export default FormModal;
