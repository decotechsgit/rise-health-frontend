"use client";

const LoginPasswordSkeleton = () => {
  return (
    <>
      {/* Title skeleton */}
      <div className="mb-2 h-8 w-48 animate-pulse rounded-md bg-gray-200"></div>

      {/* Subtitle skeleton */}
      <div className="mt-2 mb-8 h-6 w-64 animate-pulse rounded-md bg-gray-200"></div>

      {/* Email display skeleton */}
      <div className="mt-4 mb-6">
        <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Password input skeleton */}
      <div className="mt-8 mb-2">
        <div className="mb-2 h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Forgot password skeleton */}
      <div className="my-4 flex justify-end">
        <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Button skeleton */}
      <div className="mt-6 h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
    </>
  );
};

export default LoginPasswordSkeleton;
