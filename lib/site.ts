// Central site configuration. Override with environment variables at build time.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://zoult.wasmer.app'
).replace(/\/$/, '')

export const SITE_NAME = 'Zoult'
export const SITE_TAGLINE = 'Practical guides on blogging, SEO, AI, web development and online careers'
export const SITE_DESCRIPTION =
  'Zoult publishes practical, easy-to-follow guides on blogging, SEO, AI tools, web development, online security and building a career or income online.'

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@zoult.com'

// Google AdSense publisher id, e.g. "ca-pub-1234567890123456". Ads load only when set.
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || ''

// Google Search Console HTML-tag verification code (content attribute only).
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''

// Social profiles: leave empty to hide an icon.
export const SOCIAL_LINKS = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
}

/** Prefix a public/ asset path with the deployment base path. */
export const asset = (path: string) => `${BASE_PATH}${path}`

/** Absolute URL for a site path (used in sitemap, canonical, JSON-LD). */
export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '/' : path}`
