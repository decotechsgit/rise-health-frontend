import StepSkeleton from "./StepSkeleton";

const OnboardingPageSkeleton = ({ stepCount = 3 }) => {
  return (
    <div className="mx-auto w-[95%] animate-pulse">
      {/* Main Title Placeholder */}
      <div className="h-10 w-1/2 rounded-lg bg-gray-300"></div>

      <section className="mt-6 p-2">
        {/* Render multiple step skeletons */}
        {Array.from({ length: stepCount }).map((_, index) => (
          <StepSkeleton key={index} />
        ))}
      </section>
    </div>
  );
};

export default OnboardingPageSkeleton;
