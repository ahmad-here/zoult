'use client'

import { useRouter } from 'next/navigation'
import blogsData from '../../data/blogs.js'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'

interface BloglistProps {
    count: number;
    excludeBlogId?: number;
}

export default function Bloglist({ count, excludeBlogId }: BloglistProps) {
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
    const handleBlogClick = (blogid: number) => {
        router.push(`/blogs/${blogid}`)
    };

    return (
        <div className="space-y-6 mt-10 w-[90%] max-w-[700px] font-poppins">
            {blogsToShow.map((post, index) => (
                <div 
                    key={post.blogid} 
                    className="flex gap-4 items-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                    onClick={() => handleBlogClick(post.blogid)}
                >
                    {/* Blog Image */}
                    <div className="w-20 h-20  flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                            src={getImageForBlog(post.blogid)} 
                            alt={post.tittle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        {/* Category Badge */}
                        <div className="mb-2">
                            <span className="px-2 py-1 text-xs bg-lime-100 text-lime-700 rounded-full font-medium">
                                {post.catagory}
                            </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                            {post.tittle}
                        </h3>
                        
                        {/* Content Preview */}
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {truncateContent(post.content)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}