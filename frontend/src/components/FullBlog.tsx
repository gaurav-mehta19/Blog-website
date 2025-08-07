import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Blog } from "../hooks/blog";
import { useRecoilState } from "recoil";
import { deletepopAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/deletepopCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "sonner";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();
    const [showDeletePop, setShowDeletePop] = useRecoilState(deletepopAtom);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { userId, id } = useParams();
    const location = useLocation();

    // Add copy buttons to code blocks
    useEffect(() => {
        const addCopyButtons = () => {
            const codeBlocks = document.querySelectorAll('.article-content pre');
            
            codeBlocks.forEach((codeBlock) => {
                // Check if copy button already exists
                if (codeBlock.querySelector('.copy-button')) return;
                
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button';
                copyButton.innerHTML = 'Copy';
                copyButton.addEventListener('click', async () => {
                    const code = codeBlock.textContent || '';
                    try {
                        await navigator.clipboard.writeText(code);
                        copyButton.innerHTML = 'Copied!';
                        copyButton.classList.add('copied');
                        setTimeout(() => {
                            copyButton.innerHTML = 'Copy';
                            copyButton.classList.remove('copied');
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy code: ', err);
                        toast.error('Failed to copy code');
                    }
                });
                
                codeBlock.appendChild(copyButton);
            });
        };

        // Add copy buttons after content is rendered
        const timer = setTimeout(addCopyButtons, 100);
        return () => clearTimeout(timer);
    }, [blog.content]);

    async function handleDeleteConfirm() {
        const loadingToastId = toast.loading("Deleting blog...");
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                withCredentials: true,
            });
            toast.dismiss(loadingToastId);
            toast.success("Blog deleted successfully");
            navigate(`/myblogs/${userId}`);
        } catch (e) {
            toast.dismiss(loadingToastId);
            toast.error("An error occurred. Please try again later.");
            console.error(e);
        }
    }

    function DeleteBlog() {
        if (location.pathname.startsWith("/myblog")) {
            return (
                <div className="mt-6">
                    <div className="bg-bg-tertiary rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="font-inter text-text-secondary text-sm">Manage Post</span>
                            <div onClick={() => setShowDeletePop((prev) => !prev)} className="relative cursor-pointer p-2 hover:bg-bg-primary rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-text-secondary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>

                                {showDeletePop && (
                                    <div className="absolute bottom-full right-0 w-40 bg-bg-primary border border-border-primary rounded-lg shadow-theme-md z-10">
                                        <button onClick={() => setShowDeleteConfirm(true)} className="font-inter text-sm w-full px-4 py-3 text-theme-primary hover:bg-theme-primary hover:text-white rounded-lg transition-colors">
                                            Delete Blog
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {showDeleteConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-bg-primary rounded-2xl p-8 shadow-theme-xl w-96 text-center">
                                <div className="text-2xl font-playfair font-bold text-text-primary mb-4">Delete Blog</div>
                                <p className="font-inter text-text-secondary mb-8">Are you sure you want to delete this blog? This action cannot be undone.</p>
                                <div className="flex gap-4 justify-center">
                                    <button 
                                        onClick={() => { handleDeleteConfirm(); setShowDeleteConfirm(false); }} 
                                        className="bg-theme-primary hover:bg-theme-primary-hover text-white font-inter font-medium py-3 px-6 rounded-full transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button 
                                        onClick={() => setShowDeleteConfirm(false)} 
                                        className="bg-bg-tertiary hover:bg-border-primary text-text-primary font-inter font-medium py-3 px-6 rounded-full transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    }

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-bg-secondary to-bg-primary pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-text-primary mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    
                    {/* Author & Meta Info */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-theme-primary to-theme-primary-hover rounded-full flex items-center justify-center">
                                <span className="font-bold text-white text-lg">
                                    {blog.author.name?.[0]?.toUpperCase() || "A"}
                                </span>
                            </div>
                            <div>
                                <div className="font-inter font-semibold text-text-primary text-lg">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="font-inter text-text-secondary text-sm">
                                    {blog.publishDate} • {Math.ceil((blog.content as string).length / 600)} min read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main content - narrow column for optimal reading */}
                    <div className="lg:col-span-3">
                        <article 
                            className="article-content max-w-none font-inter text-text-primary"
                            dangerouslySetInnerHTML={{ __html: blog.content as string }} 
                        />
                        
                    </div>

                    {/* Sidebar with author info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Author Card */}
                            <div className="bg-bg-secondary rounded-2xl p-6 shadow-theme-sm border border-border-primary">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-theme-primary to-theme-primary-hover rounded-full flex items-center justify-center mx-auto mb-4 shadow-theme-md">
                                        <span className="font-bold text-white text-2xl">
                                            {blog.author.name?.[0]?.toUpperCase() || "A"}
                                        </span>
                                    </div>
                                    <h3 className="font-playfair font-bold text-xl text-text-primary mb-2">
                                        {blog.author.name || "Anonymous"}
                                    </h3>
                                    <p className="font-inter text-text-secondary text-sm leading-relaxed mb-4 px-2">
                                        {blog.author.description || "Passionate writer sharing stories and insights with the world."}
                                    </p>
                                    <button className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white font-inter font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                                        Follow Author
                                    </button>
                                </div>
                            </div>
                            
                            {/* Delete Blog Button (if on myblog page) */}
                            <DeleteBlog />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
