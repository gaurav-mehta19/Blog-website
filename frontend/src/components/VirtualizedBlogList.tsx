import { memo, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import { Blog } from '../hooks/blog';

interface VirtualizedBlogListProps {
  blogs: Blog[];
  searchQuery?: string;
}

const ITEMS_PER_PAGE = 10;

export const VirtualizedBlogList = memo(({ blogs }: VirtualizedBlogListProps) => {
  // Simple pagination instead of full virtualization for now
  const displayedBlogs = useMemo(() => {
    return blogs.slice(0, ITEMS_PER_PAGE);
  }, [blogs]);

  return (
    <div className="space-y-2">
      {displayedBlogs.map((blog, index) => (
        <div 
          key={blog.id} 
          className="animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <BlogCard
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishDate}
            firstImgUrl={blog.image}
          />
        </div>
      ))}
      
      {/* Load more button if there are more blogs */}
      {blogs.length > ITEMS_PER_PAGE && (
        <div className="text-center py-8">
          <button 
            className="bg-theme-primary hover:bg-theme-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
            onClick={() => {
              // TODO: Implement load more functionality
              console.log('Load more clicked');
            }}
          >
            Load More ({blogs.length - ITEMS_PER_PAGE} remaining)
          </button>
        </div>
      )}
    </div>
  );
});