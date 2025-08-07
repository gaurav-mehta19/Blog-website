import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
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
import { useMemo } from "react";

export function Blogs() {
    const { loading, blogs } = useBlogs();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const searchQuery = useRecoilValue(searchAtom);

    // Filter blogs based on search query
    const filteredBlogs = useMemo(() => {
        if (!searchQuery.trim()) {
            return blogs;
        }
        
        const query = searchQuery.toLowerCase().trim();
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(query) ||
            blog.content.toLowerCase().includes(query) ||
            blog.author.name.toLowerCase().includes(query)
        );
    }, [blogs, searchQuery]);
    
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

                    {loading ? (
                        <div className="space-y-2">
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="space-y-2">
                            {filteredBlogs.map((blog, index) => (
                                <div 
                                    key={blog.id} 
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <BlogCard
                                        id={blog.id}
                                        authorName={blog.author.name}
                                        title={blog.title}
                                        content={blog.content}
                                        publishedDate={blog.publishDate}
                                        firstImgUrl={blog.image}
                                    />
                                </div>
                            ))}
                        </div>
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