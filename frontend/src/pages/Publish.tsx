import axios from "axios"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"



export const Publish = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('')

    return <div className="flex justify-center flex-col mx-10 my-5 ">
        <input value={title} onChange={(e) => {
            setTitle(e.target.value)
        }} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="w-8/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 border-none " placeholder="Title"></input>
        <TextEditor onChange={(e) => setContent(e.target.value)} />
        <button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            navigate(`/blog/${response.data.id}`)
        }} type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900  focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md text-center w-32 h-9">Publish Blog</button>
    </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div>
        <textarea
            onChange={onChange}
            id="message"
            className="border-none w-8/12 block p-2.5 h-96 text-md text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 my-5"
            placeholder="Content"></textarea>
    </div>
}

