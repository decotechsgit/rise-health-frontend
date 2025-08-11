import React from "react";

const RegistrationGroupsTableSkeleton = () => {
  // Create array for skeleton rows (10 rows to match pagination)
  const skeletonRows = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className="mx-auto w-full max-w-7xl bg-white p-6">
      {/* Header Controls Skeleton */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        {/* Search Input Skeleton */}
        <div className="relative flex-1">
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200"></div>
        </div>

        {/* Filter Dropdown Skeleton */}
        <div className="relative">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full bg-white">
          {/* Table Header Skeleton */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="h-3 w-8 animate-pulse rounded bg-gray-200"></div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
              </th>
            </tr>
          </thead>

          {/* Table Body Skeleton */}
          <tbody className="divide-y divide-gray-200">
            {skeletonRows.map((index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Checkbox Column */}
                <td className="px-4 py-3">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                </td>

                {/* Registration No Column */}
                <td className="px-4 py-3">
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </td>

                {/* Registration Group Column */}
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </td>

                {/* Description Column */}
                <td className="max-w-md px-4 py-3">
                  <div className="space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </td>

                {/* Audit Type Column */}
                <td className="px-4 py-3">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls Skeleton */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Previous Button Skeleton */}
          <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>

          {/* Page Numbers Skeleton */}
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="h-9 w-9 animate-pulse rounded-md bg-gray-200"
              ></div>
            ))}
          </div>

          {/* Next Button Skeleton */}
          <div className="h-9 w-16 animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>

      {/* Results Info Skeleton */}
      <div className="mt-4 text-sm text-gray-600">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default RegistrationGroupsTableSkeleton;
