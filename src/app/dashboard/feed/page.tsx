import TextElement from "@/components/shared/typography/TextElement.typo";

const FeedPage = function () {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-800 p-6">
      <div className="space-y-2">
        <TextElement className="text-2xl font-semibold text-white">
          Activity Feed
        </TextElement>
        <TextElement as="p" className="max-w-xl text-gray-300">
          Coming Soon
          {/* Stay updated with the latest activities and updates in your
          organization. */}
        </TextElement>
      </div>
    </div>
  );
};

export default FeedPage;
