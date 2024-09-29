import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/blog";
import { FullBlog } from "../components/FullBlog";
import { Skleton2 } from "../components/Skleton2";
import { Appbar } from "../components/Appbar";

export function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    
    return (
        <div>
            <Appbar />

            <div className="mt-14">
                {loading || !blog ? (
                    <Skleton2 />
                ) : (
                    <FullBlog blog={blog} />
                )}
            </div>
        </div>
    );
}
