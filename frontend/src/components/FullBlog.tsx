import { useLocation } from "react-router-dom";
import { Blog } from "../hooks/blog"
import { useRecoilState } from "recoil";
import { deletepopAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/deletePopCard";
import { useState } from "react";




export const FullBlog = ({ blog } : {blog : Blog}) => {
    const [showDeletePop, setShowDeletePop] = useRecoilState(deletepopAtom);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const location = useLocation();

    function DeleteBlog() {
        if (location.pathname.startsWith("/myblog")) {
            return (
                <div className="flex justify-between relative">
                    <div className="text-md font-light text-slate-500 mb-3">
                        {blog.publishDate}
                    </div>
                    <div onClick={() => setShowDeletePop(prev => !prev)} className="relative cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>

                        {showDeletePop && (
                            <div className="absolute bottom-full -right-10 w-40 bg-slate-50 border border-gray-300 rounded-md shadow-sm z-10">
                                <button
                                    onClick={() => {
                                        setShowDeleteConfirm(prev => !prev);
                                    }}
                                    className="text-sm w-full text-centre px-2 py-2 text-black hover:bg-gray-100"
                                >
                                    Delete Blog
                                </button>
                            </div>
                        )}
                    </div>

                    {showDeleteConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-md p-6 shadow-lg w-80 text-center">
                                <div className="text-lg font-semibold mb-4">Delete Blog</div>
                                <p className="text-gray-700 mb-6">Are you sure you want to delete this blog?</p>
                                <div className="flex justify-around">
                                    <button
                                        onClick={() => {
                                            // handleDeleteConfirm();
                                            setShowDeleteConfirm(false);
                                        }}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="text-md font-light text-slate-500 mb-3">
                    {blog.publishDate}
                </div>
            );
        }
    }

    return (
        <div className="full-blog">
            <div className="grid grid-cols-3 gap-4 px-10 h-full mx-20">
                <div className="col-span-2 w-full h-full">
                    <div className="text-4xl font-bold mt-8 mb-3 overflow-auto">
                        {blog.title}
                    </div>
                    <DeleteBlog />
                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className="col-span-1 w-full h-full p-5">
                    <div className="text-gray-700 text-2xl ml-20 mt-8 font-medium">Author</div>
                    <div className="flex justify-start items-center">
                        <div className="w-8 h-5 bg-gray-300 rounded-full ml-16 mr-5" />
                        <div className="mt-6">
                            <div className="text-xl font-bold mb-1.5">{blog.author.name || "Anonymous"}</div>
                            <div className="text-gray-400">Master of mirth, purveyor of puns and the funniest person in the kingdom</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
