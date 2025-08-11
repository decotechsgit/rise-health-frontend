import { onboardingService } from "@api/onboarding.service";
import SummaryCheckBox from "@components/pages/dashboard/onboarding/main-content/SummaryCheckBox";
import MediaSection from "@components/pages/dashboard/onboarding/summary/MediaSection";
import SelectedRegistrationGroups from "@components/pages/dashboard/onboarding/summary/SelectedRegistrationGroups";
import SuggestedPacks from "@components/pages/dashboard/onboarding/summary/SuggestedPacks";
import TextElement from "@components/shared/typography/TextElement.typo";

const Summary = async ({ steps }: { steps: Promise<Step[]> }) => {
  const res = await steps;
  const progress = await onboardingService.getOnboardingProgress();
  const registrationGroups = await onboardingService.getRegistrationGroups();
  const suggestedPackages =
    await onboardingService.getPackagesLinkedWithSelectedGroups();
  const selectedRegistrationIds =
    progress.progress?.registrations?.prepare_registration_select;

  let uploadedMediaIds: string[], mediaSections;
  let completedSteps: string[] | undefined = [];
  if (progress) {
    completedSteps = progress.progress?.completedSteps;
    uploadedMediaIds = progress.progress?.uploads?.receive_file_upload
      ? Object.keys(progress.progress?.uploads?.receive_file_upload)
      : [];
    mediaSections = res.flatMap(
      (item) =>
        item.children &&
        item.children
          .filter((child) => uploadedMediaIds.includes(child.id))
          .map((child) => ({
            title: item.title,
            id: child.id,
          }))
    );
  }
  const selectedGroups = registrationGroups.filter(
    (item) => selectedRegistrationIds?.[item.id]
  );
  return (
    <div>
      <TextElement
        as="h1"
        className="w-full !text-[20px] !font-normal sm:!text-[28px] lg:!text-[35px]"
      >
        Summary
      </TextElement>
      <section className="flex flex-wrap justify-between xl:flex-nowrap">
        <div className="flex-2/3">
          {completedSteps &&
            res.map((step: Step) => {
              return <SummaryCheckBox step={step} key={step.id} />;
            })}
        </div>
        <aside className="flex-1/3 p-4">
          <SelectedRegistrationGroups selectedGroups={selectedGroups} />
          {mediaSections && mediaSections.length > 0 && (
            <MediaSection medias={mediaSections} />
          )}
          {suggestedPackages && suggestedPackages.length > 0 && (
            <SuggestedPacks suggestedPackages={suggestedPackages} />
          )}
        </aside>
      </section>
    </div>
  );
};
export default Summary;
