import { atom } from "recoil";

type Profile = {
    id: string;
    name: string;
    email: string;
    description: string;
} | null;

export const profileAtom = atom<Profile>({
    key: "profile",
    default: {
        id: "",
        name: "",
        email: "",
        description:""
    }
})