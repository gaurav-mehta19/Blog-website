import { Link } from "react-router-dom";
interface BlogCardtypes {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string;
    firstImgUrl?: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate, id, firstImgUrl }: BlogCardtypes) => {
    const sanitizeContent = (html: string) => {
        return html
            .replace(/<(?!\/?p\b)[^>]*>/gi, '')
            .replace(/<p>\s*<\/p>/g, '');
    };

    const sanitizedContent = sanitizeContent(content);
    const truncatedTitle = title.length > 60 ? title.slice(0, 60) + "..." : title;

    const getLinkPath = () => {
        if (location.pathname === '/blogs') {
            return `/blog/${id}`
        } else if (location.pathname.startsWith("/myblogs")) {
            const userId = location.pathname.split("/")[2]
            return `/myblog/${userId}/${id}`
        }
        return `/blog/${id}`
    }

    return (
        <Link to={getLinkPath()}>
            <article className="
                group hover-lift cursor-pointer
                bg-bg-primary border border-border-primary
                rounded-lg p-6 mb-6 mx-auto max-w-4xl
                shadow-theme-sm hover:shadow-theme-md
                transition-all duration-300 ease-in-out
                animate-fadeInUp
            ">
                {/* Author info */}
                <div className="flex items-center gap-3 mb-4">
                    <Avatar name={authorName || "Anonymous"} />
                    <div className="flex items-center gap-2 text-sm font-inter">
                        <span className="font-medium text-text-primary">
                            {authorName || "Anonymous"}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
                        <time className="text-text-secondary">
                            {publishedDate}
                        </time>
                        <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
                        <span className="text-text-secondary">
                            {`${Math.ceil(content.length / 600)} min read`}
                        </span>
                    </div>
                </div>

                {/* Content layout */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                        <h2 className="
                            text-xl sm:text-2xl font-bold font-playfair
                            text-text-primary group-hover:text-theme-primary
                            transition-colors duration-200
                            line-clamp-2 mb-3
                        ">
                            {truncatedTitle}
                        </h2>
                        
                        <div 
                            className="
                                text-text-secondary font-inter text-base leading-relaxed
                                line-clamp-3 mb-4
                            "
                            dangerouslySetInnerHTML={{ 
                                __html: sanitizedContent.slice(0, 150) + "..." 
                            }}
                        />

                        <div className="flex justify-end">
                            <span className="
                                text-theme-primary font-medium text-sm
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-200
                            ">
                                Read more →
                            </span>
                        </div>
                    </div>

                    {/* Featured image */}
                    {firstImgUrl && (
                        <div className="w-full sm:w-40 flex-shrink-0">
                            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-theme-sm">
                                <img 
                                    src={firstImgUrl} 
                                    alt={title}
                                    className="
                                        w-full h-full object-cover
                                        group-hover:scale-105
                                        transition-transform duration-300
                                    "
                                />
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}

function Avatar({ name }: { name: string }) {
    const colors = [
        'bg-gradient-to-br from-theme-primary to-theme-primary-hover',
        'bg-gradient-to-br from-theme-secondary to-theme-secondary-hover',
        'bg-gradient-to-br from-orange-400 to-orange-500',
        'bg-gradient-to-br from-amber-400 to-amber-500',
        'bg-gradient-to-br from-emerald-400 to-emerald-500',
        'bg-gradient-to-br from-teal-400 to-teal-500',
        'bg-gradient-to-br from-rose-400 to-rose-500',
        'bg-gradient-to-br from-yellow-400 to-yellow-500',
        'bg-gradient-to-br from-lime-400 to-lime-500',
        'bg-gradient-to-br from-cyan-400 to-cyan-500'
    ];

    // Use a deterministic color based on the name to ensure consistency
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const selectedColor = colors[colorIndex];

    return (
        <div className={`
            relative inline-flex items-center justify-center 
            w-10 h-10 overflow-hidden rounded-full
            ${selectedColor} hover:scale-110
            transition-transform duration-200
            shadow-theme-sm ring-2 ring-bg-primary
        `}>
            <span className="font-bold text-sm text-white drop-shadow-sm">
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}