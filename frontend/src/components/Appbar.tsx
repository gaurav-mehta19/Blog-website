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
import { BookOpen, Menu, X } from 'lucide-react';
import { Pen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

export const Appbar = () => {
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { loading } = useProfile();
    const location = useLocation();

    if (location.pathname !== '/') {
        if (loading) {
            return <div><Skleton3 /></div>
        }
    }

    return (
        <nav 
            onClick={() => {
                if(showPopDownCard){
                    setShowPopDownCard(false)
                }
            }} 
            className="
                fixed top-0 left-0 right-0 z-50 
                bg-bg-primary/95 backdrop-blur-md
                border-b border-border-primary
                shadow-theme-sm
                transition-all duration-300 ease-in-out
            "
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link 
                        to={location.pathname === '/' ? '#' : '/blogs'}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
                    >
                        <div className="p-2 rounded-lg bg-theme-primary text-white">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold text-text-primary tracking-tight">
                                Medium
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <ThemeToggle />
                        <AppbarContent />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMobileMenu(!showMobileMenu);
                            }}
                            className="
                                p-2 rounded-lg
                                text-text-secondary hover:text-text-primary
                                hover:bg-bg-secondary
                                transition-all duration-200
                            "
                        >
                            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-bg-primary border-t border-border-primary shadow-theme-lg">
                    <div className="px-4 py-4 space-y-4">
                        <MobileAppbarContent onClose={() => setShowMobileMenu(false)} />
                    </div>
                </div>
            )}
        </nav>
    );
};

function CreateBLogVisibility() {
    const location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useRecoilState(blogAtom);
    
    const handlePublish = async () => {
        if(blog.title.trim().length < 1 || blog.content.trim().length <1){
            toast.warning("Please fill all fields")
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
        } catch (e: unknown) {
            toast.dismiss(loadingToastId);
            if (e && typeof e === 'object' && 'response' in e) {
                const error = e as { response?: { data?: { error?: string } } };
                if (error.response?.data?.error) {
                    toast.warning(error.response.data.error);
                } else {
                    console.error('Error publishing blog', e);
                    toast.error("An error occurred. Please try again later");
                }
            } else {
                console.error('Error publishing blog', e);
                toast.error("An error occurred. Please try again later");
            }
        }
    };

    if (location.pathname === '/publish') {
        return (
            <button 
                onClick={handlePublish} 
                className="
                    inline-flex items-center gap-2 px-6 py-2.5
                    bg-theme-success hover:bg-theme-success-hover
                    text-white font-medium rounded-lg
                    shadow-theme-sm hover:shadow-theme-md
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-theme-success focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                "
            >
                <Pen className="h-4 w-4" />
                Publish Blog
            </button>
        );
    }

    return (
        <Link to="/publish">
            <button 
                className="
                    inline-flex items-center gap-2 px-4 py-2
                    bg-bg-primary hover:bg-bg-secondary
                    text-text-primary border border-border-primary
                    font-medium rounded-lg
                    shadow-theme-sm hover:shadow-theme-md
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2
                "
            >
                <Pen className="h-4 w-4" />
                Write
            </button>
        </Link>
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
            const loadingToastId = toast.loading("Signing in as a test user")
            await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                email: import.meta.env.VITE_TEST_USER_EMAIL,
                password: import.meta.env.VITE_TEST_USER_PASSWORD
            },{
                withCredentials:true
            })
            toast.dismiss(loadingToastId)
            toast.success("Signed in successfully")
            navigate("/blogs")
        }catch(e: unknown){
            console.log(e);
        }
    }

    const location = useLocation();
    if (location.pathname === '/') {
        return (
            <div className="flex items-center gap-6">
                <Link 
                    to="/blogs" 
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                    Our Story
                </Link>
                <Link 
                    to="/signin" 
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                    Write
                </Link>
                <Link 
                    to="/signin" 
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                    Sign In
                </Link>
                <button 
                    onClick={HandleTryOn} 
                    className="
                        bg-theme-primary hover:bg-theme-primary-hover
                        text-white font-medium px-4 py-2 rounded-lg
                        transition-all duration-200
                        shadow-theme-sm hover:shadow-theme-md
                        focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2
                    "
                >
                    Try Now!
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-4">
            <CreateBLogVisibility />
            {profile?.name && (
                <div className="relative">
                    <button
                        onClick={() => setShowPopDownCard(prev => !prev)}
                        className="
                            w-10 h-10 rounded-full
                            bg-theme-primary hover:bg-theme-primary-hover
                            text-white font-bold text-lg
                            flex items-center justify-center
                            transition-all duration-200
                            shadow-theme-sm hover:shadow-theme-md
                            focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2
                        "
                        style={{ userSelect: 'none' }}
                    >
                        {profile.name[0].toUpperCase()}
                    </button>
                    
                    {showPopDownCard && (
                        <div className="
                            absolute top-full mt-2 right-0 w-48
                            bg-bg-primary border border-border-primary
                            rounded-lg shadow-theme-xl
                            py-2 z-50
                        ">
                            <Link 
                                to="/profilepage" 
                                onClick={() => setShowPopDownCard(false)}
                                className="
                                    flex items-center gap-3 px-4 py-2
                                    text-text-secondary hover:text-text-primary
                                    hover:bg-bg-secondary
                                    transition-all duration-200
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Profile
                            </Link>
                            
                            <Link 
                                to={`/myblogs/${profile?.id}`} 
                                onClick={() => setShowPopDownCard(false)}
                                className="
                                    flex items-center gap-3 px-4 py-2
                                    text-text-secondary hover:text-text-primary
                                    hover:bg-bg-secondary
                                    transition-all duration-200
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                </svg>
                                My Blogs
                            </Link>
                            
                            <hr className="my-2 border-border-primary" />
                            
                            <button
                                onClick={handleLogout}
                                className="
                                    flex items-center gap-3 px-4 py-2 w-full
                                    text-text-secondary hover:text-text-primary
                                    hover:bg-bg-secondary
                                    transition-all duration-200
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function MobileAppbarContent({ onClose }: { onClose: () => void }) {
    const navigate = useNavigate();
    const setProfile = useSetRecoilState(profileAtom);
    const { profile } = useProfile();
    const location = useLocation();

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
            onClose();
            navigate('/signin');
        } catch (e) {
            console.log(e);
        }
    }

    async function HandleTryOn() {
        try{
            const loadingToastId = toast.loading("Signing in as a test user")
            await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                email: import.meta.env.VITE_TEST_USER_EMAIL,
                password: import.meta.env.VITE_TEST_USER_PASSWORD
            },{
                withCredentials:true
            })
            toast.dismiss(loadingToastId)
            toast.success("Signed in successfully")
            onClose();
            navigate("/blogs")
        }catch(e: unknown){
            console.log(e);
        }
    }

    if (location.pathname === '/') {
        return (
            <div className="space-y-4">
                <Link 
                    to="/blogs" 
                    onClick={onClose}
                    className="block text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
                >
                    Our Story
                </Link>
                <Link 
                    to="/signin" 
                    onClick={onClose}
                    className="block text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
                >
                    Write
                </Link>
                <Link 
                    to="/signin" 
                    onClick={onClose}
                    className="block text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
                >
                    Sign In
                </Link>
                <button 
                    onClick={HandleTryOn} 
                    className="
                        w-full bg-theme-primary hover:bg-theme-primary-hover
                        text-white font-medium px-4 py-3 rounded-lg
                        transition-all duration-200
                        shadow-theme-sm hover:shadow-theme-md
                    "
                >
                    Try Now!
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <CreateBLogVisibility />
            
            {profile?.name && (
                <>
                    <div className="flex items-center gap-3 py-2">
                        <div className="
                            w-8 h-8 rounded-full bg-theme-primary
                            text-white font-bold text-sm
                            flex items-center justify-center
                        ">
                            {profile.name[0].toUpperCase()}
                        </div>
                        <span className="text-text-primary font-medium">{profile.name}</span>
                    </div>
                    
                    <Link 
                        to="/profilepage" 
                        onClick={onClose}
                        className="
                            flex items-center gap-3 py-2
                            text-text-secondary hover:text-text-primary
                            transition-colors duration-200
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Profile
                    </Link>
                    
                    <Link 
                        to={`/myblogs/${profile?.id}`} 
                        onClick={onClose}
                        className="
                            flex items-center gap-3 py-2
                            text-text-secondary hover:text-text-primary
                            transition-colors duration-200
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                        My Blogs
                    </Link>
                    
                    <button
                        onClick={handleLogout}
                        className="
                            flex items-center gap-3 py-2 w-full
                            text-text-secondary hover:text-text-primary
                            transition-colors duration-200
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Sign Out
                    </button>
                </>
            )}
        </div>
    )
}