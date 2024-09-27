import { useEffect, useState } from "react";
import {Blog} from "./blog"
import axios from "axios";
import { BACKEND_URL } from "../config";
import moment from "moment";



export const useMyblogs = ({userId}:{userId:string}) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/myblogs/${userId}`, {
            withCredentials:true
        }).then((response) => {
            const fetchedBlogs = response.data.myblogs;
            fetchedBlogs.publishDate = fetchedBlogs.publishDate ? moment(fetchedBlogs.publishDate).format('dddd, MMMM Do, YYYY'): "Unknow publish date"; 
            setBlogs(fetchedBlogs);
            setLoading(false);
        })
    },[userId])

    return {
        loading,
        blogs
    }   
}