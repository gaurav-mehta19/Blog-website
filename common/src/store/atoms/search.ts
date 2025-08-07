import { atom } from "recoil";

export const searchAtom = atom<string>({
    key: "searchAtom",
    default: ""
});