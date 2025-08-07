import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/blog";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { Appbar } from "../components/Appbar";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useRecoilState } from "recoil";

export function Blog() {
    const { id } = useParams();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const { loading, blog, error, refetch } = useBlog({
        id: id || ""
    });

    
    return (
        <div>
            <Appbar />
            <div className="mt-14" onClick={()=>{
                        if(showPopDownCard){
                            setShowPopDownCard(false);
                        }
                    }}>
                {error ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Failed to load blog</h2>
                        <p className="text-text-secondary mb-6 max-w-md">{error}</p>
                        <button 
                            onClick={refetch}
                            className="bg-theme-primary hover:bg-theme-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : loading || !blog ? (
                    <FullBlogSkeleton />
                ) : (
                    <FullBlog blog={blog} />
                )}
            </div>
        </div>
    );
}
