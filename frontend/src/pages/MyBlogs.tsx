import { useParams } from "react-router-dom";
import { useMyblogs } from "../hooks/myblogs";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

export const MyBlogs = ()=> {
    const { userId } = useParams();
    const {loading, myblogs} = useMyblogs({
        userId:userId || ""
    });
    
    console.log(userId);
    
    if(loading){
        return <div>loading...</div>
    }
    

     return (
        <div>
            <Appbar />
            <div className="mt-20">
                <div className="flex flex-col mt-3 justify-center max-w-5xl">
                    {myblogs.map(blog => <BlogCard
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