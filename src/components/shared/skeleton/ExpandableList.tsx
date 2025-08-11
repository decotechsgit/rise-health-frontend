const ExpandableListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className={`transition-all duration-200 ${
            index % 2 === 0
              ? "bg-[var(--color-compliance-subcategory-grey)]"
              : "bg-white"
          } overflow-hidden rounded-2xl hover:scale-[1.01] hover:shadow-md`}
        >
          <div className="hover:bg-opacity-80 cursor-pointer p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 animate-pulse rounded-md bg-[var(--color-compliance-subcategory-grey)]" />
                <div className="h-5 w-40 animate-pulse rounded bg-[var(--color-compliance-subcategory-grey)]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandableListSkeleton;
