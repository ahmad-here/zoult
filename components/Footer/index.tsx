import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import { categories } from '@/data/blogs'
import Socialmedia from '../Socialmedia'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t-4 border-[#B4E300] mt-16 font-poppins">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-bold text-white">{SITE_NAME.toUpperCase()}</p>
          <p className="mt-3 text-sm text-gray-400">{SITE_TAGLINE}.</p>
          <Socialmedia className="mt-4 justify-start" />
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blogs/" className="hover:text-[#B4E300]">All Articles</Link></li>
            <li><Link href="/websites/" className="hover:text-[#B4E300]">Useful Websites</Link></li>
            <li><Link href="/about/" className="hover:text-[#B4E300]">About Us</Link></li>
            <li><Link href="/contact/" className="hover:text-[#B4E300]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Topics</p>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy/" className="hover:text-[#B4E300]">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-[#B4E300]">Terms &amp; Conditions</Link></li>
            <li><Link href="/disclaimer/" className="hover:text-[#B4E300]">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </p>
    </footer>
  )
}
