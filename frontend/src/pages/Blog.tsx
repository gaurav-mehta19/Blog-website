import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { Skleton2 } from "../components/Skleton2"

export function Blog() {
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ""
    })

    if (loading || !blog) {
        return <div>
            <Skleton2/>
        </div>
    }

    return (
        <div>
            {<FullBlog blog={blog}></FullBlog>}
        </div>
    )
}