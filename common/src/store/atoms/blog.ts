import { atom } from "recoil";
import { CreateBlogInput } from "../../zod/zod";

export const blogAtom = atom<CreateBlogInput>({
    key: "blogAtom",
    default: {
        title: "",
        content: "",
        firstImgUrl: "",
    }
})