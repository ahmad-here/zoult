import type { Metadata } from 'next'
import WebsiteList from './WebsiteList'
import SiteCard from '@/components/SiteCard'
import JsonLd from '@/components/JsonLd'
import { featuredSites, otherSites, sites } from '@/data/websites'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: `${sites.length}+ Useful & Fun Websites Worth Bookmarking`,
  description:
    'Hand-picked useful, fun and AI websites: free browser games, design and developer tools, AI apps and relaxing corners of the internet, each with a short guide.',
  alternates: { canonical: '/websites/' },
}

export default function Websites() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Useful and fun websites',
          itemListElement: sites.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/websites/${s.slug}/`),
            name: s.name,
          })),
        }}
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Discover Amazing Websites</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sites.length} hand-picked websites that are genuinely useful, fun or clever. Tap a card to learn what a site does, or jump straight to it.
          </p>
        </div>

        {featuredSites.map((s) => (
          <div key={s.slug} className="mb-12">
            <SiteCard site={s} featured />
          </div>
        ))}

        <WebsiteList cards={otherSites.map((s) => ({ key: s.slug, tags: s.tags, node: <SiteCard key={s.slug} site={s} /> }))} />

        <p className="text-center mt-16 text-gray-500 text-sm">
          Preview images belong to their respective websites. Zoult is not affiliated with the sites listed; external links open in a new tab.
        </p>
      </div>
    </div>
  )
}
