import { Link, useLocation } from "react-router-dom";
import "../shimmer.css";

export const Skleton3 = () =>{
    return (
        <div className="border-b p-2 flex justify-between px-10">
            <Link to={'/blogs'}>
                <div className="tracking-wide mt-1 font-extrabold text-2xl w-32 h-8 bg-slate-100 rounded-lg shimmer">
                    
                </div>
            </Link>
            <div className="relative">
                <div className="flex">
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
                <button type="button" className="bg-slate-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-1.5 text-center me-6 mb-2 w-52 h-8 mt-1 shimmer">
                </button>
            </Link>
        </div>
    );
}
