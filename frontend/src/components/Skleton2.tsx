import { Appbar } from "./Appbar";


export const Skleton2 = () => {
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="grid grid-cols-3 gap-4 px-10 h-full">
                <div className="col-span-2 w-full h-full">
                    <div className="text-6xl font-bold mt-8 mb-4 h-10 bg-slate-100 ">
                    </div>
                    <div className="bg-slate-100 w-60 h-6 text-md font-light text-slate-500 mb-4">
                       
                    </div>
                    <div className="bg-slate-100 h-96 text-xl my-3 text-slate-600">
                    </div>
                </div>
                <div className="col-span-1 w-full h-full p-5">
                    <div className="bg-slate-100 w-28 h-6 text-gray-700 text-2xl ml-20 mt-8 font-medium">
                    </div>
                    <div className="flex justify-start">
                        <div className="w-8 h-6 bg-slate-100 rounded-full ml-16 mt-10 mr-5">
                        </div>
                        <div className="mt-6">
                            <div className="text-xl font-bold mb-3 bg-slate-100 w-40 h-6"></div>
                            <div className="text-gray-400 bg-slate-100 w-96 h-12 mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}