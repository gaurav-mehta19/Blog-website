import { atom } from "recoil";

export const showPasswordAtom = atom<boolean>({
    key: "showPassword",
    default: false
})