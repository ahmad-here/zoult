'use client'

import { useRouter } from 'next/navigation'
import blogsData from '../../data/blogs.js'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'

interface BloglistProps {
    count: number;
    excludeBlogId?: number;
    className?: string;
    compact?: boolean;
}

export default function Bloglist({ count, excludeBlogId, className = '', compact = false }: BloglistProps) {
    const router = useRouter()
    
    // Array of imported images for dynamic assignment
    const blogImages = [blog1.src, blog2.src, blog3.src];
    
    // Get image for blog based on blogid
    const getImageForBlog = (blogid: number): string => {
        // blogid starts from 1, array index starts from 0
        const imageIndex = (blogid - 1) % blogImages.length;
        return blogImages[imageIndex];
    };

    // Get blogs excluding the main blog, then take the required count
    const filteredBlogs = excludeBlogId 
        ? blogsData.filter(blog => blog.blogid !== excludeBlogId)
        : blogsData;
    
    const blogsToShow = filteredBlogs.slice(0, count);

    // Function to truncate content to a specific length
    const truncateContent = (content: string, maxLength: number = 90): string => {
        if (content.length <= maxLength) return content;
        return content.substr(0, maxLength) + '...';
    };

    // Navigate to individual blog page
    const handleBlogClick = (slug: string) => {
        router.push(`/blogs/${slug}`)
    };

    const wrapperClasses = compact
        ? `space-y-5 w-full font-poppins ${className}`
        : `space-y-6 mt-10 w-[90%] max-w-[700px] font-poppins ${className}`

    const itemClasses = compact
        ? 'flex gap-3 items-start cursor-pointer group'
        : 'flex gap-4 items-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer group'

    const imageClasses = compact
        ? 'w-16 h-14 flex-shrink-0 rounded overflow-hidden'
        : 'w-20 h-20  flex-shrink-0 rounded-lg overflow-hidden'

    const titleClasses = compact
        ? 'font-bold text-sm leading-snug mb-1 group-hover:text-lime-700 transition-colors duration-200'
        : 'font-bold text-lg mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-200'

    const contentClasses = compact
        ? 'text-xs text-gray-600'
        : 'text-sm text-gray-700 leading-relaxed'

    return (
        <div className={wrapperClasses}>
            {blogsToShow.map((post) => (
                <div 
                    key={post.blogid} 
                    className={itemClasses}
                    onClick={() => handleBlogClick(post.slug)}
                >
                    {/* Blog Image */}
                    <div className={imageClasses}>
                        <img 
                            src={getImageForBlog(post.blogid)} 
                            alt={post.tittle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        {/* Category Badge */}
                        {!compact && <div className="mb-2">
                            <span className="px-2 py-1 text-xs bg-lime-100 text-lime-700 rounded-full font-medium">
                                {post.catagory}
                            </span>
                        </div>}
                        
                        {/* Title */}
                        <h3 className={titleClasses}>
                            {post.tittle}
                        </h3>
                        
                        {/* Content Preview */}
                        <p className={contentClasses}>
                            {truncateContent(post.content, compact ? 90 : 120)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}