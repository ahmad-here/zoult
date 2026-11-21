import Link from 'next/link'
import { type Site, TAG_LABELS, siteHost, siteImage } from '@/data/websites'

export default function SiteCard({ site, featured = false }: { site: Site; featured?: boolean }) {
  const detail = `/websites/${site.slug}/`
  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow flex flex-col ${
        featured ? 'border-[#A8D400] ring-2 ring-[#B4E300]/40 md:flex-row' : 'border-gray-100 hover:border-[#A8D400]'
      }`}
    >
      <Link href={detail} className={`relative block overflow-hidden bg-gray-900 aspect-[1200/630] ${featured ? 'md:w-1/2 md:flex-shrink-0' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteImage(site)}
          alt={`${site.name} website preview`}
          width={1200}
          height={630}
          loading={featured ? 'eager' : 'lazy'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <span className="absolute top-3 left-3 bg-[#B4E300] text-black text-xs font-bold px-3 py-1 rounded-full">★ FEATURED</span>
        )}
      </Link>
      <div className={`p-5 flex flex-col flex-1 ${featured ? 'md:p-8 md:justify-center' : ''}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {site.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs bg-lime-100 text-lime-800 rounded-full font-medium">{TAG_LABELS[t] || t}</span>
          ))}
        </div>
        <h2 className={`font-bold text-gray-900 leading-snug ${featured ? 'text-3xl' : 'text-xl'}`}>
          <Link href={detail} className="hover:text-lime-700 transition-colors">{site.name}</Link>
        </h2>
        <p className="text-xs text-gray-500 mt-1">{siteHost(site)}</p>
        <p className={`text-gray-600 mt-3 flex-1 ${featured ? 'text-base' : 'text-sm line-clamp-3'}`}>{site.description}</p>
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={site.link}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center px-5 py-2.5 bg-[#A8D400] hover:bg-[#96BC00] text-gray-900 font-semibold rounded-full transition-colors text-sm"
          >
            Visit site
            <span className="sr-only"> {site.name} (opens in a new tab)</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <Link href={detail} className="inline-flex items-center px-5 py-2.5 border border-gray-300 hover:border-gray-900 rounded-full text-sm font-medium transition-colors">
            Learn more<span className="sr-only"> about {site.name}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
