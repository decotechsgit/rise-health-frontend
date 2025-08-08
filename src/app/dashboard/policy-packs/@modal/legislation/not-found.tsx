import TextElement from "@/components/shared/typography/TextElement.typo";

const LegislationNotFound = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 p-8">
      <div className="text-center">
        <TextElement className="mb-2 text-4xl font-semibold text-gray-800">
          Legislation Not Found
        </TextElement>
        <TextElement className="text-lg text-gray-600">
          The legislation you&apos;re looking for doesn&apos;t exist or has been
          removed or not available.
        </TextElement>
      </div>
    </div>
  );
};

export default LegislationNotFound;
