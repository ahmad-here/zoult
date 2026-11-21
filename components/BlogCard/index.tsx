import Link from 'next/link'
import { type Blog, blogImage, formatDate, readingTime } from '@/data/blogs'

export default function BlogCard({ blog, compact = false }: { blog: Blog; compact?: boolean }) {
  if (compact) {
    return (
      <Link href={`/blogs/${blog.slug}/`} className="flex gap-3 items-start group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={blogImage(blog)} alt="" width={96} height={64} loading="lazy" className="w-24 h-16 flex-shrink-0 rounded object-cover" />
        <div>
          <h3 className="font-bold text-sm leading-snug group-hover:text-lime-700 transition-colors">{blog.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{formatDate(blog.date)}</p>
        </div>
      </Link>
    )
  }
  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      <Link href={`/blogs/${blog.slug}/`} className="block overflow-hidden aspect-[16/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={blogImage(blog)} alt={blog.title} width={1200} height={675} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <span className="self-start px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full font-medium">{blog.category}</span>
        <h2 className="font-bold text-lg mt-3 leading-snug">
          <Link href={`/blogs/${blog.slug}/`} className="group-hover:text-lime-700 transition-colors">{blog.title}</Link>
        </h2>
        <p className="text-sm text-gray-600 mt-2 flex-1">{blog.description}</p>
        <p className="text-xs text-gray-500 mt-4">
          <time dateTime={blog.date}>{formatDate(blog.date)}</time> · {readingTime(blog.content)} min read
        </p>
      </div>
    </article>
  )
}
