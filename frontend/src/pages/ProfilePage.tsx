
import { Appbar } from "../components/Appbar";
import { useProfile } from "../hooks/profile";

export const ProfilePage = ()=> {
    const {profile , loading} = useProfile();

    if(loading){
        return <div>loading...</div>
    }

    return (
        <div>
            <Appbar />
            <div className="mt-20 ml-32">
            <div>{profile.name}</div>
            <div>{profile.email}</div>
            <div>{profile.description}</div>
            </div>
            <div></div>
        </div>

    );
}