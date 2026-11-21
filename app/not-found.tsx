import Link from 'next/link'

export const metadata = { title: 'Page Not Found', robots: { index: false } }

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <p className="text-6xl font-bold text-[#B4E300]">404</p>
      <h1 className="text-3xl font-bold mt-4">Page not found</h1>
      <p className="text-gray-600 mt-3">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/blogs/" className="mt-8 bg-[#A8D400] hover:bg-[#96c000] px-6 py-3 rounded-full font-medium">Browse articles</Link>
    </div>
  )
}
