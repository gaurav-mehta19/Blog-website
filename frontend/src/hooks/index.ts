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
  publishedDate: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | undefined>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')!,
        },
      })
      .then((response) => {
        const fetchedBlog = response.data.blog;
        
        // Parse and format the publishedDate using moment
        fetchedBlog.publishedDate = moment(fetchedBlog.publishedDate).format('MMMM Do, YYYY'); 
        
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
        headers: {
          Authorization: localStorage.getItem('token')!,
        },
      })
      .then((response) => {
        const fetchedBlogs = response.data.blogs.map((blog: Blog) => ({
          ...blog,
          // Parse and format the publishedDate using moment
          publishedDate: moment(blog.publishedDate).format('MMMM Do, YYYY'),
        }));

        setBlogs(fetchedBlogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
