import { Metadata } from 'next'
import Image from 'next/image'
import { MahavidyasDiagram } from '@/components/MahavidyasDiagram'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Veda Portal - Explore the 18 Mahavidyas | India\'s Ancient Knowledge Traditions',
  description: 'Discover the 18 Mahavidyas (अष्टादश महाविद्या) - India\'s comprehensive system of Vedic knowledge including the Four Vedas, Six Vedangas, Four Upavedas, and philosophical Darshanas. Explore 5,000+ years of preserved wisdom.',
  keywords: ['Vedas', 'Mahavidyas', 'Vedic knowledge', 'Sanskrit', 'Indian philosophy', 'Rigveda', 'Ayurveda', 'Yoga', 'Darshana', 'Hindu scriptures', 'Ancient wisdom', 'Vedangas'],
  openGraph: {
    title: 'Veda Portal - The 18 Mahavidyas',
    description: 'Explore India\'s Great Knowledge Traditions - Four Vedas, Six Vedangas, Four Upavedas, and Four Darshanas.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veda Portal - The 18 Mahavidyas',
    description: 'Explore India\'s Great Knowledge Traditions preserved for over 5,000 years.',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/veda-logo-light.png"
                alt="Veda Portal"
                width={712}
                height={395}
                className="h-16 w-auto"
              />
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/library" className="text-zinc-400 hover:text-amber-400 transition-colors">
                Knowledge
              </Link>
              <Link href="/practices" className="text-zinc-400 hover:text-violet-400 transition-colors">
                Practices
              </Link>
              <Link href="/docs" className="text-zinc-400 hover:text-sky-400 transition-colors hidden md:block">
                Docs
              </Link>
              <form action="/search" method="GET" className="hidden md:flex items-center">
                <input
                  type="text"
                  name="q"
                  placeholder="Search texts..."
                  className="w-48 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </form>
            </nav>
          </div>
        </div>
      </header>

      {/* Quick Explainer Section */}
      <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">Ancient Wisdom, Modern Access</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            What are the <span className="text-amber-400">18 Mahavidyas</span>?
          </h1>

          <p className="text-lg text-zinc-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            The <strong className="text-amber-400">Mahavidyas</strong> (महाविद्या - &quot;Great Knowledge&quot;) represent India&apos;s
            comprehensive educational framework, preserved through oral tradition for over <strong>5,000 years</strong>.
            This integrated system covers everything from spiritual philosophy to practical sciences.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 bg-amber-950/30 border border-amber-600/30 rounded-xl">
              <div className="text-2xl font-bold text-amber-400">4</div>
              <div className="text-sm text-zinc-400">Vedas</div>
              <div className="text-xs text-zinc-500">Sacred Texts</div>
            </div>
            <div className="p-4 bg-emerald-950/30 border border-emerald-600/30 rounded-xl">
              <div className="text-2xl font-bold text-emerald-400">6</div>
              <div className="text-sm text-zinc-400">Vedangas</div>
              <div className="text-xs text-zinc-500">Auxiliary Sciences</div>
            </div>
            <div className="p-4 bg-sky-950/30 border border-sky-600/30 rounded-xl">
              <div className="text-2xl font-bold text-sky-400">4</div>
              <div className="text-sm text-zinc-400">Upavedas</div>
              <div className="text-xs text-zinc-500">Applied Sciences</div>
            </div>
            <div className="p-4 bg-purple-950/30 border border-purple-600/30 rounded-xl">
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-zinc-400">Darshanas</div>
              <div className="text-xs text-zinc-500">Philosophy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Diagram */}
      <main>
        <MahavidyasDiagram />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/veda-logo-light.png"
                alt="Veda Portal"
                width={712}
                height={395}
                className="h-12 w-auto opacity-60"
              />
            </div>
            <p className="text-zinc-400 mb-2">सर्वे भवन्तु सुखिनः — May all beings be happy</p>
            <p className="text-zinc-600 text-sm">
              Preserving and sharing India&apos;s ancient knowledge traditions
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
