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
          } rounded-2xl overflow-hidden hover:shadow-md hover:scale-[1.01]`}
        >
          <div className="p-4 cursor-pointer hover:bg-opacity-80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-[var(--color-compliance-subcategory-grey)] animate-pulse rounded-md" />
                <div className="h-5 w-40 bg-[var(--color-compliance-subcategory-grey)] animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandableListSkeleton;
