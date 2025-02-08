import "../shimmer.css";

export const Skleton2 = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 px-10 h-full mx-48">
               
                <div className="col-span-2 w-full h-full">
                    <div className="text-6xl font-bold mt-8 mb-4 h-10 bg-slate-100 shimmer">
                    </div>
                    <div className="bg-slate-100 w-60 h-6 text-md font-light text-slate-500 mb-4 shimmer">
                    </div>
                    <div className="bg-slate-100 h-96 text-xl my-3 text-slate-600 shimmer">
                    </div>
                </div>

            
                <div className="col-span-1 w-full h-full p-5">
                    <div className="bg-slate-100 w-28 h-6 text-gray-700 text-2xl ml-20 mt-8 font-medium shimmer">
                    </div>
                    <div className="flex justify-start items-center">
                        <div className="w-6 h-6 bg-slate-100 rounded-full ml-14 mr-5 shimmer">
                        </div>
                        <div className="mt-7">
                            <div className="text-xl font-bold mb-3 bg-slate-100 w-40 h-6 shimmer"></div>
                            <div className="text-gray-400 bg-slate-100 w-72 h-10 mt-4 shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
