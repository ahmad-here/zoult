'use client'
import { useState } from 'react'
import Navbar from "../../components/Navbar"
import zink from "../../components/assets/zink.png"
export default function ContactUs() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [toast, setToast] = useState({ show: false, message: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (name.trim() && email.trim() && message.trim()) {
            setToast({ show: true, message: 'Message has been sent. Thankyou!' })
            // Clear form
            setName('')
            setEmail('')
            setMessage('')
        } else {
            setToast({ show: true, message: 'Please fill all the fields' })
        }

        // Hide toast after 2 seconds
        setTimeout(() => {
            setToast({ show: false, message: '' })
        }, 2000)
    }

    return(
        <>
        <Navbar />
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="hidden lg:flex lg:max-h-screen lg:bg-black lg:h-[calc(100vh)] lg:items-center lg:justify-center lg:w-[50%]">
                <img src={zink.src} alt="zoult-logo" />
            </div>
        <div className="bg-white flex flex-col items-center py-10 px-4 font-[family-name:var(--font-poppins)] lg:w-[50%]">
            <div className="w-full flex flex-col items-center">
                {/* Contact Us Heading */}
                <h1 className="text-4xl font-bold mb-8">
                    Contact <span className="text-[#B4E300]">Us</span>
                </h1>

                {/* Contact Form */}
                <form className="space-y-10 w-70 mt-8" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-0 py-2 border-b-2 border-gray-500 focus:border-gray-500 outline-none placeholder-gray-500 placeholder:text-lg placeholder:font-medium text-gray-700"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <input 
                            type="email" 
                            placeholder="@Gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-0 py-2 border-b-2 border-gray-500 focus:border-gray-500 outline-none placeholder-gray-400 text-gray-700"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div className="">
                        <textarea 
                            placeholder="message" 
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-5 w-full h-60 px-4 py-3 rounded-lg bg-gray-50 shadow-[-10px_10px_22px_-18px_rgba(0,_0,_0,_0.8)] resize-none outline-none placeholder-gray-500 placeholder-gray-500 placeholder:text-lg placeholder:font-medium text-gray-700 focus:bg-gray-100"
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="flex justify-center mt-10 cursor-pointer">
                    <div className="relative w-40 h-16">

                        {/* Black border square (back layer) */}
                        <div className="absolute top-4 left-4 w-full h-full border-4 border-black z-11"></div>

                        {/* Green button (front layer) */}
                        <div  className="relative z-10 w-full h-full bg-[#B4E300] flex justify-center items-center pt-2 pr-2 font-semibold text-lg hover:bg-[#a5d200] transition-colors">Submit
                        </div>

                    </div>
                </button>
                </form>
            </div>
        </div>
        </div>

        {/* Toast Notification */}
        {toast.show && (
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
                {toast.message}
            </div>
        )}
        </>
    )
}