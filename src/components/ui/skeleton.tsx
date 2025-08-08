import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[var(--color-compliance-subcategory-grey)]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
