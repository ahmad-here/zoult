import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses and protects information, including cookies, Google AdSense advertising and analytics.`,
  alternates: { canonical: '/privacy-policy/' },
}

const content = `
This Privacy Policy explains how ${SITE_NAME} ("we", "us", "our") collects, uses and protects information when you visit ${SITE_URL} (the "Site"). By using the Site you agree to this policy.

## Information we collect

We do not require you to create an account. We collect only:

- **Information you send us**, such as your name, email address and message when you contact us by email.
- **Automatically collected data**, such as browser type, device, pages visited, referring site and approximate location, collected through cookies and similar technologies by our hosting, analytics and advertising partners.

## Cookies

Cookies are small text files stored on your device. We and our partners use them to keep the Site working, understand how visitors use it, and show advertising. You can block or delete cookies in your browser settings; some features may then work less well.

## Google AdSense and third-party advertising

We use Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this Site and other websites.

- Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this Site and/or other sites on the Internet.
- You may opt out of personalized advertising by visiting [Google Ads Settings](https://adssettings.google.com).
- You can also opt out of some third-party vendors' use of cookies for personalized advertising at [www.aboutads.info](https://www.aboutads.info/choices).
- Learn how Google uses data at [How Google uses information from sites that use its services](https://policies.google.com/technologies/partner-sites).

Visitors in the European Economic Area, the UK and Switzerland will be asked for consent through a certified consent management platform before personalized ads are shown.

## How we use information

- To operate, maintain and improve the Site and its content.
- To respond to your messages and requests.
- To measure traffic and display relevant advertising.
- To detect and prevent abuse or security issues.

We do not sell your personal information.

## Your rights

Depending on where you live (for example under the GDPR or CCPA/CPRA), you may have the right to access, correct, delete or restrict the use of your personal data, and to object to processing. To make a request, email us at ${CONTACT_EMAIL}.

## Data retention and security

We keep emails only as long as needed to respond and for reasonable record keeping. We use reasonable safeguards, but no method of transmission over the internet is 100% secure.

## Children's privacy

The Site is not directed to children under 13, and we do not knowingly collect personal information from them.

## External links

Our articles link to other websites. We are not responsible for the privacy practices of those sites.

## Changes to this policy

We may update this policy from time to time. Changes take effect when posted on this page with a new "Last updated" date.

## Contact

Questions about this policy? Email ${CONTACT_EMAIL}.
`

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" updated="November 21, 2026" content={content} />
}
