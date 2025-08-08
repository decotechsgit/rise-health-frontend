const StepSkeleton = () => {
    return (
        <div className='flex items-start gap-5 rounded-lg border border-gray-200 bg-white p-6 my-5 animate-pulse'>
            {/* Checkbox Placeholder */}
            <div className="flex-shrink-0 pt-0.5">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>

            {/* Text Section Placeholder */}
            <div className='flex flex-col w-full space-y-3'>
                {/* Title Placeholder */}
                <div className="h-6 w-4/5 bg-gray-300 rounded-md"></div>
                {/* Description Placeholder */}
                <div className="h-5 w-full bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );
};

export default StepSkeleton;