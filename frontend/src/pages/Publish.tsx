import axios from "axios";
import { BACKEND_URL } from "../config";
// import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.bubble.css';
// import ReactQuill from "react-quill";
import { Appbar } from "../components/Appbar";
import { CreateBlogInput } from "@gaurav_mehta/medium-common/dist/zod/zod";
import 'highlight.js/styles/github.css';
// import hljs from 'highlight.js/lib/common';
import { TextEditor } from "../components/TextEditor";
import { useState } from "react";



export const Publish = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState<CreateBlogInput>({
        title: "",
        content: "",
        firstImgUrl: ""
    });

    const handlePublish = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                blog,
                {
                    withCredentials: true,
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            console.error('Error publishing blog', e);
        }
    };


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
        <div>
            <Appbar />
            <div className="mx-5 mt-20 my-5 h-full flex flex-col items-center">
                <input
                    value={blog.title}
                    onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                    type="text"
                    id="blog-title"
                    className="w-10/12 h-20 bg-white border border-gray-300 text-gray-800 text-3xl rounded-lg block pl-4 font-serif outline-none focus:border-gray-600 placeholder-[#a0aec0]"
                    placeholder="Enter your blog title"
                />
                <TextEditor value={blog.content} onChange={handleContentChange} />
                <button
                    onClick={handlePublish}
                    type="button"
                    className="mt-10 w-48 h-12 text-gray-800 hover:text-white border border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg text-center transition duration-200"
                >
                    Publish Blog
                </button>
            </div>
        </div>
    );
};

// function TextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
//     const quillRef = useRef(null);
//     return (
//         <div className="w-10/12 my-5 flex-grow">
//             <ReactQuill
//                 ref={quillRef}
//                 value={value}
//                 theme="bubble"
//                 onChange={onChange}
//                 modules={TextEditor.modules}
//                 formats={TextEditor.formats}
//                 style={{ minHeight: '400px', height: 'auto', overflowY: 'visible' }}
//                 className="h-96 text-xl text-gray-800 bg-white border border-gray-300 rounded-lg"
//                 placeholder="Write your blog content here"
//             />
//         </div>
//     );
// }



// TextEditor.modules = {
//     toolbar: {
//         container: [
//             [{ 'header': '1' }, { 'header': '2' }],
//             [{ 'font': [] }],
//             [{ 'size': [false, 'large'] }],
//             [{ 'align': [] }],
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//             ['blockquote', 'code-block'],
//             ['link', 'image'],
//             ['clean']
//         ],
//     }
// };

// TextEditor.formats = [
//     'header', 'font', 'size', 'align',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background', 'list', 'bullet',
//     'link', 'image', 'code-block', 'blockquote'
// ];

// hljs.configure({
//     languages: undefined,
// });