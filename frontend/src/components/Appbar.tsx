import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
export const Appbar = () => {
    const navigate = useNavigate()
    return <div className="border-b p-2 flex justify-between px-10 ">
        <Link to={'/blogs'}>
        <div className="tracking-wide mt-1 font-extrabold text-2xl">
            MEDIUM
        </div>
        </Link>
        <div>
            <div className="flex">
                <CreateBLogVisibility />
            <button onClick={()=>{
                axios.post(`${BACKEND_URL}/api/v1/user/signout`,{},{ withCredentials:true })
                navigate('/signin')
            }} type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-6 mb-2">Logout</button>
                <div className="relative inline-flex items-center justify-center me-3 w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                    <span className="font-semiblod text-sm text-black">GM</span>
                </div>
                
            </div>
        </div>
    </div>
}


function CreateBLogVisibility(){
    
    const location = useLocation()
    if(location.pathname === '/publish'){
        return null
    }
    return <div>
         <Link to={'/publish'}>
            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-1.5 text-center me-6 mb-2">Create New Blog</button>
            </Link>
    </div>
}
