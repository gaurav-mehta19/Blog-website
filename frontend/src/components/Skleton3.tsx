import { Link, useLocation } from "react-router-dom";
import { BookOpen } from 'lucide-react';

export const Skleton3 = () => {
    return (
        <div className="fixed ml-28 top-0 left-0 right-0 z-50 border-b border-border-primary bg-bg-primary shadow-theme-sm p-1.5 flex justify-between px-32 min-h-16">
            <Link to={'/blogs'}>
                <div className="flex justify-center items-center gap-1.5 mt-1">
                <div className="mt-1 mr-1">
                        <BookOpen className="h-8 w-8 text-text-primary" />
                        </div>
                    <div className="tracking-wide mt-1 font-extrabold text-2xl w-32 h-8 bg-bg-tertiary rounded-lg loading-skeleton">
                    </div>
                </div>
            </Link>
            <div className="relative mr-36">
                <div className="flex gap-1">
                    <CreateBLogVisibility />
                    <div className="relative inline-flex items-center justify-center me-3 w-9 h-9 overflow-hidden bg-bg-tertiary rounded-full hover:cursor-pointer mt-1 loading-skeleton">
                        <span className="font-bold text-xl w-2 h-2 text-text-primary">
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
                <button type="button" className="bg-bg-tertiary focus:ring-4 focus:outline-none focus:ring-theme-primary font-medium rounded-lg text-sm px-12 py-1.5 text-center me-6 mb-2 w-40 h-8 mt-1 loading-skeleton">
                </button>
            </Link>
        </div>
    );
}
