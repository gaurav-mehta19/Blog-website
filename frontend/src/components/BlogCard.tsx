import { Link } from "react-router-dom"

interface BlogCardtypes {
    id:string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({ authorName, title, content, publishedDate,id }: BlogCardtypes) => {
    return <Link to={`/blog/${id}`}>
     <div className="border-b mt-4 pb-2 cursor-pointer max-h-48">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName || "Anonymous"} />
            </div>
            <div className=" text-sm font-extralight pl-2 text-slate-600">{authorName || "Anonymous"}</div>
            <div className="flex flex-col justify-center pl-2 ">
                <div className="h-0.5 w-0.5 rounded-full bg-slate-600"></div>
            </div>
            <div className="pl-2 text-sm font-thin">{publishedDate}</div>
        </div>
        <div className="mt-2 text-2xl font-semibold font-serif">
            {title}
        </div>
        <div className="text-sm font-light text-slate-600 my-1 line-clamp-4 overflow-hidden text-ellipsis" dangerouslySetInnerHTML={{__html:content.slice(0,130)+"..."}}>
        </div>
        <div className="flex justify-start gap-3">
            <div className="text-xs my-2 font-thin text-slate-600">
                {`${Math.ceil(content.length / 100)} minutes`}
            </div>
            <div>
                <button type="button" className="mt-1.5 text-gray-500 border border-gray-500  hover:text-slate-400 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
            </div>
        </div>
    </div>
    </Link>
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-300 rounded-full ">
            <span className="font-semiblod text-xs text-black">{name[0].toUpperCase()}</span>
        </div>
    )
}