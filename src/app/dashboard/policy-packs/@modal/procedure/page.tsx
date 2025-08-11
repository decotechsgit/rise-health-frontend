import { notFound } from "next/navigation";

import { formCopyService } from "@api/form.copies.service";
import { formService } from "@api/form.service";
import ProcedureList from "@components/pages/dashboard/forms/procedure/ProcedureList";

interface FormModalProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    copyId?: string;
    status?: string;
    isCopy?: boolean;
    formId?: string;
    category?: string;
    selected?: string;
    subcategoryId?: string;
    categoryId?: string;
    policyId?: string;
    legislationId?: string;
    referenceId?: string;
    referenceType?: string;
  }>;
}

const FormProcedure = async ({ searchParams }: FormModalProps) => {
  const rawParams = await searchParams;
  const { subcategoryId, isCopy, referenceId, referenceType } = rawParams;
  const stringParams = Object.fromEntries(
    Object.entries(rawParams).map(([k, v]) => [k, v?.toString() ?? ""])
  );
  const queryString = new URLSearchParams(stringParams).toString();

  let forms: TFormData[] = [];
  try {
    if (!subcategoryId && !referenceId)
      throw new Error("No subcategoryId or referenceId provided");
    const apiForms = isCopy
      ? await formCopyService.getAllFormCopies(
          referenceId as string,
          referenceType as string
        )
      : await formService.getAllForms(
          referenceId as string,
          referenceType as string
        );

    if (!apiForms?.length) {
      throw new Error("No forms found");
    }

    forms = isCopy
      ? apiForms.map((form) => ({
          id: form.id,
          title: form.title ?? "",
          description: form.description ?? "",
          formBody: form.formBody ?? { fields: [] },
          status: form.status,
          originalFormId: form.originalFormId ?? "",
          providerId: form.providerId ?? "",
        }))
      : apiForms;
  } catch {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-page-bg)] p-8">
      <ProcedureList forms={forms} queryString={queryString} />
    </div>
  );
};

export default FormProcedure;
