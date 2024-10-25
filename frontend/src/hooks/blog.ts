import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import moment from 'moment';


export interface Blog {
  author: {
    name: string;
  };
  title: string;
  content: string;
  id: string;
  image: string;
  publishDate: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | undefined>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      withCredentials: true,
      })
      .then((response) => {
        const fetchedBlog = response.data.blog;
        fetchedBlog.publishDate = fetchedBlog.publishDate ? moment(fetchedBlog.publishDate).format('dddd, MMMM Do, YYYY'): "Unknow publish date"; 
        setBlog(fetchedBlog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        withCredentials: true,
      })
      .then((response) => {
        const fetchedBlogs = response.data.blogs.map((blog: Blog) => ({
          ...blog,
          publishDate: moment(blog.publishDate).format('dddd, MMMM Do, YYYY'),
        }));

        setBlogs(fetchedBlogs);
        setLoading(false);
      })
  }, []);

  return {
    loading,
    blogs,
  };
};
