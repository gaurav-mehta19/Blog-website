import { atom } from "recoil";

export const popupcardAtom = atom<boolean>({
    key: "popupcard",
    default: false
})