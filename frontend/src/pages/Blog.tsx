import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/blog";
import { FullBlog } from "../components/FullBlog";
import { Skleton2 } from "../components/Skleton2";
import { Appbar } from "../components/Appbar";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useRecoilState } from "recoil";

export function Blog() {
    const { id } = useParams();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    console.log(id);
    const { loading, blog } = useBlog({
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
                {loading || !blog ? (
                    <Skleton2 />
                ) : (
                    <FullBlog blog={blog} />
                )}
            </div>
        </div>
    );
}
