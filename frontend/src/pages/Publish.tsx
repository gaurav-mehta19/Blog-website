import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { Appbar } from "../components/Appbar";
import { CreateBlogInput } from "@gaurav_mehta/medium-common/dist/zod/zod"




export const Publish = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState<CreateBlogInput>({
        title: "",
        content: ""
    })

    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="mx-5 my-5 h-screen w-screen">
                <input
                    value={blog.title}
                    onChange={(e) => { setBlog(c => ({ ...c, title: e.target.value })) }}
                    type="text"
                    id="helper-text"
                    aria-describedby="helper-text-explanation"
                    className="w-8/12 h-20 bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 border-none font-semibold outline-none"
                    placeholder="Title"
                />
                <TextEditor value={blog.content} onChange={(content) => { setBlog(c => ({ ...c, content })) }} />
                <button
                    onClick={async () => {
                        try {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,blog,
                                {
                                    withCredentials: true,
                                }
                            );
                            navigate(`/blog/${response.data.id}`);
                        } catch (e) {
                            console.error('Error publishing blog', e);
                        }
                    }}
                    type="button"
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md text-center w-32 h-9 mt-10"
                >
                    Publish Blog
                </button>
            </div>
        </div>
    );
};

const modules = {
    toolbar: [
        [],
        [],
        ['bold', 'italic', 'underline'],
        [],
        [{}],
        [],
    ],
};


function TextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div>
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={modules}
                className="w-8/12 text-xl text-gray-800 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 my-5"
                placeholder="Content"
                style={{ height: '500px' }}
            />
        </div>
    );
}

