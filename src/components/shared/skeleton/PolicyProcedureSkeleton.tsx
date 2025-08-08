import { Skeleton } from "@/components/ui/skeleton";

const PolicyProcedureSkeleton = () => (
  <div className="min-h-screen bg-[var(--color-background-page-bg)] p-4 sm:p-8">
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-white px-4 py-4 shadow-sm sm:px-8"
        >
          <Skeleton className="h-6 w-1/3 rounded sm:w-1/4" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export default PolicyProcedureSkeleton;
