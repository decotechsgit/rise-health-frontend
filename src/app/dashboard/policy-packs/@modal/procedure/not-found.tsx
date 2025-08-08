import TextElement from "@/components/shared/typography/TextElement.typo";

const ProcedureNotFound = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 p-4 sm:p-8">
      <div className="text-center">
        <TextElement className="mb-2 text-4xl font-semibold text-gray-800">
          Forms Not Found
        </TextElement>
        <TextElement className="text-lg text-gray-600">
          No Forms Found for this procedure.
        </TextElement>
      </div>
    </div>
  );
};

export default ProcedureNotFound;
