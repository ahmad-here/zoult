import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import letterz from '@/components/assets/letterz.png'
import ink from '@/components/assets/ink.png'
import { blogs, categories } from '@/data/blogs'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Zoult: who we are, what we write about, and how we research and update our guides on blogging, SEO, AI, web development and online careers.',
  alternates: { canonical: '/about/' },
}

export default function AboutUs() {
  return (
    <>
      <div className="bg-black px-6 py-16 relative overflow-hidden">
        <div className="relative flex items-center justify-center z-10">
          <Image src={letterz} alt="" width={92} height={88} className="w-16 md:w-23 h-auto" />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-400 tracking-wider">OULT</h1>
        </div>
        <Image src={ink} alt="" width={248} height={248} className="absolute top-10 left-1/2 -translate-x-[140%] w-48 md:w-62 h-auto object-cover z-0 opacity-80" aria-hidden="true" />
      </div>
      <div className="bg-[#B4E300] py-3 border-b-8 border-gray-700">
        <p className="text-center text-black font-bold text-sm tracking-wide">ABOUT US</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 prose-zoult">
        <h2>Who we are</h2>
        <p>
          {SITE_NAME} is an independent blog run by a small team of writers and developers who believe practical knowledge should be
          simple, useful and free. We publish beginner-friendly guides that help readers start blogs, understand SEO, use AI tools
          responsibly, stay safe online, learn web development and build careers or side income on the internet.
        </p>
        <h2>What we write about</h2>
        <ul>
          {categories.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <h2>Our editorial standards</h2>
        <p>
          Every article is written from hands-on experience and research, reviewed for accuracy, and updated when tools or best
          practices change. We avoid hype and unrealistic promises: if something takes time and effort, we say so. When we
          mention third-party products or websites we do so because we think they are genuinely useful to readers.
        </p>
        <h2>Meet the team</h2>
        <p><strong>Muhammad Ahmad</strong> – Founder &amp; Developer. Builds and maintains the site and writes about web development and SEO.</p>
        <h2>Our progress</h2>
        <p><strong>{blogs.length}</strong> in-depth articles across <strong>{categories.length}</strong> topics, and growing every month.</p>
        <p>
          Have a question, correction or topic suggestion? <Link href="/contact/">Contact us</Link> – we read every message.
        </p>
      </div>
    </>
  )
}
