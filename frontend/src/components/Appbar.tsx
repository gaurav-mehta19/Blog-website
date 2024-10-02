import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { useProfile } from "../hooks/profile";
import { Skleton3 } from "./Skleton3";



export const Appbar = () => {
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const { loading } = useProfile();



    if (loading) {
        return <div><Skleton3 /></div>

    }

    return (
        <div className="relative">
                <div className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 shadow-sm  p-1.5 flex justify-between px-32 h-16 bg-white" onClick={() => {
                    if (showPopDownCard) {
                        setShowPopDownCard(false);
                    }
                }}>
                    <Link to={'/blogs'}>
                        <div className="flex justify-center items-center gap-1 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 mt-0.5">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                            <div className="tracking-wide mt-1 font-extrabold text-2xl font-mono">
                                MEDIUM
                            </div>
                        </div>
                    </Link>
                    <div className="relative">
                        <AppbarContent />
                    </div>
                </div>
            </div>
    );
};

function CreateBLogVisibility() {
    const location = useLocation();
    if (location.pathname === '/publish') {
        return null;
    }
    return (
        <div>
            <Link to={'/publish'}>
                <button type="button" className="text-gray-900 hover:text-white border border-slate-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-1.5 text-center me-6 mb-2 mt-1.5">
                    Create New Blog
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
            await axios.post(`${BACKEND_URL}/api/v1/user/signout`, {}, { withCredentials: true });
            setProfile({
                email: "",
                name: "",
                description: "",
                id: ""
            });
            setShowPopDownCard(prev => !prev);
            navigate('/signin');
        } catch (e) {
            console.log(e);
        }
    }

    const location = useLocation();
    if (location.pathname === '/') {
        return (
            <div className="flex gap-4 justify-center items-center mt-2">
                <button>signup</button>
                <button>signin</button>
            </div>
        )
    } else {
        return (
            <div className="flex gap-1">
                <CreateBLogVisibility />
                {profile.name && (
                    <div onClick={() => setShowPopDownCard(prev => !prev)} className="relative inline-flex items-center justify-center me-3 w-9 h-9 overflow-hidden bg-gray-200 rounded-full hover:cursor-pointer mt-1" style={{ userSelect: 'none' }}>
                        <span className="font-bold text-xl text-black">
                            {profile.name[0].toUpperCase()}
                        </span>
                    </div>
                )}
                {showPopDownCard && (
                    <div className="absolute top-full mt-2 right-0 w-52 bg-slate-100 border border-gray-300 rounded-lg shadow-lg">
                        <ul className="py-2">
                            <Link to="/profilepage" onClick={() => setShowPopDownCard(prev => !prev)}>
                                <li className="flex justify-start items-center gap-1.5 my-4 hover:bg-white rounded-xl mx-2 h-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 ml-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <div className="block text-sm">
                                        Profile
                                    </div>
                                </li>
                            </Link>
                            <Link to={`/myblogs/${profile.id}`} onClick={() => setShowPopDownCard(prev => !prev)}>
                                <li className="flex justify-start items-center gap-1.5 my-4 hover:bg-white rounded-xl mx-2 h-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ml-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                    </svg>

                                    <div className="block text-sm">
                                        My Blogs
                                    </div>
                                </li>
                            </Link>
                            <li onClick={handleLogout} className="flex justify-start items-center gap-1.5 my-4 hover:bg-white rounded-xl mx-2 h-8">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <button className="w-full text-left text-sm block">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }

}