import Navbar from '@/components/Navbar'
import Bloglist from '@/components/Bloglist'
import blogsData from '@/data/blogs.js'
import blog1 from '@/components/assets/blog1.jpg'
import blog2 from '@/components/assets/blog2.jpg'
import blog3 from '@/components/assets/blog3.jpg'

export function generateStaticParams() {
    return blogsData.map((blog) => ({
        id: blog.slug,
    }))
}

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const blog = blogsData.find((b: { slug: string }) => b.slug === id)

    const blogImages = [blog1.src, blog2.src, blog3.src]

    const getImageForBlog = (blogid: number): string => {
        const imageIndex = (blogid - 1) % blogImages.length
        return blogImages[imageIndex]
    }

    if (!blog) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
                    <p className="text-gray-600 mb-8">The blog you&apos;re looking for doesn&apos;t exist.</p>
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

    // Split content: first 2 sentences → bold intro, rest → body
    const sentences = blog.content.split('. ')
    const introPart = sentences.slice(0, 2).join('. ') + '.'
    const restPart = sentences.slice(2).join('. ')

    return (
        <>
            <Navbar />
            <div className="max-w-[1100px] mx-auto px-6 py-6 font-poppins">

                {/* 1. Heading — full width */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                    {blog.tittle}
                </h1>

                {/* 2 + 4. md: image left, 3 stacked cards right — mobile: image then cards below */}
                <div className="md:flex md:gap-18 mb-6 md:items-center">

                    {/* Left: Image */}
                    <div className="md:w-[55%] flex-shrink-0 shadow-[0px_4px_17px_-5px_rgba(0,0,0,0.8)] overflow-hidden mb-6 md:mb-0">
                        <img
                            src={getImageForBlog(blog.blogid)}
                            alt={blog.tittle}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right: related blog cards */}
                    <div className="md:w-[45%]">
                        <Bloglist
                            count={1}
                            excludeBlogId={blog.blogid}
                            compact
                            className="md:hidden"
                        />
                        <Bloglist
                            count={3}
                            excludeBlogId={blog.blogid}
                            compact
                            className="hidden md:block"
                        />
                    </div>
                </div>

                {/* 3. Bold intro — same width as image on md */}
                <p className="text-base font-semibold leading-relaxed text-gray-800 mb-8 md:w-[55%]">
                    {introPart}
                </p>

                {/* 5. Remaining blog content — full width */}
                <p className="text-base leading-relaxed text-gray-700 whitespace-pre-line">
                    {restPart}
                </p>

            </div>
        </>
    )
}