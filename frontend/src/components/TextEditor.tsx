import 'react-quill/dist/quill.bubble.css';
import ReactQuill from "react-quill";
import 'highlight.js/styles/github.css'; 
import hljs from 'highlight.js';
import { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

export const TextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const quillRef = useRef<ReactQuill | null>(null);  // Create a reference for the Quill editor

   

    useEffect(() => {
        hljs.configure({
            languages: undefined,  // Highlight all supported languages
        });
        hljs.highlightAll();  // Apply syntax highlighting
    }, []);

    const imageHandler = useCallback(() => {
        // Create an input element of type 'file'
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
    
        // When a file is selected
        input.onchange = async () => {
            if (!input.files) return;
            const file = input.files[0];
    
            // Prepare the FormData for image upload
            const formData = new FormData();
            formData.append('image', file);
    
            try {
                // Upload the image to ImgBB
                const response = await axios.post('https://api.imgbb.com/1/upload?key=898d5e98a6e2ca2e28fcbd1a47f2d649', formData);
                
                // Extract the small thumbnail URL from the response
                const imageUrl = response.data.data.url;
    
                // Insert the image into the editor
                const quillEditor = quillRef.current?.getEditor();
                if (quillEditor) {
                    const range = quillEditor.getSelection(true);
                    quillEditor.insertEmbed(range.index, 'image', imageUrl, 'user');
                }
            } catch (error) {
                console.error('Error uploading image to ImgBB:', error);
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }],
                [{ 'size': [false] }],  // Available font sizes
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['blockquote', 'code-block'],
                ['link', 'image'],
                ['clean']  // Clean button to remove formatting
            ],
            handlers: {
                image: imageHandler  // Custom image handler for uploads
            }
        }
    };

    const formats = [
        'header', 'size', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'blockquote', 'code-block', 'link', 'image'
    ];

    return (
        <div className="w-10/12 my-5 flex-grow">
            <ReactQuill
                ref={quillRef}
                value={value}
                theme="bubble"
                onChange={onChange}
                modules={modules}
                formats={formats}
                style={{ minHeight: '400px', height: 'auto', overflowY: 'visible' }}
                className="h-96 text-xl text-gray-800 bg-white border border-gray-300 rounded-lg custom-quill"
                placeholder="Write your blog content here"
            />
        </div>
    );
}
