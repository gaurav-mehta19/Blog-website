import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BACKEND_URL } from "../config";

export const useProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useRecoilState(profileAtom);
    const [auth, setAuth] = useState(false);
    const [statusCode, setStatusCode] = useState<number | null>(null); // Store status code

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/profile`, { withCredentials: true })
            .then((response) => {
                setProfile(response.data.profile);
                setAuth(true);
                setStatusCode(200); // Success
            })
            .catch((error) => {
                if (error.response) {
                    setStatusCode(error.response.status); // Store actual status code
                    if (error.response.status === 405) {
                        console.warn("Unauthorized: 405 status received.");
                    }
                } else {
                    setStatusCode(500); // Unknown error (server down, network issue, etc.)
                }
                setProfile(null);
                setAuth(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setProfile]);

    return {
        loading,
        auth,
        profile,
        statusCode, // Return status code for route protection
    };
};
