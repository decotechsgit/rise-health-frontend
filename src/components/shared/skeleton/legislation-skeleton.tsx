import { Skeleton } from "@/components/ui/skeleton";

const LegislationSkeleton = () => {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-4 sm:p-8">
      {/* Title skeleton */}
      <div className="mb-6">
        <Skeleton className="mb-2 h-8 w-2/3" />
      </div>
      {/* Overview card skeleton */}
      <div className="mb-8 flex flex-col gap-2 rounded-xl bg-[var(--card-bg)] p-6 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-6" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </div>
      {/* Related Documentation title skeleton */}
      <Skeleton className="mb-4 h-6 w-1/4" />
      {/* Accordion skeletons */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="rounded-xl bg-[var(--card-bg)] shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-5" />
            </div>
            {/* Expanded content skeleton (show for first item as example) */}
            {idx === 0 && (
              <div className="px-6 pb-6">
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegislationSkeleton;
