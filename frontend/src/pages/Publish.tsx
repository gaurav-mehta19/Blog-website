import { Appbar } from "../components/Appbar";
import { lazy, Suspense } from "react";

// Lazy load TextEditor to avoid loading heavy React Quill on initial app load
const TextEditor = lazy(() => import("../components/TextEditor").then(m => ({ default: m.TextEditor })));

const EditorLoader = () => (
  <div className="min-h-[200px] bg-bg-primary border border-border-primary rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <p className="text-sm text-text-secondary">Loading editor...</p>
    </div>
  </div>
);

import { useRecoilState } from "recoil";
import { blogAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/blog";
import { popdowncardAtom } from '@gaurav_mehta/medium-common/dist/store/atoms/popdownCard';


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
                    className="w-10/12 h-20 bg-bg-secondary border-none text-text-primary text-3xl rounded-xl block pl-6 font-playfair font-semibold outline-none placeholder-text-tertiary"
                    placeholder="Enter your blog title"
                />
                <Suspense fallback={<EditorLoader />}>
                    <TextEditor value={blog.content} onChange={handleContentChange} />
                </Suspense>
            </div>
            <div className='bg-[#fafafa] w-full h-64 flex flex-col justify-center items-center gap-2'>
                <div className='mt-4 text-2xl text-gray-500'>Select text to change formatting, add headers, or create links.</div>
                <div className='h-40'>
                    <img 
                        src="/editor-screenshot.png" 
                        alt="Text editor preview showing formatting options" 
                        loading="lazy"
                        className="w-full h-full object-contain"
                    />
                </div>
                </div>
        </div>
    );
};
