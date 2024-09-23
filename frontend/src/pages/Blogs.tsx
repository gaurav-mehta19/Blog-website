import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Skleton } from "../components/Skleton1";
import { useBlogs } from "../hooks/blog";

export function Blogs() {

    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>
            <Appbar/>
            <div className="ml-32 mt-3">
                <Skleton />
                <Skleton />
                <Skleton />
                <Skleton />
            </div>
        </div>
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