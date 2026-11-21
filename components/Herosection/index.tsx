import Link from 'next/link'
import Image from 'next/image'
import circles from '../assets/circles.png'
import search from '../assets/search.svg'
import { blogs, blogImage } from '@/data/blogs'
import Shuffle from '../Shuffle'

export default function Herosection() {
  const featured = blogs

  return (
    <section className="bg-white py-8 font-poppins relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Image src={circles} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="relative z-10 md:flex md:items-center md:gap-8 max-w-[1400px] mx-auto">
        <div className="px-8 md:w-[35%] md:flex-shrink-0 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Learn, build <br /> and grow <span className="text-[#6f8c00]">online</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md">
            Practical, beginner-friendly guides on blogging, SEO, AI tools, web development and online careers.
          </p>
        </div>

        <div className="relative pl-4 md:pl-0 md:flex-1 min-w-0">
          <div className="flex gap-6 overflow-x-auto pb-4 pl-4 pr-4 snap-x scrollbar-hide">
            <Shuffle limit={6} itemClassName="flex-shrink-0 snap-start">
            {featured.map((item, i) => (
              <Link key={item.slug} href={`/blogs/${item.slug}/`} className="block w-72 sm:w-80 group">
                <div className="relative h-48 overflow-hidden shadow-[-15px_10px_22px_-18px_rgba(0,0,0,0.8)] group-hover:shadow-xl transition-shadow rounded-lg mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={blogImage(item)} alt={item.title} width={640} height={360} loading={i < 2 ? 'eager' : 'lazy'} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#0B5000] transition-colors">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
              </Link>
            ))}
            </Shuffle>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center mt-10">
        <Link href="/blogs/" className="relative w-16 h-16 block" aria-label="Browse all articles">
          <span className="absolute bottom-4 left-4 w-full h-full border-4 border-black" aria-hidden="true"></span>
          <span className="relative z-10 w-full h-full bg-lime-400 flex justify-end items-end pb-4 pr-2">
            <Image src={search} alt="" width={32} height={32} className="w-8" />
          </span>
        </Link>
      </div>
    </section>
  )
}
