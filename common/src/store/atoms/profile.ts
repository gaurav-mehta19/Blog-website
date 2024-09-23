import { atom } from "recoil";

export const profileAtom = atom({
    key: "profile",
    default: {
        id:"",
        name: "",
        email: "",
        description:""
    }
})