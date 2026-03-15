'use client'

import { useState } from 'react'
import letterz from '../assets/letterz.png'
import { useRouter } from 'next/navigation'
export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsServicesOpen(false) // Close services dropdown when menu closes
  }

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between px-9 py-10 bg-transparent relative z-50 font-poppins">
        <div className="text-3xl font-bold text-gray-800 flex items-center">
          <img src={letterz.src} alt="LetterZ" className='w-10 h-auto' />
          OULT
        </div>

        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium text-gray-800">
          <li className="cursor-pointer" onClick={() => router.push('/')}>Home</li>
          <li className="cursor-pointer" onClick={() => router.push('/blogs')}>Blogs</li>
          <li
            className="relative"
            onMouseEnter={() => setIsDesktopServicesOpen(true)}
            onMouseLeave={() => setIsDesktopServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 cursor-pointer"
              type="button"
              aria-haspopup="true"
              aria-expanded={isDesktopServicesOpen}
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDesktopServicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`absolute top-full left-0 mt-3 w-56 bg-white shadow-xl rounded-xl py-3 transition-all duration-200 ${isDesktopServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <button
                className="w-full text-left px-4 py-2 text-gray-700"
                onClick={() => router.push('/Jobs')}
              >
                Jobs
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700"
                onClick={() => router.push('/Movies')}
              >
                Movies
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700"
                onClick={() => router.push('/Websites')}
              >
                Useful Websites
              </button>
            </div>
          </li>
          <li className="cursor-pointer" onClick={() => router.push('/ContactUs')}>Contact Us</li>
          <li className="cursor-pointer" onClick={() => router.push('/AboutUs')}>About</li>
        </ul>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex lg:hidden flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed lg:hidden top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out font-poppins ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="text-2xl font-bold text-gray-800 flex items-center">
            <img src={letterz.src} alt="LetterZ" className='w-8 h-auto mr-1' />
            OULT
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <ul className="flex flex-col space-y-6">
            <li
            className="text-xl font-medium text-gray-800 transition-colors duration-200 border-b border-gray-100 pb-3 block cursor-pointer"
                onClick={
                  ()=>{
                    router.push('/');
                    toggleMenu();
                  }
                }
            >
          
                Home
          
            </li>
            
            <li
            className="text-xl font-medium text-gray-800 transition-colors duration-200 border-b border-gray-100 pb-3 block cursor-pointer"
                onClick={()=>{
                    router.push('/blogs');
                    toggleMenu();
                }}>
              
                Blogs
             
            </li>
            <li>
              <div
                className="text-xl font-medium text-gray-800 transition-colors duration-200 border-b border-gray-100 pb-3 block cursor-pointer flex items-center justify-between"
                onClick={toggleServices}
              >
                <span>Services</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Services Dropdown */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="mt-2 ml-4 space-y-3">
                  <li>
                    <button
                      className="text-lg font-normal text-gray-600 transition-colors duration-200 py-2 w-full text-left cursor-pointer"
                      onClick={() => {
                        // Add navigation logic for Jobs
                        router.push('/Jobs');
                        toggleMenu();
                      }}
                    >
                      Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-lg font-normal text-gray-600 transition-colors duration-200 py-2 w-full text-left cursor-pointer"
                      onClick={() => {
                        // Add navigation logic for Movies
                        router.push('/Movies');
                        toggleMenu();
                      }}
                    >
                      Movies
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-lg font-normal text-gray-600 transition-colors duration-200 py-2 w-full text-left cursor-pointer"
                      onClick={() => {
                        router.push('/Websites');
                        toggleMenu();
                      }}
                    >
                      Useful Websites
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className="text-xl font-medium text-gray-800 transition-colors duration-200 border-b border-gray-100 pb-3 block cursor-pointer"
              onClick={
                () => {
                  router.push('/ContactUs');
                  toggleMenu();
                }
              }
            >
              Contact Us
            </li>
            <li
              className="text-xl font-medium text-gray-800 transition-colors duration-200 border-b border-gray-100 pb-3 block cursor-pointer"
              onClick={() => {
                router.push('/AboutUs');
                toggleMenu();
              }
              }
            >

              About

            </li>
          </ul>
        </div>
      </div>

      {/* Overlay Background */}
      {isMenuOpen && (
        <div
          className="fixed lg:hidden inset-0 z-40"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          onClick={toggleMenu}
        ></div>
      )}
    </>
  )
}