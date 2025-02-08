import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useProfile } from "../hooks/profile";
import { Skleton3 } from "./Skleton3";
import { blogAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/blog";
import { toast } from "sonner";
import { BookOpen } from 'lucide-react';
import { SquarePen } from 'lucide-react';


export const Appbar = () => {
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const { loading } = useProfile();
    const location = useLocation();

    if (location.pathname !== '/') {
        if (loading) {
            return <div><Skleton3 /></div>

        }
    }

    return (
        <div onClick={() => {
            if(showPopDownCard){
                setShowPopDownCard(false)
            }
        }} className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 shadow-sm p-1.5 flex justify-between items-center px-4 sm:px-10 md:px-16 lg:px-32 h-14 sm:h-16 bg-white">
        <Link to={'/blogs'}>
            <div className="flex justify-center items-center text-start gap-1 mt-1 ml-4 sm:ml-10 md:ml-16 lg:ml-28">
                <div className="mt-1 mr-1">
                    <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="tracking-wide mt-1 font-extrabold text-lg sm:text-xl md:text-2xl font-mono">
                    MEDIUM
                </div>
            </div>
        </Link>
        <div className="relative mr-4 sm:mr-16 lg:mr-36">
            <AppbarContent />
        </div>
    </div>
    );
};

function CreateBLogVisibility() {
    const location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useRecoilState(blogAtom);
    const handlePublish = async () => {
       

        if(blog.title.trim().length < 1 || blog.content.trim().length <1){
            toast.warning("Please fill all feilds")
            return;
        }

        const loadingToastId = toast.loading("Publishing blog...");

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                blog,
                {
                    withCredentials: true,
                }
            );

            toast.dismiss(loadingToastId);
            toast.success("Blog published successfully");
            navigate(`/myblog/${response.data.userId}/${response.data.id}`);
            setBlog({
                title: "",
                content: "",
                firstImgUrl: "",
            })
        } catch (e:any) {
            toast.dismiss(loadingToastId);
            if (e.response.data.error) {
                toast.warning(e.response.data.error);
            } else {
                console.error('Error publishing blog', e);
                toast.error("An error occurred. Please try again later");
            }
        }
    };


    if (location.pathname === '/publish') {
        return <div>
            <button onClick={handlePublish} type="button" className="text-white bg-green-700 border font-light hover:bg-green-800 rounded-full text-sm px-6 py-1.5 text-center me-6 mb-2 mt-1.5">
                Publish Blog
            </button>
        </div>
    }
    return (
        <div>
            <Link to={'/publish'}>
                <button type="button" className="text-gray-900 hover:text-white border border-slate-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-6 mb-2 mt-1.5">
                   <span className="flex gap-2 justify-center items-center"><span> <SquarePen className="h-5 w-5" /></span><span> Write Blog</span></span>
                </button>
            </Link>
        </div>
    );
}

function AppbarContent() {
    const navigate = useNavigate();
    const setProfile = useSetRecoilState(profileAtom);
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const { profile } = useProfile();

    async function handleLogout() {
        try {
            const loadingToastId = toast.loading("Signing out...");
            await axios.post(`${BACKEND_URL}/api/v1/user/signout`, {}, { withCredentials: true });
            toast.dismiss(loadingToastId);
            toast.success("Logout successfully");
            setProfile({
                email: "",
                name: "",
                description: "",
                id: ""
            });
            setShowPopDownCard(false);
            navigate('/signin');
        } catch (e) {
            console.log(e);
        }
    }

    async function HandleTryOn() {
        try{
            const loadingToastId = toast.loading("Signing in as a test uses")
            await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                email:"testuser@gmail.com",
                password:"testuser123"
            },{
                withCredentials:true
            })
            toast.dismiss(loadingToastId)
            toast.success("Signed in successfully")
            navigate("/blogs")
        }catch(e:any){
            console.log(e);
        }
        
    }

    const location = useLocation();
    if (location.pathname === '/') {
        return (
            <div className="flex gap-8 justify-center items-center mt-2">
                <a href="/blogs" className="text-gray-500 mb-2 hover:text-gray-900">Our Story</a>
                <a href="/signin" className="text-gray-500 mb-2 hover:text-gray-900">Write</a>
                <a href="/signin" className="text-gray-500 mb-2 hover:text-gray-900">Sign In</a>
                <button onClick={HandleTryOn} className="bg-black mb-2 text-white rounded-lg px-4 py-2 hover:bg-gray-800">
                    Try Now!
              </button>
            </div>
        )
    }
    else {
        return (
            <div className="flex gap-1">
                <CreateBLogVisibility />
                {profile?.name && (
                    <div onClick={() => setShowPopDownCard(prev => !prev)} className="relative inline-flex items-center justify-center me-3 w-9 h-9 overflow-hidden bg-yellow-200 rounded-full hover:cursor-pointer mt-1" style={{ userSelect: 'none' }}>
                        <span className="font-bold text-xl text-black">
                            {profile.name[0].toUpperCase()}
                        </span>
                    </div>
                )}
                {showPopDownCard && (
                    <div className="absolute top-full mt-2 right-4 w-44 bg-gray-50 border border-gray-100 rounded-sm shadow-md">
                        <ul className="p-0">
                            <Link to="/profilepage" onClick={() => setShowPopDownCard(prev => !prev)}>
                                <li className="flex justify-start items-center gap-1.5 mt-4 mb-2 hover:bg-white rounded-xl mx-1 pl-5 h-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 ml-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <div className="block text-sm">
                                        Profile
                                    </div>
                                </li>
                            </Link>
                            <Link to={`/myblogs/${profile?.id}`} onClick={() => setShowPopDownCard(prev => !prev)}>
                                <li className="flex justify-start items-center gap-1.5 my-2 hover:bg-white rounded-xl mx-1 pl-5 h-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ml-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                    </svg>

                                    <div className="block text-sm">
                                        My Blogs
                                    </div>
                                </li>
                            </Link>
                            <hr className="border-gray-300" />
                            <li onClick={handleLogout} className="flex justify-start items-center gap-1.5 my-2 hover:bg-white rounded-xl mx-1 pl-5 h-8">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <button className="w-full text-left text-sm block">
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }

}