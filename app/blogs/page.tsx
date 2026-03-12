'use client'
import { useState } from 'react'
import Header from "@/components/Header"
import Mainblog from "@/components/Mainblog"
import Navbar from "@/components/Navbar"
import Bloglist from "@/components/Bloglist"

export default function Blogs() {
    const [mainBlogId, setMainBlogId] = useState<number | null>(null)
    
    const handleBlogSelect = (blogId: number) => {
        setMainBlogId(blogId)
    }
    
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center py-3">
                <Header title="Latest" />
                <div className='flex flex-col items-center justify-center md:flex md:justify-around md:w-[90%] md:flex-row md:items-start gap-10'>

                <Mainblog onBlogSelect={handleBlogSelect} />
                <div className='md:w-[40%] flex flex-col items-center justify-center'>

                <Bloglist count={4} excludeBlogId={mainBlogId || undefined} />
                </div>
                </div>
            </div>
        </>
    )
}