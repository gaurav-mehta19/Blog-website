import { useParams } from "react-router-dom";
import { useMyblogs } from "../hooks/myblogs";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

export const MyBlogs = ()=> {
    const {userId} = useParams();
    const {loading, blogs} = useMyblogs({userId:userId || ""});

    if(loading){
        return <div>loading...</div>
    }

     return (
        <div>
            <Appbar />
            <div className="ml-32 mt-3">
                <div className="flex flex-col mt-3 justify-center max-w-5xl">
                    {blogs.map(blog => <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.publishDate}
                    />)}
                </div>
            </div>
        </div>
    )
}