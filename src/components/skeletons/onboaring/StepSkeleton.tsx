const StepSkeleton = () => {
  return (
    <div className="my-5 flex animate-pulse items-start gap-5 rounded-lg border border-gray-200 bg-white p-6">
      {/* Checkbox Placeholder */}
      <div className="flex-shrink-0 pt-0.5">
        <div className="h-6 w-6 rounded bg-gray-300"></div>
      </div>

      {/* Text Section Placeholder */}
      <div className="flex w-full flex-col space-y-3">
        {/* Title Placeholder */}
        <div className="h-6 w-4/5 rounded-md bg-gray-300"></div>
        {/* Description Placeholder */}
        <div className="h-5 w-full rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
};

export default StepSkeleton;
