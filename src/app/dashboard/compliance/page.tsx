import TextElement from "@/components/shared/typography/TextElement.typo";

const CompliancePage = function () {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-800 p-6">
      <div className="space-y-2">
        <TextElement className="text-2xl font-semibold text-white">
          Compliance Management
        </TextElement>
        <TextElement as="p" className="max-w-xl text-gray-300">
          Coming Soon
          {/* Monitor and manage compliance requirements. Stay up to date with
          regulatory standards. */}
        </TextElement>
      </div>
    </div>
  );
};

export default CompliancePage;
