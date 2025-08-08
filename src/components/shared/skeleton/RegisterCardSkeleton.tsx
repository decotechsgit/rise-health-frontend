import React from 'react';

const RegisterCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 space-y-12 animate-pulse">
      {/* Title skeleton */}
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      
      {/* Footer skeleton with date and status */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
      </div>
    </div>
  );
};

export default RegisterCardSkeleton;