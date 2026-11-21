'use client'
import { useState } from 'react'

// Static hosting has no backend, so the form opens the visitor's email app with the message pre-filled.
export default function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !from.trim() || !message.trim()) {
      setError('Please fill in all the fields.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  const field = 'w-full px-0 py-2 border-b-2 border-gray-500 focus:border-[#6f8c00] outline-none placeholder-gray-500 text-gray-800 bg-transparent'

  return (
    <form className="space-y-8 w-full max-w-sm mt-10" onSubmit={handleSubmit} noValidate>
      <label className="block">
        <span className="sr-only">Name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Email</span>
        <input type="email" name="email" autoComplete="email" placeholder="Your email" value={from} onChange={(e) => setFrom(e.target.value)} className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea name="message" placeholder="Message" rows={7} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-50 shadow-[-10px_10px_22px_-18px_rgba(0,0,0,0.8)] resize-none outline-none placeholder-gray-500 text-gray-800 focus:bg-gray-100" />
      </label>
      {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}
      <button type="submit" className="relative w-40 h-16 block mx-auto cursor-pointer">
        <span className="absolute top-4 left-4 w-full h-full border-4 border-black" aria-hidden="true"></span>
        <span className="relative z-10 w-full h-full bg-[#B4E300] flex justify-center items-center font-semibold text-lg hover:bg-[#a5d200] transition-colors">Send</span>
      </button>
    </form>
  )
}
