'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import circles from '../assets/circles.png'
import search from '../assets/search.svg'
import science from '../assets/blog3.jpg'
import travel from '../assets/blog2.jpg'
import blogs from '../assets/blog1.jpg'
export default function Herosection() {
    const router = useRouter()

    

    // Sample data for the sliding grid
    const gridItems = [
        {
            id: 1,
            title: "Architecture",
            subtitle: "The interior of the apartments.",
            image: science.src,
            category: "Interior Design"
        },
        {
            id: 2,
            title: "Modern Living",
            subtitle: "Contemporary open spaces.",
            image: travel.src,
            category: "Architecture"
        },
        {
            id: 3,
            title: "Luxury Design",
            subtitle: "Premium residential spaces.",
            image: blogs.src,
            category: "Luxury"
        }
    ]

    return (
        <section className="bg-white py-8 pr-0 font-poppins relative overflow-hidden">
            {/* Background Circles */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <img 
                    src={circles.src} 
                    alt="Background circles" 
                    className="w-[calc(100%+40px)] h-[calc(100%+40px)] object-cover"
                />
            </div>

            <div className="relative z-10 md:pt-55">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 leading-17 pl-8 md:absolute md:top-1 md:left-1/6 ">Comfortable <br /> Zoning in one open <br /> space</h1>

                {/* Sliding Grid */}
                <div className="relative pl-4 md:pl-0 md:ml-auto md:w-[65%]">
                    {/* Scrollable Grid Container */}
                    <div
                        className="flex gap-6 overflow-x-scroll scrollbar-hide pb-4 pl-4 md:pr-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {gridItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex-shrink-0 w-80 group cursor-pointer"
                            >
                                {/* Image Container with Shadow */}
                                <div className="relative h-48 overflow-hidden shadow-[-15px_10px_22px_-18px_rgba(0,_0,_0,_0.8)] hover:shadow-xl transition-all duration-300 rounded-lg mb-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay on hover */}
                                    <div 
                                        className="absolute inset-0 group-hover:opacity-20 opacity-0 transition-all duration-300"
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                                    ></div>
                                </div>

                                {/* Content - No Container */}
                                <div className="">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#0B5000] transition-colors duration-200">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        {item.subtitle}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0B5000] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Centered Button Below Slider */}
                <div className="flex justify-center mt-8 ">
                    <div className="relative w-16 h-16" onClick={()=>{
                            router.push('/blogs');
                        }}>

                        {/* Black border square (back layer) */}
                        <div className="absolute bottom-4 left-4 w-full h-full border-4 border-black z-11"></div>

                        {/* Green button (front layer) */}
                        <button className="relative z-10 w-full h-full bg-lime-400 flex justify-end pb-4 pr-2" >
                            <img src={search.src} alt="Search" className='w-8' />
                        </button>

                    </div>
                </div>

            </div>
        </section>
    )
}   