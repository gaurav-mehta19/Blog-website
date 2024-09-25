import { atom } from "recoil";

export const popdowncardAtom = atom<boolean>({
    key: "popdowncard",
    default: false
})