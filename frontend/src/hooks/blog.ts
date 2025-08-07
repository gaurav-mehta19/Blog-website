import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";
import moment from 'moment';

// Simple cache for API requests
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
};

const setCachedData = (key: string, data: unknown) => {
  cache.set(key, { data, timestamp: Date.now() });
};


export interface Blog {
  author: {
    name: string;
    description: string;
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
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    // Check cache first
    const cacheKey = `blog-${id}`;
    const cachedBlog = getCachedData<Blog>(cacheKey);
    
    if (cachedBlog) {
      setBlog(cachedBlog);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        withCredentials: true,
        timeout: 10000, // 10 second timeout
      });
      
      const fetchedBlog = response.data.blog;
      // Optimize date formatting
      fetchedBlog.publishDate = fetchedBlog.publishDate 
        ? moment(fetchedBlog.publishDate).format('dddd, MMMM Do, YYYY')
        : "Unknown publish date";
      
      setCachedData(cacheKey, fetchedBlog);
      setBlog(fetchedBlog);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to load blog');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const refetch = useCallback(() => {
    cache.delete(`blog-${id}`);
    fetchBlog();
  }, [id, fetchBlog]);

  return {
    loading,
    blog,
    error,
    refetch,
  };
};

// Preload blogs data when user is likely to navigate to blogs page
export const preloadBlogs = () => {
  const cacheKey = 'blogs-bulk';
  const cachedBlogs = getCachedData<Blog[]>(cacheKey);
  
  if (!cachedBlogs) {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      withCredentials: true,
      timeout: 15000,
    }).then((response) => {
      const fetchedBlogs = response.data.blogs.map((blog: Blog) => ({
        ...blog,
        publishDate: moment(blog.publishDate).format('dddd, MMMM Do, YYYY'),
      }));
      setCachedData(cacheKey, fetchedBlogs);
    }).catch((err) => {
      console.warn('Blog preload failed:', err);
    });
  }
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    // Check cache first - might have been preloaded
    const cacheKey = 'blogs-bulk';
    const cachedBlogs = getCachedData<Blog[]>(cacheKey);
    
    if (cachedBlogs) {
      setBlogs(cachedBlogs);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        withCredentials: true,
        timeout: 15000,
      });
      
      // Optimize bulk date formatting using batch processing
      const fetchedBlogs = response.data.blogs.map((blog: Blog) => ({
        ...blog,
        publishDate: moment(blog.publishDate).format('dddd, MMMM Do, YYYY'),
      }));

      setCachedData(cacheKey, fetchedBlogs);
      setBlogs(fetchedBlogs);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to load blogs';
      setError(errorMessage);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const refetch = useCallback(() => {
    cache.delete('blogs-bulk');
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    loading,
    blogs,
    error,
    refetch,
  };
};
