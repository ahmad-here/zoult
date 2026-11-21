import type { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { blogs, categories } from '@/data/blogs'
import Shuffle from '@/components/Shuffle'

export const metadata: Metadata = {
  title: 'All Articles – Blogging, SEO, AI & Web Development Guides',
  description:
    'Browse every Zoult guide: blogging, SEO, Google AdSense, AI tools, online security, web development, freelancing and productivity tips for beginners.',
  alternates: { canonical: '/blogs/' },
}

export default function Blogs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-3xl md:text-4xl font-bold">All Articles</h1>
      <p className="text-gray-600 mt-3 max-w-2xl">
        {blogs.length} in-depth guides across {categories.length} topics, written to help you learn practical skills and grow online.
      </p>
      <div className="flex flex-col">
      <Shuffle>
      {categories.map((cat) => (
        <section key={cat} className="mt-12" aria-labelledby={`cat-${cat}`}>
          <h2 id={`cat-${cat}`} className="text-2xl font-bold mb-6 border-l-4 border-[#B4E300] pl-3">{cat}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Shuffle itemClassName="flex *:flex-1 *:min-w-0">{blogs.filter((b) => b.category === cat).map((b) => <BlogCard key={b.slug} blog={b} />)}</Shuffle>
          </div>
        </section>
      ))}
      </Shuffle>
      </div>
    </div>
  )
}
