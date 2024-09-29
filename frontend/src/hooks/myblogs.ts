import { useEffect, useState } from "react";
import { Blog } from "./blog"; 
import axios from "axios";
import { BACKEND_URL } from "../config";
import moment from "moment";

export const useMyblogs = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState(true);
    const [myblogs, setMyblogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/myblogs/${userId}`, {
            withCredentials: true,
        }).then((response) => {
            console.log(response.data)
            const fetchedBlogs = response.data.myblogs;
            console.log(fetchedBlogs);
            
            const formattedBlogs = fetchedBlogs.map((blog: Blog) => ({
                ...blog,
                publishDate: blog.publishDate ? moment(blog.publishDate).format('dddd, MMMM Do, YYYY') : "Unknown publish date",
            }));
            setMyblogs(formattedBlogs);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        });
    }, [userId]);

    return {
        loading,
        myblogs,
    };
};
