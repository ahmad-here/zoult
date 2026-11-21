'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import letterz from '../assets/letterz.png'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blogs/', label: 'Blogs' },
  { href: '/websites/', label: 'Useful Websites' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const close = () => setIsMenuOpen(false)

  return (
    <header>
      <nav className="w-full h-16 flex items-center justify-between px-6 md:px-9 py-10 bg-transparent relative z-50 font-poppins" aria-label="Main">
        <Link href="/" className="text-3xl font-bold text-gray-800 flex items-center" aria-label="Zoult home">
          <Image src={letterz} alt="" width={40} height={40} className="w-10 h-auto" priority />
          OULT
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium text-gray-800">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-[#6f8c00] transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex lg:hidden flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed lg:hidden top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out font-poppins ${isMenuOpen ? 'translate-x-0' : 'translate-x-full invisible'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="text-2xl font-bold text-gray-800 flex items-center">
            <Image src={letterz} alt="" width={32} height={32} className="w-8 h-auto mr-1" />
            OULT
          </span>
          <button onClick={close} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-6 p-6">
          {links.map((l) => (
            <li key={l.href} className="border-b border-gray-100 pb-3">
              <Link href={l.href} onClick={close} className="block text-xl font-medium text-gray-800">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {isMenuOpen && (
        <div className="fixed lg:hidden inset-0 z-40 bg-black/30" onClick={close} aria-hidden="true"></div>
      )}
    </header>
  )
}
