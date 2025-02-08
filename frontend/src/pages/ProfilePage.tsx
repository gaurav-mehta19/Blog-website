import { useRecoilState } from "recoil";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { Appbar } from "../components/Appbar";
import { useProfile } from "../hooks/profile";
import { Mail, User, FileText, Loader2 } from "lucide-react";

export const ProfilePage = () => {
    const { profile, loading } = useProfile();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div 
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20" 
                onClick={() => {
                    if (showPopDownCard) {
                        setShowPopDownCard(false);
                    }
                }}
            >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-10">
                    <div className="h-32 bg-gradient-to-r from-yellow-200 to-yellow-100"></div>
                    <div className="relative px-6 pb-6">
                        <div className="relative -mt-16 mb-6">
                            <div className="bg-white p-4 rounded-full shadow-lg inline-block">
                                <User className="w-16 h-16 text-gray-700" />
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Mail className="w-5 h-5" />
                                <span>{profile.email}</span>
                            </div>
                            
                            <div className="flex items-start space-x-2">
                                <FileText className="w-5 h-5 text-gray-600 mt-1" />
                                <p className="text-gray-600 leading-relaxed">
                                    {profile.description || "No description provided"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;