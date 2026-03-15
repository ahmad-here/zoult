'use client'
import Socialmedia from "@/components/Socialmedia"
import letterz from "@/components/assets/letterz.png"
import ink from "@/components/assets/ink.png"
import { useRouter } from "next/navigation"

export default function AboutUs() {
    const router = useRouter()
    
    return (
        <>
            <style jsx>{`
                @keyframes wiggleArrow {
                    0%, 100% {
                        transform: translateX(0) translateY(-50%);
                    }
                    50% {
                        transform: translateX(-6px) translateY(-50%);
                    }
                }
                .animate-arrow {
                    animation: wiggleArrow 1.5s ease-in-out infinite;
                }
            `}</style>
            
            {/* Header Section with Logo */}
            <div className="bg-black px-6 py-20 font-[family-name:var(--font-poppins)] relative overflow-hidden">
                <div className="relative flex items-center justify-center z-10">
                    <img src={letterz.src} alt="Logo" className="w-23 h-22" />
                    <span className="text-7xl font-bold text-gray-400 tracking-wider">OULT</span>
                </div>
                <img src={ink.src} alt="Ink" className="absolute top-20 left-60 w-62 h-62 object-cover z-0" />
            </div>

            {/* Get In Touch Section */}
            <div className="bg-[#B4E300] py-2 border-b-8 border-gray-700 relative">
                {/* Back Arrow Button */}
                <button 
                    onClick={() => router.push('/')}
                    className="animate-arrow absolute left-4 top-1/2 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label="Back to home"
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                
                <p className="text-center text-black font-bold text-sm tracking-wide mb-3 font-[family-name:var(--font-poppins)]">
                    GET IN TOUCH WITH US
                </p>
                <Socialmedia /> 
            </div>

            {/* We Are Section */}
            <div className="w-[85%] md:w-[40%] justify-self-center py-8 bg-white font-[family-name:var(--font-poppins)]">
                <div className="flex gap-4  items-center">
                    <div className="text-4xl font-bold leading-tight text-right leading-[30px]">
                        WE<br />ARE
                    </div>
                    <div className="flex-1">
                        <p className="text-xs  text-gray-700">
                             a team of dedicated writers and technology enthusiasts who believe knowledge should be simple, useful, and accessible to everyone. Through this blog, I share ideas, insights, and practical guides designed to inform, inspire curiosity, and help readers learn something valuable every day.

                        </p>
                    </div>
                </div>
            </div>

            {/* Team Member Section */}
            <div className="px-6 py-6 bg-white ">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3"></div>
                    <p className="font-medium text-lg font-[family-name:var(--font-poppins)]">Muhammad Ahmad</p>
                    <p className="text-gray-600 text-sm font-[family-name:var(--font-poppins)]">Developer</p>
                </div>
            </div>

            {/* Our Progress Section */}
            <div className="px-6 py-8 bg-white font-[family-name:var(--font-poppins)]">
                <h2 className="text-center text-3xl font-bold mb-10">
                     <span className="text-[#B4E300]">OUR </span>PROGRESS
                </h2>
                <div className="space-y-15">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#B4E300]">15+</p>
                        <p className="text-xl font-bold mt-1">Articles</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#B4E300]">100+</p>
                        <p className="text-xl font-bold mt-1">Visitors</p>
                    </div>
                </div>
            </div>

            {/* Contact Us Footer */}
            <div className="bg-black py-6 border-t-4 border-[#B4E300] font-[family-name:var(--font-poppins)] cursor-pointer" onClick={() => {router.push('./ContactUs')}}>
                <h2 className="text-center text-3xl font-bold">
                    <span className="text-white">Contact </span>
                    <span className="text-[#B4E300]">Us</span>
                </h2>
            </div>


        </>
    )
}