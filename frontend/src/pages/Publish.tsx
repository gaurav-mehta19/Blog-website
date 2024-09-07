import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { Appbar } from "../components/Appbar";


export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    return (
        <div>
            <div>
                <Appbar/>
            </div>
            <div className="mx-5 my-5 h-screen w-screen">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    id="helper-text"
                    aria-describedby="helper-text-explanation"
                    className="w-8/12 h-20 bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 border-none font-semibold outline-none"
                    placeholder="Title"
                />
                <TextEditor value={content} onChange={setContent} />
                <button
                    onClick={async () => {
                        try {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,
                                {
                                    title,
                                    content,
                                },
                                {
                                    headers: {
                                        Authorization: localStorage.getItem('token'),
                                    },
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
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [],
        [{ align: [] }],
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

