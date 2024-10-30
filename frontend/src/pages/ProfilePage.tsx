import { useRecoilState } from "recoil";
import { popdowncardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popdownCard";
import { Appbar } from "../components/Appbar";
import { useProfile } from "../hooks/profile"

export const ProfilePage = ()=> {
    const {profile , loading} = useProfile();
    const [showPopDownCard, setShowPopDownCard] = useRecoilState(popdowncardAtom);

    if(loading){
        return <div>loading...</div>
    }

    return (
        <div>
            <Appbar />
            <div className="mt-20 ml-32 w-full h-screen" onClick={()=>{
                        if(showPopDownCard){
                            setShowPopDownCard(false);
                        }
                    }}>
            <div>{profile.name}</div>
            <div>{profile.email}</div>
            <div>{profile.description}</div>
            </div>
        </div>

    );
}