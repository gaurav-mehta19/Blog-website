export const FullBlogSkeleton = () => {
    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Hero Section Skeleton */}
            <div className="bg-gradient-to-b from-bg-secondary to-bg-primary pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title Skeleton - Single line like real blog titles */}
                    <div className="bg-bg-tertiary h-12 md:h-16 lg:h-20 rounded-md animate-pulse mb-6 w-4/5"></div>
                    
                    {/* Author & Meta Info Skeleton */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-3">
                            {/* Author Avatar */}
                            <div className="w-12 h-12 bg-bg-tertiary rounded-full animate-pulse"></div>
                            <div>
                                {/* Author Name */}
                                <div className="bg-bg-tertiary w-32 h-5 rounded animate-pulse mb-2"></div>
                                {/* Publish Date & Read Time */}
                                <div className="bg-bg-tertiary w-48 h-4 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Article Content - 3 columns */}
                    <div className="lg:col-span-3">
                        <article className="max-w-none">
                            {/* Article Content Blocks */}
                            <div className="space-y-6">
                                {/* First Paragraph */}
                                <div className="space-y-3">
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-4/5"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-3/4"></div>
                                </div>

                                {/* Second Paragraph */}
                                <div className="space-y-3">
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-5/6"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                </div>

                                {/* Image Placeholder */}
                                <div className="bg-bg-tertiary h-64 md:h-80 rounded-lg animate-pulse w-full"></div>

                                {/* Third Paragraph */}
                                <div className="space-y-3">
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-4/5"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-2/3"></div>
                                </div>

                                {/* Fourth Paragraph */}
                                <div className="space-y-3">
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-5/6"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-3/4"></div>
                                </div>

                                {/* Code Block Placeholder */}
                                <div className="bg-bg-tertiary h-32 rounded-lg animate-pulse w-full"></div>

                                {/* Final Paragraph */}
                                <div className="space-y-3">
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-4/5"></div>
                                    <div className="bg-bg-tertiary h-5 rounded animate-pulse w-full"></div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 space-y-6 ml-6">
                            {/* Author Card Skeleton */}
                            <div className="bg-bg-secondary rounded-2xl p-6 shadow-theme-sm border border-border-primary">
                                <div className="text-center">
                                    {/* Large Author Avatar - exact match */}
                                    <div className="w-20 h-20 bg-bg-tertiary rounded-full animate-pulse mx-auto mb-4 shadow-theme-md"></div>
                                    
                                    {/* Author Name - matching h3 text-xl */}
                                    <div className="bg-bg-tertiary h-6 rounded animate-pulse mb-2 w-32 mx-auto"></div>
                                    
                                    {/* Author Description - matching px-2 and text-sm leading-relaxed */}
                                    <div className="mb-4 px-2">
                                        <div className="bg-bg-tertiary h-4 rounded animate-pulse mb-2 w-full"></div>
                                        <div className="bg-bg-tertiary h-4 rounded animate-pulse mb-2 w-5/6 mx-auto"></div>
                                        <div className="bg-bg-tertiary h-4 rounded animate-pulse w-4/5 mx-auto"></div>
                                    </div>
                                    
                                    {/* Follow Button - matching py-2.5 px-4 */}
                                    <div className="bg-bg-tertiary h-10 rounded-lg animate-pulse w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};