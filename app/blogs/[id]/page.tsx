import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from '@/components/Markdown'
import BlogCard from '@/components/BlogCard'
import JsonLd from '@/components/JsonLd'
import Shuffle from '@/components/Shuffle'
import { blogs, blogImage, blogImagePath, formatDate, getBlog, readingTime, relatedBlogs } from '@/data/blogs'
import { SITE_NAME, absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ id: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return blogs.map((blog) => ({ id: blog.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlog((await params).id)
  if (!blog) return {}
  const url = `/blogs/${blog.slug}/`
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: blog.title,
      description: blog.description,
      url,
      publishedTime: blog.date,
      section: blog.category,
      images: [{ url: blogImage(blog), width: 1200, height: 675, alt: blog.title }],
    },
    twitter: { card: 'summary_large_image', title: blog.title, description: blog.description },
  }
}

/** Pull "### Question?" + answer pairs from the FAQ section for FAQPage schema. */
function extractFaq(content: string) {
  const faq = content.split(/^## Frequently Asked Questions\s*$/m)[1]
  if (!faq) return []
  const section = faq.split(/^## /m)[0]
  return [...section.matchAll(/^### (.+)\n+([\s\S]+?)(?=\n### |\s*$)/gm)].map((m) => ({
    '@type': 'Question',
    name: m[1].trim(),
    acceptedAnswer: { '@type': 'Answer', text: m[2].replace(/\*\*|\[|\]\([^)]*\)/g, '').trim() },
  }))
}

export default async function BlogDetail({ params }: Props) {
  const blog = getBlog((await params).id)
  if (!blog) notFound()

  const url = absoluteUrl(`/blogs/${blog.slug}/`)
  const faq = extractFaq(blog.content)
  const related = relatedBlogs(blog, 6)

  return (
    <article className="max-w-[1100px] mx-auto px-6 py-6">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.description,
          image: absoluteUrl(blogImagePath(blog)),
          datePublished: blog.date,
          dateModified: blog.date,
          articleSection: blog.category,
          wordCount: blog.content.split(/\s+/).length,
          author: { '@type': 'Organization', name: `${SITE_NAME} Editorial Team`, url: absoluteUrl('/about/') },
          publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: absoluteUrl('/images/og-image.png') } },
          mainEntityOfPage: url,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Blogs', item: absoluteUrl('/blogs/') },
            { '@type': 'ListItem', position: 3, name: blog.title, item: url },
          ],
        }}
      />
      {faq.length > 0 && <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }} />}

      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/blogs/" className="hover:underline">Blogs</Link> / <span className="text-gray-700">{blog.category}</span>
      </nav>

      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{blog.title}</h1>
        <p className="text-sm text-gray-500 mt-3">
          By {SITE_NAME} Editorial Team · <time dateTime={blog.date}>{formatDate(blog.date)}</time> · {readingTime(blog.content)} min read
        </p>
      </header>

      <div className="lg:flex lg:gap-12 mt-6">
        <div className="lg:w-[68%] min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogImage(blog)}
            alt={blog.title}
            width={1200}
            height={675}
            fetchPriority="high"
            className="w-full aspect-[16/9] object-cover rounded-lg shadow-[0px_4px_17px_-5px_rgba(0,0,0,0.6)] mb-8"
          />
          <Markdown content={blog.content} />
        </div>

        <aside className="lg:w-[32%] mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-6">
            <h2 className="text-lg font-bold mb-4">Related Articles</h2>
            <div className="flex flex-col gap-5">
              <Shuffle limit={3}>{related.map((b) => <BlogCard key={b.slug} blog={b} compact />)}</Shuffle>
            </div>
            <Link href="/blogs/" className="inline-block mt-6 bg-[#A8D400] hover:bg-[#96c000] px-6 py-2 rounded-full font-medium transition-colors">
              All articles
            </Link>
          </div>
        </aside>
      </div>
    </article>
  )
}
