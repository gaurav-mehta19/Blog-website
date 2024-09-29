import { Link, useLocation } from "react-router-dom";
import "../shimmer.css";

export const Skleton3 = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 shadow-sm  p-1.5 flex justify-between px-32 min-h-16">
            <Link to={'/blogs'}>
                <div className="flex justify-center items-center gap-1.5 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 mt-0.5">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                    <div className="tracking-wide mt-1 font-extrabold text-2xl w-32 h-8 bg-slate-100 rounded-lg shimmer">
                    </div>
                </div>
            </Link>
            <div className="relative">
                <div className="flex gap-1">
                    <CreateBLogVisibility />
                    <div className="relative inline-flex items-center justify-center me-3 w-9 h-9 overflow-hidden bg-slate-100 rounded-full hover:cursor-pointer mt-1 shimmer">
                        <span className="font-bold text-xl w-2 h-2 text-black">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreateBLogVisibility() {
    const location = useLocation();
    if (location.pathname === '/publish') {
        return null;
    }
    return (
        <div>
            <Link to={'/publish'}>
                <button type="button" className="bg-slate-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-1.5 text-center me-6 mb-2 w-40 h-8 mt-1 shimmer">
                </button>
            </Link>
        </div>
    );
}
