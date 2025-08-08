"use client";

const LoginPasswordSkeleton = () => {
  return (
    <>
      {/* Title skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>

      {/* Subtitle skeleton */}
      <div className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mt-2 mb-8"></div>

      {/* Email display skeleton */}
      <div className="mt-4 mb-6">
        <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Password input skeleton */}
      <div className="mt-8 mb-2">
        <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Forgot password skeleton */}
      <div className="flex justify-end my-4">
        <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse mt-6"></div>
    </>
  );
};

export default LoginPasswordSkeleton;
