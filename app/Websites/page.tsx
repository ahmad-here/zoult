'use client'
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { websites } from "@/data/Websites"

export default function Websites() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [shuffledWebsites, setShuffledWebsites] = useState<typeof websites>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Shuffle websites only on the client side after component mounts
  useEffect(() => {
    setShuffledWebsites([...websites].sort(() => Math.random() - 0.5))
    setIsLoading(false)
  }, [])

  // Filter websites based on active tag
  const filteredWebsites = activeFilter === 'all' 
    ? shuffledWebsites 
    : shuffledWebsites.filter(website => website.tags.includes(activeFilter))

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    // Re-shuffle when changing filters
    setShuffledWebsites([...websites].sort(() => Math.random() - 0.5))
  }

  // Prevent rendering until client-side hydration is complete
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Websites
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of interesting, fun, and unique websites from around the internet
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Websites
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of interesting, fun, and unique websites from around the internet
          </p>
        </div>
        <div className="flex justify-center gap-6 mb-10">
          <button 
            onClick={() => handleFilterClick('all')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeFilter === 'all' 
                ? 'bg-[#A8D400] text-gray-900 font-semibold' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => handleFilterClick('ai')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeFilter === 'ai' 
                ? 'bg-[#A8D400] text-gray-900 font-semibold' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            AI
          </button>
          <button 
            onClick={() => handleFilterClick('fun')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeFilter === 'fun' 
                ? 'bg-[#A8D400] text-gray-900 font-semibold' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Fun
          </button>
          <button 
            onClick={() => handleFilterClick('tools')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeFilter === 'tools' 
                ? 'bg-[#A8D400] text-gray-900 font-semibold' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tools
          </button>
        </div>

        {/* Websites Grid */}
        <div className="max-w-5xl mx-auto grid gap-6 md:gap-8">
          {filteredWebsites.map((website) => (
            <div 
              key={website.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100 hover:border-[#A8D400] group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#A8D400] transition-colors">
                    {website.name}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {website.description}
                  </p>
                </div>

                {/* Call to Action Button */}
                <div className="md:ml-6 flex-shrink-0">
                  <a
                    href={website.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#A8D400] hover:bg-[#96BC00] text-gray-900 font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap group"
                  >
                    <span>Click Here</span>
                    <svg 
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>All external links open in a new tab for your convenience</p>
        </div>
      </div>
    </div>
  )
}