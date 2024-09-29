import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile";
import axios from "axios";
import { useEffect, useState } from "react";
import {useRecoilState} from "recoil";
import { BACKEND_URL } from "../config";

export const useProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useRecoilState(profileAtom);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
            withCredentials: true,
        })
            .then((response) => {
                setProfile(response.data.profile);
                setLoading(false);
            });
    }, [setProfile]);

    return {
        loading,
        profile,
    };
}   