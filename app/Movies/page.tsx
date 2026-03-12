'use client'
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import { movies } from "@/data/Movies"
import Image from "next/image"

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Searchbar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        placeholder="Search movies by title or category..."
      />
      
      <div className="container mx-auto px-6 pb-8">
        <h2 className="text-center text-gray-500 text-lg mb-8">Click to Download</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl md:max-w-5xl mx-auto">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex flex-col items-start gap-2">
                <span className="bg-[#B4E300] text-black text-xs font-medium px-3 py-1 rounded-full">
                  {movie.category}
                </span>
                <p className="font-medium text-gray-800">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}