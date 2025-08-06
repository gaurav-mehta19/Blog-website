export const Skleton2 = () => {
    return (
        <div className="p-4 sm:p-6 md:px-10 lg:mx-48">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content Skeleton */}
                <div className="md:col-span-2 w-full">
                    <div className="h-10 md:h-12 bg-bg-tertiary loading-skeleton rounded-md mt-6 md:mt-8 mb-4 w-3/4"></div>
                    <div className="bg-bg-tertiary w-40 h-6 md:h-7 rounded-md loading-skeleton mb-4"></div>
                    <div className="bg-bg-tertiary h-64 md:h-80 lg:h-96 w-full rounded-md loading-skeleton"></div>
                </div>

                {/* Author Section Skeleton */}
                <div className="md:col-span-1 w-full p-5">
                    <div className="bg-bg-tertiary w-24 md:w-28 h-6 rounded-md loading-skeleton ml-12 md:ml-20 mt-6 md:mt-8"></div>
                    <div className="flex items-center mt-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-full loading-skeleton ml-8 md:ml-14 mr-4"></div>
                        <div>
                            <div className="bg-bg-tertiary w-32 md:w-40 h-6 rounded-md loading-skeleton mb-3"></div>
                            <div className="bg-bg-tertiary w-48 md:w-72 h-10 rounded-md loading-skeleton"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
