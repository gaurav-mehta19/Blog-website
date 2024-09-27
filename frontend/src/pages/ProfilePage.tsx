
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
            <div>{profile.name}</div>
            <div>{profile.email}</div>
            <div></div>
        </div>

    );
}