import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Skleton1 } from "../components/Skleton1";
import { useBlogs } from "../hooks/blog";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useRecoilState } from "recoil";

export function Blogs() {
    const { loading, blogs } = useBlogs();
    
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    return (
        <div>
            <Appbar />
            <div className="pt-20 " onClick={()=>{
                        if(showPopDownCard){
                            setShowPopDownCard(false);
                        }
                    }} >
                {loading ? (
                    <div>
                        <Skleton1 />
                        <Skleton1 />
                        <Skleton1 />
                        <Skleton1 />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center max-w-5xl" >
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.publishDate}
                                firstImgUrl={blog.image}
                                
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
