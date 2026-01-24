import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getVidya, getRelatedVidyas, getAllVidyas } from '@/content/vidyas'

export function generateStaticParams() {
  return getAllVidyas().map(({ vidya, category }) => ({
    categoryId: category.id,
    vidyaId: vidya.id
  }))
}

export default async function VidyaDetailPage({
  params
}: {
  params: Promise<{ categoryId: string; vidyaId: string }>
}) {
  const { categoryId, vidyaId } = await params
  const result = getVidya(vidyaId)

  if (!result || result.category.id !== categoryId) {
    notFound()
  }

  const { vidya, category } = result
  const relatedVidyas = getRelatedVidyas(vidyaId)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="/veda-logo-light.png"
                  alt="Veda Portal"
                  width={712}
                  height={395}
                  className="h-10 w-auto"
                />
              </Link>
              <span className="text-zinc-600">/</span>
              <Link href="/library" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
                Library
              </Link>
              <span className="text-zinc-600">/</span>
              <Link
                href={`/library/${category.id}`}
                className="text-zinc-400 hover:text-amber-400 transition-colors text-sm"
              >
                {category.name}
              </Link>
              <span className="text-zinc-600">/</span>
              <div>
                <h1 className="text-lg font-semibold text-zinc-100">{vidya.name}</h1>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${category.bgColor} ${category.color} border ${category.borderColor}`}>
              {category.icon} {vidya.sanskrit}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className={`${category.bgColor} border ${category.borderColor} rounded-2xl p-8 mb-8`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-zinc-100 mb-2">{vidya.name}</h1>
            <p className={`text-3xl ${category.color} mb-4`}>{vidya.sanskrit}</p>
            <p className="text-xl text-zinc-300">{vidya.description}</p>
          </div>
        </div>

        {/* Full Description */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Overview</h2>
          <p className="text-zinc-300 leading-relaxed text-lg">
            {vidya.fullDescription}
          </p>
        </section>

        {/* Key Topics & Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-zinc-100 mb-4">Key Topics</h3>
            <div className="flex flex-wrap gap-2">
              {vidya.keyTopics.map(topic => (
                <span
                  key={topic}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${category.borderColor} ${category.color} ${category.bgColor}`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-zinc-100 mb-4">Primary Sources</h3>
            <ul className="space-y-2">
              {vidya.sources.map(source => (
                <li key={source} className="flex items-center gap-2 text-zinc-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${category.color.replace('text-', 'bg-')}`} />
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Vidyas */}
        {relatedVidyas.length > 0 && (
          <section className="border-t border-zinc-800 pt-8">
            <h2 className="text-xl font-semibold text-zinc-100 mb-6">Related Vidyas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedVidyas.map(({ vidya: related, category: relCat }) => (
                <Link
                  key={related.id}
                  href={`/library/${relCat.id}/${related.id}`}
                  className="group"
                >
                  <div className={`p-4 ${relCat.bgColor} border ${relCat.borderColor} rounded-xl ${relCat.hoverBg} transition-colors`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{relCat.icon}</span>
                      <div>
                        <h3 className={`font-medium text-zinc-100 group-hover:${relCat.color} transition-colors`}>
                          {related.name}
                        </h3>
                        <p className={`text-sm ${relCat.color}`}>{related.sanskrit}</p>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{related.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/30 mt-8">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/library"
              className="text-zinc-400 hover:text-amber-400 transition-colors text-sm"
            >
              ← Back to Library
            </Link>
            <Link
              href="/library/explainers/mahavidyas"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
            >
              View Complete Overview →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
