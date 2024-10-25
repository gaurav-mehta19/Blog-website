import { atom } from "recoil";

export const deletepopAtom = atom<boolean>({
    key: "deletepopcard",
    default: false
})