import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: `The terms and conditions that apply when you use the ${SITE_NAME} website and its content.`,
  alternates: { canonical: '/terms/' },
}

const content = `
Welcome to ${SITE_NAME}. By accessing or using this website you agree to these Terms and Conditions. If you do not agree, please do not use the Site.

## Use of the Site

You may read, share links to and print our content for personal, non-commercial use. You agree not to misuse the Site, attempt to disrupt it, scrape it at scale, or use it for any unlawful purpose.

## Intellectual property

Unless stated otherwise, all articles, text, graphics and logos on the Site are owned by ${SITE_NAME} and protected by copyright. You may quote short excerpts with a clear link back to the original article. Republishing full articles without written permission is not allowed.

## Accuracy of information

Our content is provided for general informational and educational purposes only. We work hard to keep it accurate and up to date, but we make no warranties about completeness, reliability or suitability for any purpose. See our [Disclaimer](/disclaimer) for details.

## Third-party links and advertising

The Site contains links to third-party websites and displays advertising served by third parties such as Google AdSense. We do not control and are not responsible for their content, products or practices.

## Limitation of liability

To the fullest extent permitted by law, ${SITE_NAME} will not be liable for any loss or damage arising from your use of, or reliance on, the Site or its content.

## Changes

We may revise these terms at any time. Continued use of the Site after changes are posted means you accept the revised terms.

## Contact

Questions about these terms? Email ${CONTACT_EMAIL}.
`

export default function Terms() {
  return <LegalPage title="Terms and Conditions" updated="November 21, 2026" content={content} />
}
