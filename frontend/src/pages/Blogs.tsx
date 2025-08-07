import { Appbar } from "../components/Appbar";
import { VirtualizedBlogList } from "../components/VirtualizedBlogList";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks/blog";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { atom } from "recoil";

// Create search atom locally since it's not yet published  
const searchAtom = atom<string>({
    key: "searchAtom",
    default: ""
});
import { useRecoilState, useRecoilValue } from "recoil";
import { useMemo, useCallback } from "react";

export function Blogs() {
    const { loading, blogs, error, refetch } = useBlogs();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const searchQuery = useRecoilValue(searchAtom);

    // Optimized search with title/author priority (debouncing already handled in Appbar)
    const filteredBlogs = useMemo(() => {
        if (!searchQuery.trim()) {
            return blogs;
        }
        
        const query = searchQuery.toLowerCase().trim();
        const results = blogs.filter(blog => {
            const titleMatch = blog.title.toLowerCase().includes(query);
            const authorMatch = blog.author.name.toLowerCase().includes(query);
            // Only search content if title/author don't match (performance optimization)
            const contentMatch = !titleMatch && !authorMatch && 
                blog.content.toLowerCase().includes(query);
            
            return titleMatch || authorMatch || contentMatch;
        });

        // Sort results by relevance (title matches first, then author, then content)
        return results.sort((a, b) => {
            const aTitle = a.title.toLowerCase().includes(query);
            const bTitle = b.title.toLowerCase().includes(query);
            const aAuthor = a.author.name.toLowerCase().includes(query);
            const bAuthor = b.author.name.toLowerCase().includes(query);
            
            if (aTitle && !bTitle) return -1;
            if (bTitle && !aTitle) return 1;
            if (aAuthor && !bAuthor) return -1;
            if (bAuthor && !aAuthor) return 1;
            return 0;
        });
    }, [blogs, searchQuery]);

    const handleRetry = useCallback(() => {
        refetch();
    }, [refetch]);
    
    return (
        <div className="min-h-screen bg-bg-secondary">
            <Appbar />
            <div 
                className="pt-20 pb-16 px-4 sm:px-6 lg:px-8" 
                onClick={() => {
                    if(showPopDownCard) {
                        setShowPopDownCard(false);
                    }
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-text-primary mb-2 animate-fadeInDown">
                            {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Stories'}
                        </h1>
                        <p className="text-text-secondary font-inter animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            {searchQuery 
                                ? `Found ${filteredBlogs.length} ${filteredBlogs.length === 1 ? 'result' : 'results'}`
                                : 'Discover the latest articles from our community of writers'
                            }
                        </p>
                    </div>

                    {error ? (
                        <div className="text-center py-16 animate-fadeInUp">
                            <div className="mb-6">
                                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-2">
                                    Failed to load blogs
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {error}
                                </p>
                                <button 
                                    onClick={handleRetry}
                                    className="bg-theme-primary hover:bg-theme-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    ) : loading ? (
                        <div className="space-y-2">
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <VirtualizedBlogList 
                            blogs={filteredBlogs} 
                            searchQuery={searchQuery} 
                        />
                    ) : (
                        <div className="text-center py-16 animate-fadeInUp">
                            <div className="mb-6">
                                <div className="w-24 h-24 bg-theme-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-12 h-12 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-2">
                                    {searchQuery ? 'No results found' : 'No stories yet'}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {searchQuery 
                                        ? 'Try adjusting your search terms or browse all stories.'
                                        : 'Be the first to share your thoughts and stories with the community.'
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}