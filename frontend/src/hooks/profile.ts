// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { useEffect } from "react";
// import { useSetRecoilState } from "recoil";
// import { profileAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/profile"


// export const useProfile = () =>{
//     const setProfileState = useSetRecoilState(profileAtom);

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
//             withCredentials: true,
//         })
//         .then((response) => {
//             const fetchedProfile = response.data.profile;
//             console.log(fetchedProfile);
//             setProfileState(fetchedProfile);
//         });

//     }, [setProfileState]);
// }