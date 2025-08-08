import { Skeleton } from "@components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6">
      <div className="prose max-w-none">
        {/* Title skeleton */}
        <Skeleton className="mb-6 h-8 w-1/2" />
        {/* Editor skeleton */}
        <div className="relative h-[80vh] min-h-[500px] max-w-none rounded bg-white shadow">
          <Skeleton className="mb-4 h-[85%] w-full" />
          {/* Button skeletons at bottom right */}
          <div className="absolute right-0 bottom-0 flex gap-2 p-4">
            <Skeleton className="h-12 w-24 rounded-xl" />
            <Skeleton className="h-12 w-24 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
