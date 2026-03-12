'use client'

import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import blogsData from '@/data/blogs.js'
import blog1 from '@/components/assets/blog1.jpg'
import blog2 from '@/components/assets/blog2.jpg'
import blog3 from '@/components/assets/blog3.jpg'
import Bloglist from '@/components/Bloglist'


export default function BlogDetail() {
    const params = useParams()
    const blogId = parseInt(params.id as string)

    // Find the blog by ID
    const blog = blogsData.find(b => b.blogid === blogId)

    // Array of imported images for dynamic assignment
    const blogImages = [blog1.src, blog2.src, blog3.src];

    // Get image for blog based on blogid
    const getImageForBlog = (blogid: number): string => {
        const imageIndex = (blogid - 1) % blogImages.length;
        return blogImages[imageIndex];
    };

    if (!blog) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
                    <p className="text-gray-600 mb-8">The blog you're looking for doesn't exist.</p>
                    <a
                        href="/blogs"
                        className="bg-[#A8D400] hover:bg-[#96c000] px-6 py-3 rounded-full font-medium transition-colors duration-300"
                    >
                        Back to Blogs
                    </a>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center py-3">
                <article className="max-w-[800px] w-[85%] font-poppins">
                    <div className="mb-4">
                        <span className="px-3 py-1 text-sm bg-lime-100 text-lime-700 rounded-full font-medium">
                            {blog.catagory}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
                        {blog.tittle}
                    </h1>
                    <div className="mb-8 shadow-[0px_4px_17px_-5px_rgba(0,_0,_0,_0.8)] overflow-hidden">
                        <img
                            src={getImageForBlog(blog.blogid)}
                            alt={blog.tittle}
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                            {blog.content}
                        </p>
                    </div>
                </article>
<Bloglist count={4} excludeBlogId={blog.blogid} />
            </div>
        </>
    )
}