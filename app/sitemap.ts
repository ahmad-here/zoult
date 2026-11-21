import type { MetadataRoute } from 'next'
import { blogs } from '@/data/blogs'
import { sites } from '@/data/websites'
import { absoluteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = blogs[0]?.date
  const pages = ['/', '/blogs/', '/websites/', '/about/', '/contact/', '/privacy-policy/', '/terms/', '/disclaimer/']
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p),
      lastModified: latest,
      changeFrequency: (p === '/' || p === '/blogs/' ? 'weekly' : 'yearly') as 'weekly' | 'yearly',
      priority: p === '/' ? 1 : p === '/blogs/' ? 0.9 : 0.4,
    })),
    ...blogs.map((b) => ({
      url: absoluteUrl(`/blogs/${b.slug}/`),
      lastModified: b.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...sites.map((s) => ({
      url: absoluteUrl(`/websites/${s.slug}/`),
      lastModified: latest,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
