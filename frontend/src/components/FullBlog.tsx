import { Appbar } from "./Appbar";
import { Blog } from "../hooks"


export const FullBlog = ({blog}:{blog:Blog}) => {
    
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="grid grid-cols-3 gap-4 px-10 h-full">
                <div className="col-span-2 w-full h-full">
                    <div className="text-6xl font-bold mt-8 mb-3">
                        {blog.title}
                    </div>
                    <div className="text-md font-light text-slate-500 mb-3">
                        {blog.publishDate}
                    </div>
                    <div className="text-xl text-slate-600" dangerouslySetInnerHTML={{__html:blog.content}}>
                    </div>
                </div>
                <div className="col-span-1 w-full h-full p-5">
                    <div className="text-gray-700 text-2xl ml-20 mt-8 font-medium">
                        Author
                    </div>
                    <div className="flex justify-start">
                        <div className="w-8 h-6 bg-gray-300 rounded-full ml-16 mt-10 mr-5">
                        </div>
                        <div className="mt-6">
                            <div className="text-xl font-bold mb-1.5">{blog.author.name || "Anonymous" }</div>
                            <div className="text-gray-400">Master of mirth,purveyor of puns and the funniest person in the kingdom</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

