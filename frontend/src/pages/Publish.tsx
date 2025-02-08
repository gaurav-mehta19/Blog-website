import 'react-quill/dist/quill.bubble.css';
import { Appbar } from "../components/Appbar";
import 'highlight.js/styles/github.css';
import { TextEditor } from "../components/TextEditor";
import { useRecoilState } from "recoil";
import { blogAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/blog";
import { popdowncardAtom } from '@gaurav_mehta/medium-common/dist/store/atoms/popdownCard';
import bottomImg from '../assets/Screenshot 2024-10-29 at 1.17.10 PM (1).png';


export const Publish = () => {
    const [blog, setBlog] = useRecoilState(blogAtom);
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);

    const handleContentChange = (content: string) => {
        setBlog(prev => ({ ...prev, content }));
        const imgTagMatch = content.match(/<img[^>]+src="([^">]+)"/);
        const firstImageUrl = imgTagMatch ? imgTagMatch[1] : "";

        if (firstImageUrl) {
            console.log(firstImageUrl);
            setBlog(prev => ({ ...prev, firstImgUrl: firstImageUrl }));
        }
    };

    return (
        <div  style={{ userSelect: 'none' }} onClick={()=>{
            if(showPopDownCard){
                setShowPopDownCard(false);
            }
        }}>
            <Appbar />
            <div className="ml-28 mt-20 mr-36 my-5 h-full flex flex-col items-center" >
                <input
                    value={blog.title}
                    onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                    type="text"
                    id="blog-title"
                    className="w-10/12 h-20 bg-white border border-gray-300 text-gray-800 text-3xl rounded-lg block pl-4 font-serif outline-none focus:border-gray-600 placeholder-[#a0aec0]"
                    placeholder="Enter your blog title"
                />
                <TextEditor value={blog.content} onChange={handleContentChange} />
            </div>
            <div className='bg-[#fafafa] w-full h-64 flex flex-col justify-center items-center gap-2'>
                <div className='mt-4 text-2xl text-gray-500'>Select text to change formatting, add headers, or create links.</div>
                <div className='h-40'><img src={bottomImg} alt="" /></div>
                </div>
        </div>
    );
};
