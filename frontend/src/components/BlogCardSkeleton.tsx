export const BlogCardSkeleton = () => {
    return (
        <article className="
            bg-bg-primary border border-border-primary
            rounded-lg p-6 mb-6 mx-auto max-w-4xl
            shadow-theme-sm
            animate-fadeInUp
        ">
            {/* Author info skeleton */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-bg-tertiary rounded-full loading-skeleton"></div>
                <div className="flex items-center gap-2 text-sm">
                    <div className="bg-bg-tertiary w-20 h-4 rounded loading-skeleton"></div>
                    <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
                    <div className="bg-bg-tertiary w-16 h-4 rounded loading-skeleton"></div>
                    <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
                    <div className="bg-bg-tertiary w-14 h-4 rounded loading-skeleton"></div>
                </div>
            </div>

            {/* Content layout skeleton */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Text content skeleton */}
                <div className="flex-1 min-w-0">
                    {/* Title skeleton */}
                    <div className="mb-3">
                        <div className="bg-bg-tertiary w-full h-6 rounded loading-skeleton mb-2"></div>
                        <div className="bg-bg-tertiary w-3/4 h-6 rounded loading-skeleton"></div>
                    </div>
                    
                    {/* Content skeleton */}
                    <div className="mb-4">
                        <div className="bg-bg-tertiary w-full h-4 rounded loading-skeleton mb-2"></div>
                        <div className="bg-bg-tertiary w-full h-4 rounded loading-skeleton mb-2"></div>
                        <div className="bg-bg-tertiary w-2/3 h-4 rounded loading-skeleton"></div>
                    </div>

                    <div className="flex justify-end">
                        <div className="bg-bg-tertiary w-20 h-4 rounded loading-skeleton"></div>
                    </div>
                </div>

                {/* Featured image skeleton */}
                <div className="w-full sm:w-40 flex-shrink-0">
                    <div className="aspect-[4/3] bg-bg-tertiary rounded-lg loading-skeleton shadow-theme-sm"></div>
                </div>
            </div>
        </article>
    );
}