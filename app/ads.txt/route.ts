import { ADSENSE_CLIENT } from '@/lib/site'

export const dynamic = 'force-static'

// Serves /ads.txt. Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX at build time.
export function GET() {
  const pub = ADSENSE_CLIENT.replace(/^ca-/, '')
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : '# Set NEXT_PUBLIC_ADSENSE_CLIENT to generate the Google AdSense entry.\n'
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
