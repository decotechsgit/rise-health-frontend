import { Suspense } from "react";

import { onboardingService } from "@api/onboarding.service";
import MediaViewer from "@components/pages/dashboard/onboarding/MediaViewer";

interface PageSearchParams {
  id: string;
  title?: string;
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) => {
  const { id, title } = await searchParams;

  const progress = await onboardingService.getOnboardingProgress();

  const mediaData =
    progress?.progress?.uploads?.receive_file_upload?.[id] || [];

  return (
    <section className="absolute top-0 right-0 z-50 h-full w-full bg-transparent">
      {mediaData.length > 0 ? (
        <Suspense fallback={<div>Loading Viewer...</div>}>
          <MediaViewer mediaData={mediaData} title={title || "Media Viewer"} />
        </Suspense>
      ) : (
        <div>No uploaded media found for this ID.</div>
      )}
    </section>
  );
};

export default Page;
