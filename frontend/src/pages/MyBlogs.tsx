import { useParams } from "react-router-dom";
import { useMyblogs } from "../hooks/myblogs";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useRecoilState } from "recoil";

export const MyBlogs = ()=> {
    const { userId } = useParams();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const {loading, myblogs} = useMyblogs({
        userId:userId || ""
    });
    
    if(loading){
        return <div>loading...</div>
    }
    

     return (
        <div>
            <Appbar />
            <div className="mt-20" onClick={()=>{
                        if(showPopDownCard){
                            setShowPopDownCard(false);
                        }
                    }} >
                <div className="flex flex-col mt-3 justify-center max-w-5xl">
                    {myblogs.map(blog => <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.publishDate}
                        firstImgUrl={blog.image}
                    />)}
                </div>
            </div>
        </div>
    )
}