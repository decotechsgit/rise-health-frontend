"use client";

const LoginSkeleton = () => {
  return (
    <>
      {/* Title skeleton */}
      <div className="mb-2 h-8 w-24 animate-pulse rounded-md bg-gray-200"></div>

      {/* Subtitle skeleton */}
      <div className="mt-2 mb-8 h-6 w-64 animate-pulse rounded-md bg-gray-200"></div>

      {/* Email input skeleton */}
      <div className="mt-8 mb-2">
        <div className="mb-2 h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Remember me checkbox skeleton */}
      <div className="my-6 flex items-center">
        <div className="mr-2 h-5 w-5 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>

      {/* Divider skeleton */}
      <div className="my-6 flex w-full items-center">
        <div className="h-2 flex-grow animate-pulse rounded-md bg-gray-200"></div>
        <div className="mx-4 h-6 w-6 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-2 flex-grow animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Google login button skeleton */}
      <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>

      {/* Sign up text skeleton */}
      <div className="mt-8 flex items-center justify-center">
        <div className="mr-2 h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200"></div>
      </div>
    </>
  );
};

export default LoginSkeleton;
