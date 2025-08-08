import { notFound } from "next/navigation";

import { legislationService } from "@api/legislation.service";
import LegislationOverviewCard from "@components/pages/dashboard/forms/legislation/legislation-overview-card";

interface PageProps {
  searchParams: Promise<{ legislationId?: string }>;
}

const LegislationPage = async ({ searchParams }: PageProps) => {
  const { legislationId } = await searchParams;

  if (!legislationId) {
    return notFound();
  }

  try {
    const legislation = await legislationService.getById(legislationId);

    return (
      <LegislationOverviewCard
        firstItem={legislation}
        relatedItems={legislation.linkList}
      />
    );
  } catch (error) {
    console.error("Error fetching legislation:", error);
    return notFound();
  }
};

export default LegislationPage;
