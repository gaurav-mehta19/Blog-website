import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile";
import axios from "axios";
import { BACKEND_URL } from "../src/config";
import { ReactNode } from "react";

interface ProfileProps {
    children: ReactNode;
}

export const Profile: React.FC<ProfileProps> = ({ children }) => {
    const setProfileState = useSetRecoilState(profileAtom);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
            withCredentials: true,
        })
        .then((response) => {
            const fetchedProfile = response.data.profile;
            setProfileState(fetchedProfile);
        })
        .catch((error) => {
            console.error("Failed to fetch profile:", error);
        });
    }, [setProfileState]);

    return (
        <div>
            {children}
        </div>
    );
};
