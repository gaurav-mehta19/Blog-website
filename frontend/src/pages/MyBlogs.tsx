import { useParams } from "react-router-dom";
import { useMyblogs } from "../hooks/myblogs";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useRecoilState } from "recoil";
import { useProfile } from "../hooks/profile";

export const MyBlogs = () => {
    const { userId } = useParams();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const { loading, myblogs } = useMyblogs({
        userId: userId || ""
    });
    const { profile } = useProfile();

    const authorName = myblogs[0]?.author?.name || profile?.name || "Author";

    return (
        <div className="min-h-screen bg-bg-secondary">
            <Appbar />
            <div 
                className="pt-20 pb-16 px-4 sm:px-6 lg:px-8" 
                onClick={() => {
                    if (showPopDownCard) {
                        setShowPopDownCard(false);
                    }
                }}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 animate-fadeInDown">
                            {authorName}'s Stories
                        </h1>
                        <p className="text-text-secondary animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            {myblogs.length > 0 
                                ? `${myblogs.length} ${myblogs.length === 1 ? 'story' : 'stories'} published`
                                : "No stories published yet"
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
                    ) : myblogs.length > 0 ? (
                        <div className="space-y-2">
                            {myblogs.map((blog, index) => (
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-2">
                                    No stories yet
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Start writing and share your thoughts with the community.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}