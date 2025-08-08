"use client";

const LoginSkeleton = () => {
  return (
    <>
      {/* Title skeleton */}
      <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse mb-2"></div>

      {/* Subtitle skeleton */}
      <div className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mt-2 mb-8"></div>

      {/* Email input skeleton */}
      <div className="mt-8 mb-2">
        <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Remember me checkbox skeleton */}
      <div className="flex items-center my-6">
        <div className="h-5 w-5 bg-gray-200 rounded-md animate-pulse mr-2"></div>
        <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>

      {/* Divider skeleton */}
      <div className="flex items-center w-full my-6">
        <div className="flex-grow h-2 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="mx-4 h-6 w-6 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex-grow h-2 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Google login button skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>

      {/* Sign up text skeleton */}
      <div className="flex justify-center items-center mt-8">
        <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mr-2"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </>
  );
};

export default LoginSkeleton;
