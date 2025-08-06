import { useRecoilState } from "recoil";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { Appbar } from "../components/Appbar";
import { useProfile } from "../hooks/profile";
import { Mail, User, FileText, Loader2, MapPin, Calendar } from "lucide-react";

export const ProfilePage = () => {
    const { profile, loading } = useProfile();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-theme-primary" />
                    <p className="font-inter text-text-secondary">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-primary">
            <Appbar />
            <div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12" 
                onClick={() => {
                    if (showPopDownCard) {
                        setShowPopDownCard(false);
                    }
                }}
            >
                {/* Hero Section */}
                <div className="bg-bg-primary rounded-2xl shadow-theme-xl overflow-hidden border border-border-primary animate-fadeInUp">
                    {/* Cover Background */}
                    <div className="h-48 bg-gradient-to-br from-theme-primary to-theme-primary-hover relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-secondary/20 to-transparent"></div>
                    </div>

                    {/* Profile Content */}
                    <div className="relative px-8 pb-8">
                        {/* Profile Avatar */}
                        <div className="relative -mt-20 mb-8">
                            <div className="bg-bg-primary p-6 rounded-full shadow-theme-lg inline-block border-4 border-bg-primary">
                                <div className="w-24 h-24 bg-gradient-to-br from-theme-primary to-theme-primary-hover rounded-full flex items-center justify-center shadow-theme-md">
                                    <span className="text-white font-bold text-4xl font-playfair">
                                        {profile?.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Profile Information */}
                        <div className="space-y-8">
                            {/* Name Section */}
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary leading-tight">
                                    {profile?.name || "Anonymous Writer"}
                                </h1>
                                <p className="text-theme-primary font-inter font-medium text-lg">
                                    Storyteller & Content Creator
                                </p>
                            </div>

                            {/* Contact & Info Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Email */}
                                <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-xl border border-border-primary hover:shadow-theme-sm transition-all duration-200">
                                    <div className="p-3 bg-theme-primary rounded-lg">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-inter font-medium text-text-secondary text-sm">Email</p>
                                        <p className="font-inter text-text-primary">{profile?.email}</p>
                                    </div>
                                </div>

                                {/* Member Since */}
                                <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-xl border border-border-primary hover:shadow-theme-sm transition-all duration-200">
                                    <div className="p-3 bg-theme-secondary rounded-lg">
                                        <Calendar className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-inter font-medium text-text-secondary text-sm">Member Since</p>
                                        <p className="font-inter text-text-primary">January 2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="bg-bg-secondary rounded-xl p-6 border border-border-primary">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-theme-primary rounded-lg">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-playfair font-bold text-xl text-text-primary mb-3">
                                            About Me
                                        </h3>
                                        <p className="font-inter text-text-secondary leading-relaxed text-lg">
                                            {profile?.description || "A passionate writer sharing stories and insights with the world. Always curious about life's many facets and eager to connect through the written word."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;