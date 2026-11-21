import part1 from './sites/part1.js'
import part2 from './sites/part2.js'
import part3 from './sites/part3.js'
import part4 from './sites/part4.js'
import { asset } from '@/lib/site'

export interface Site {
  slug: string
  name: string
  link: string
  tags: string[]
  status: string
  note?: string
  tagline: string
  description: string
  content: string
}

/** Pinned to the top of the list, always. */
export const FEATURED_SLUGS = ['shadow-shift']

const all: Site[] = [...part1, ...part2, ...part3, ...part4].filter((s) => s.status === 'ok')

// De-duplicate by slug (first wins) so a site listed twice never creates two pages.
export const sites: Site[] = all.filter((s, i) => all.findIndex((o) => o.slug === s.slug) === i)

export const featuredSites = sites.filter((s) => FEATURED_SLUGS.includes(s.slug))
export const otherSites = sites.filter((s) => !FEATURED_SLUGS.includes(s.slug))

export const getSite = (slug: string) => sites.find((s) => s.slug === slug)

export const siteImagePath = (s: Pick<Site, 'slug'>) => `/images/sites/${s.slug}.webp`
export const siteImage = (s: Pick<Site, 'slug'>) => asset(siteImagePath(s))

export const siteHost = (s: Pick<Site, 'link'>) => new URL(s.link).hostname.replace(/^www\./, '')

export const relatedSites = (site: Site, count = 6) =>
  [
    ...otherSites.filter((s) => s.slug !== site.slug && s.tags.some((t) => site.tags.includes(t))),
    ...otherSites.filter((s) => s.slug !== site.slug && !s.tags.some((t) => site.tags.includes(t))),
  ].slice(0, count)

export const TAG_LABELS: Record<string, string> = { fun: 'Fun', tools: 'Tools', ai: 'AI' }
