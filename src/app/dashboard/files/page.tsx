import TextElement from "@/components/shared/typography/TextElement.typo";

const FilesPage = function () {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-800 p-6">
      <div className="space-y-2">
        <TextElement className="text-2xl font-semibold text-white">
          File Management
        </TextElement>
        <TextElement as="p" className="max-w-xl text-gray-300">
          Coming Soon
          {/* Access and manage your important files and documents in one
          centralized location. */}
        </TextElement>
      </div>
    </div>
  );
};

export default FilesPage;
