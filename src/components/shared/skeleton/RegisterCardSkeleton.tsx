import React from "react";

const RegisterCardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-12 rounded-2xl bg-white p-4">
      {/* Title skeleton */}
      <div className="h-5 w-3/4 rounded bg-gray-200"></div>

      {/* Footer skeleton with date and status */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        <div className="h-6 w-1/4 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default RegisterCardSkeleton;
