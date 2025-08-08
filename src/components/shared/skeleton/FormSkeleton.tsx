const FormSkeleton = () => {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl bg-[var(--color-compliance-subcategory-grey)] p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full] flex h-7 w-7 items-center justify-center font-semibold text-[var(--color-text-primary)]"></span>
          <div>
            <div className="mb-1 h-4 w-24 animate-pulse rounded bg-gray-300" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        {[1, 2]?.map((field) => (
          <div key={field} className="flex items-start gap-2">
            {/* No icon here, just UI blocks */}
            <div>
              <div className="mb-1 h-3 w-28 animate-pulse rounded bg-gray-300" />
              <div className="h-3 w-32 animate-pulse rounded bg-[var(--color-compliance-subcategory-grey)]" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-4 pb-60">
        {[1, 2].map((section) => (
          <div
            key={section}
            className="space-y-4 rounded-xl bg-gray-200 p-6 shadow-sm"
          >
            <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-300" />
            {[1, 2, 3].map((field) => (
              <div key={field} className="space-y-2">
                <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-300" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSkeleton;
