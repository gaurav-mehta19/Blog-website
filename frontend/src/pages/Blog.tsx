import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/blog"
import { FullBlog } from "../components/FullBlog"
import { Skleton2 } from "../components/Skleton2"
import { useRecoilValue } from "recoil"
// import { useProfile } from "../hooks/profile"
import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile"

export function Blog() {
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ""
    })

    // useProfile();
    const profile = useRecoilValue(profileAtom);
    console.log(profile);
    

    if (loading || !blog || !profile) {
        return <div>
            <Skleton2/>
        </div>
    }

    return (
        <div>
            {profile.email}
            <br />
            {profile.name}
            {<FullBlog blog={blog}></FullBlog>}
        </div>
    )
}