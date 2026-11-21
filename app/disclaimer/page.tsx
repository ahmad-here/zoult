import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: `Important information about the educational nature of ${SITE_NAME} content, external links, advertising and affiliate disclosures.`,
  alternates: { canonical: '/disclaimer/' },
}

const content = `
The information on ${SITE_NAME} is published in good faith for general informational and educational purposes only.

## No professional advice

Our articles about online income, careers, security and technology are not financial, legal or professional advice. Results vary from person to person, and we do not guarantee any particular outcome or earnings. Consider consulting a qualified professional before making important decisions.

## Accuracy

Tools, platforms and policies change quickly. While we review and update our guides regularly, some details may become outdated. Always check the official source for the latest information.

## External links

Our articles may link to external websites. These links are provided for convenience; we have no control over the content of those sites and do not endorse everything on them.

## Advertising and affiliate disclosure

${SITE_NAME} is supported by advertising, including Google AdSense. Some articles may in future contain affiliate links, meaning we may earn a small commission at no extra cost to you if you make a purchase. Advertising and affiliate relationships never influence our editorial recommendations, and affiliate links will always be clearly disclosed.

## Contact

If you notice an error or have concerns about any content, please email ${CONTACT_EMAIL} and we will review it promptly.
`

export default function Disclaimer() {
  return <LegalPage title="Disclaimer" updated="November 21, 2026" content={content} />
}
