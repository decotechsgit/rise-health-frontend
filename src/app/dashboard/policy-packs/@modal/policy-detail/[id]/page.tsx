import { notFound } from "next/navigation";

import { policyService } from "@api/policy.service";
import PoliciesProceduresEditor from "@components/pages/dashboard/forms/policies-procedures/PoliciesProceduresEditor";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    copyId?: string;
    categoryId?: string;
    subcategoryId?: string;
    policyId?: string;
  }>;
}

const PoliciesProceduresPage = async ({ searchParams }: PageProps) => {
  const { categoryId, subcategoryId, policyId } = await searchParams;
  console.log("categoryId", categoryId);
  console.log("subcategoryId", subcategoryId);
  console.log("policyId", policyId);

  try {
    const policy = await policyService.getPolicy(
      policyId || "00000000-0000-0000-0000-000000000000"
    );
    console.log("policy", policy);

    return (
      <div className="p-6">
        <div className="prose max-w-none">
          <PoliciesProceduresEditor
            initialContent={policy.content}
            categoryId={categoryId || "e8b08a74-7353-4c02-b2d5-bd0926b7343b"}
            subcategoryId={
              subcategoryId || "4a50ee39-3099-4997-a616-bb6f0478f8c8"
            }
            policyId={policyId || ""}
            title={policy.title}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching policy:", error);
    return notFound();
  }
};

export default PoliciesProceduresPage;
