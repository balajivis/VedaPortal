import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://vedas.pro'),
  title: {
    default: 'Veda Portal - Explore India\'s Ancient Knowledge Traditions',
    template: '%s | Veda Portal',
  },
  description: 'Discover the 18 Mahavidyas - India\'s comprehensive system of Vedic knowledge. Explore the Four Vedas, Six Vedangas, Four Upavedas, and philosophical Darshanas preserved for over 5,000 years.',
  keywords: ['Vedas', 'Mahavidyas', 'Vedic knowledge', 'Sanskrit', 'Indian philosophy', 'Rigveda', 'Samaveda', 'Yajurveda', 'Atharvaveda', 'Ayurveda', 'Yoga', 'Darshana', 'Hindu scriptures', 'Ancient wisdom', 'Vedangas', 'Upanishads'],
  authors: [{ name: 'Veda Portal' }],
  creator: 'Veda Portal',
  publisher: 'Veda Portal',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vedas.pro',
    siteName: 'Veda Portal',
    title: 'Veda Portal - The 18 Mahavidyas',
    description: 'Explore India\'s Great Knowledge Traditions - Four Vedas, Six Vedangas, Four Upavedas, and Four Darshanas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veda Portal - The 18 Mahavidyas',
    description: 'Explore India\'s Great Knowledge Traditions preserved for over 5,000 years.',
  },
  verification: {
    google: '', // Add Google Search Console verification
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://vedas.pro" />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  )
}
