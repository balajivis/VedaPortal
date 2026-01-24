import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { getAllPracticeCategories, getAllPractices } from '@/content/practices'

export const metadata: Metadata = {
  title: 'Vedic Practices - Daily Rituals, Sadhanas & Life Ceremonies',
  description: 'Explore authentic Vedic practices: daily rituals like Sandhyavandanam, life ceremonies (Samskaras), spiritual Sadhanas, and wisdom traditions. Practical guides for modern practitioners.',
  keywords: ['Vedic practices', 'Sandhyavandanam', 'Samskaras', 'Hindu rituals', 'Sadhana', 'Puja', 'Yajna', 'meditation', 'pranayama'],
}

export default function PracticesPage() {
  const categories = getAllPracticeCategories()
  const allPractices = getAllPractices()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/veda-logo-light.png"
                alt="Veda Portal"
                width={712}
                height={395}
                className="h-10 w-auto"
              />
            </Link>
            <span className="text-zinc-600 text-xl">/</span>
            <h1 className="text-2xl font-bold">Practices</h1>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm">
              Practical guides for Vedic living — from daily rituals to life ceremonies
            </p>
            <nav className="flex items-center gap-4">
              <Link href="/library" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
                Knowledge
              </Link>
              <form action="/search" method="GET" className="hidden md:flex items-center">
                <input
                  type="text"
                  name="q"
                  placeholder="Search texts..."
                  className="w-40 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </form>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-4">
            From <span className="text-amber-400">Knowledge</span> to <span className="text-violet-400">Practice</span>
          </h2>
          <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
            The Vedic tradition offers not just philosophy but practical technologies for transformation.
            These practices have been refined over millennia to address every aspect of human development.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/practices/${category.id}`}
                className={`p-4 ${category.bgColor} border ${category.borderColor} rounded-xl ${category.hoverBg} transition-colors`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className={`text-2xl font-bold ${category.color}`}>{category.practices.length}</div>
                <div className="text-sm text-zinc-400">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-12">
          {categories.map(category => (
            <section key={category.id}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <Link href={`/practices/${category.id}`} className="hover:underline">
                      <h2 className={`text-2xl font-bold ${category.color}`}>{category.name}</h2>
                    </Link>
                    <p className="text-zinc-500 text-sm">{category.sanskrit}</p>
                  </div>
                </div>
                <Link
                  href={`/practices/${category.id}`}
                  className={`px-4 py-2 ${category.bgColor} border ${category.borderColor} rounded-lg text-sm ${category.color} hover:opacity-80 transition-opacity`}
                >
                  View all {category.practices.length} →
                </Link>
              </div>

              <p className="text-zinc-400 mb-6 max-w-3xl">{category.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.practices.slice(0, 3).map(practice => (
                  <Link
                    key={practice.id}
                    href={`/practices/${category.id}/${practice.id}`}
                    className="group"
                  >
                    <div className={`${category.bgColor} border ${category.borderColor} rounded-xl p-5 ${category.hoverBg} transition-all h-full`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
                            {practice.name}
                          </h3>
                          <p className={`text-sm ${category.color}`}>{practice.sanskrit}</p>
                        </div>
                        {practice.duration && (
                          <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                            {practice.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 italic mb-3">{practice.tagline}</p>
                      <p className="text-sm text-zinc-400 line-clamp-2">{practice.description}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {category.practices.length > 3 && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/practices/${category.id}`}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    + {category.practices.length - 3} more practices
                  </Link>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Cross-link to Library */}
        <div className="mt-16 p-6 bg-gradient-to-r from-amber-950/30 to-violet-950/30 border border-amber-600/30 rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Understand the Theory</h3>
              <p className="text-zinc-400">
                Explore the 18 Mahavidyas — the knowledge systems behind these practices.
              </p>
            </div>
            <Link
              href="/library"
              className="px-6 py-3 bg-amber-500/20 border border-amber-500/50 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-colors"
            >
              Browse Vidya Library →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
              ← Back to Home
            </Link>
            <Link href="/library" className="text-amber-400 hover:text-amber-300 transition-colors text-sm">
              Explore Knowledge Library →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
