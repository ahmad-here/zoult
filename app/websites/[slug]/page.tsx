import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from '@/components/Markdown'
import SiteCard from '@/components/SiteCard'
import JsonLd from '@/components/JsonLd'
import Shuffle from '@/components/Shuffle'
import { TAG_LABELS, getSite, relatedSites, siteHost, siteImage, siteImagePath, sites } from '@/data/websites'
import { SITE_NAME, absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return sites.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = getSite((await params).slug)
  if (!site) return {}
  const url = `/websites/${site.slug}/`
  const title = `${site.name} – ${site.tagline}`
  return {
    title: title.length > 62 ? `${site.name} – What It Is & How to Use It` : title,
    description: site.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${site.name} – ${site.tagline}`,
      description: site.description,
      url,
      images: [{ url: siteImage(site), width: 1200, height: 630, alt: `${site.name} website preview` }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function SitePage({ params }: Props) {
  const site = getSite((await params).slug)
  if (!site) notFound()
  const url = absoluteUrl(`/websites/${site.slug}/`)

  return (
    <article className="max-w-[1100px] mx-auto px-6 py-6">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${site.name} – ${site.tagline}`,
          description: site.description,
          url,
          primaryImageOfPage: absoluteUrl(siteImagePath(site)),
          about: { '@type': 'WebSite', name: site.name, url: site.link },
          publisher: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Useful Websites', item: absoluteUrl('/websites/') },
            { '@type': 'ListItem', position: 3, name: site.name, item: url },
          ],
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/websites/" className="hover:underline">Useful Websites</Link> / <span className="text-gray-700">{site.name}</span>
      </nav>

      <div className="md:flex md:gap-10 md:items-center">
        <div className="md:w-[55%] overflow-hidden rounded-xl shadow-[0px_4px_17px_-5px_rgba(0,0,0,0.6)] bg-gray-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={siteImage(site)} alt={`${site.name} website preview`} width={1200} height={630} fetchPriority="high" className="w-full aspect-[1200/630] object-cover" />
        </div>
        <header className="mt-6 md:mt-0 md:flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {site.tags.map((t) => <span key={t} className="px-2 py-0.5 text-xs bg-lime-100 text-lime-800 rounded-full font-medium">{TAG_LABELS[t] || t}</span>)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{site.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{site.tagline}</p>
          <a
            href={site.link}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center px-7 py-3.5 bg-[#A8D400] hover:bg-[#96BC00] text-gray-900 font-semibold rounded-full transition-colors shadow-md"
          >
            Go to {siteHost(site)}
            <span className="sr-only"> (opens in a new tab)</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </header>
      </div>

      <div className="max-w-3xl mt-10">
        <Markdown content={site.content} />
        <div className="mt-10 p-6 rounded-xl bg-lime-50 border border-lime-200">
          <p className="font-semibold text-gray-900">Ready to try {site.name}?</p>
          <a href={site.link} target="_blank" rel="noopener" className="mt-2 inline-block text-lime-800 font-medium underline underline-offset-4">
            Open {site.name} at {siteHost(site)} →
          </a>
          <p className="text-xs text-gray-500 mt-3">{SITE_NAME} is not affiliated with {site.name}. Preview image © {site.name}.</p>
        </div>
      </div>

      <section className="mt-16" aria-labelledby="more-sites">
        <h2 id="more-sites" className="text-2xl font-bold mb-6">More websites you might like</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Shuffle limit={3} itemClassName="flex *:flex-1 *:min-w-0">{relatedSites(site).map((s) => <SiteCard key={s.slug} site={s} />)}</Shuffle>
        </div>
      </section>
    </article>
  )
}
