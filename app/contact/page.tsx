import type { Metadata } from 'next'
import Image from 'next/image'
import zink from '@/components/assets/zink.png'
import ContactForm from './ContactForm'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Zoult team for questions, feedback, corrections, topic suggestions or partnership enquiries.',
  alternates: { canonical: '/contact/' },
}

export default function ContactUs() {
  return (
    <div className="lg:flex lg:items-stretch">
      <div className="hidden lg:flex bg-black min-h-[70vh] items-center justify-center lg:w-1/2">
        <Image src={zink} alt="Zoult logo" className="max-w-[80%] h-auto" />
      </div>
      <div className="flex flex-col items-center py-10 px-6 lg:w-1/2">
        <h1 className="text-4xl font-bold mb-4">Contact <span className="text-[#6f8c00]">Us</span></h1>
        <p className="text-gray-600 text-center max-w-md">
          Questions, feedback, corrections or topic ideas? Email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">{CONTACT_EMAIL}</a> or use the form below. We usually reply within 2–3 business days.
        </p>
        <ContactForm email={CONTACT_EMAIL} />
      </div>
    </div>
  )
}
