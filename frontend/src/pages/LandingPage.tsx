
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router-dom";



export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <Appbar/>
            <div style={{width:'1000px'}} className="text-7xl font-semibold text-center">
                Discover the Best Content on the Web
            </div>
            <div style={{width:'900px'}} className="mt-6 text-2xl text-center w-3/6">
                Our blog feature the latest news, insights, and stories from the industry experts. Join our community and stay up-to-date with the latest trends.
            </div>
            <div className="flex gap-6 justify-center items-center mt-10">
                <button onClick={() => navigate('signin')} type="button" className="text-gray-900 hover:text-black border hover:bg-gray-100  focus:outline-none  font-medium rounded-lg text-xl px-8 py-2 text-center mb-2">
                    Sign In
                </button>
                <button onClick={() => navigate('signup')} type="button" className="text-white bg-black border-slate-600 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-8 py-2 text-center  mb-2">
                    Sign Up
                </button>
            </div>
        </div>
    )
}