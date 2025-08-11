import { notFound } from "next/navigation";

import { policyService } from "@/services/api/policy.service";

import { policyCopiesService } from "@api/policy.copies.service";
import PolicyList from "@components/pages/dashboard/forms/policies/PolicyList";

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

const PolicyModal = async ({ searchParams }: FormModalProps) => {
  const rawParams = await searchParams;
  const { subcategoryId, isCopy, referenceId, referenceType } = rawParams;
  const stringParams = Object.fromEntries(
    Object.entries(rawParams).map(([k, v]) => [k, v?.toString() ?? ""])
  );
  const queryString = new URLSearchParams(stringParams).toString();

  let policies: TPolicy[] = [];
  try {
    if (!subcategoryId && !referenceId)
      throw new Error("No subcategoryId or referenceId provided");
    let apiResult;
    if (referenceId && referenceType) {
      if (isCopy) {
        apiResult = await policyCopiesService.getPolicyCopies(
          referenceId,
          referenceType
        );
      } else {
        apiResult = await policyService.getPoliciesBySubcategoryId(
          referenceId,
          referenceType
        );
      }
    }
    policies = apiResult?.items ?? [];
    if (policies.length === 0) {
      return notFound();
    }
  } catch {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-page-bg)] px-3 py-8">
      <PolicyList policies={policies} queryString={queryString} />
    </div>
  );
};

export default PolicyModal;
