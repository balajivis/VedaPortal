import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCategory, getAllCategories } from '@/content/vidyas'

export function generateStaticParams() {
  return getAllCategories().map(category => ({
    categoryId: category.id
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const category = getCategory(categoryId)

  if (!category) {
    notFound()
  }

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
            <span className="text-zinc-600">/</span>
            <Link href="/library" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
              Library
            </Link>
            <span className="text-zinc-600">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              <div>
                <h1 className="text-xl font-bold">{category.name}</h1>
                <p className={`text-xs ${category.color}`}>{category.sanskrit}</p>
              </div>
            </div>
          </div>
          <p className="text-zinc-400 text-sm max-w-3xl">
            {category.description}
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.items.map(vidya => (
            <Link
              key={vidya.id}
              href={`/library/${category.id}/${vidya.id}`}
              className="group block"
            >
              <div className={`${category.bgColor} ${category.hoverBg} border ${category.borderColor} rounded-xl p-6 transition-all h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className={`text-xl font-semibold text-zinc-100 group-hover:${category.color} transition-colors`}>
                      {vidya.name}
                    </h2>
                    <p className={`${category.color} text-lg`}>{vidya.sanskrit}</p>
                  </div>
                  <svg className={`w-5 h-5 ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-zinc-300 mb-4">
                  {vidya.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {vidya.keyTopics.slice(0, 4).map(topic => (
                    <span key={topic} className={`px-2.5 py-1 rounded-full text-xs border ${category.borderColor} ${category.color}`}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-400 mb-4">Other Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getAllCategories()
              .filter(c => c.id !== category.id)
              .map(cat => (
                <Link
                  key={cat.id}
                  href={`/library/${cat.id}`}
                  className={`p-4 ${cat.bgColor} border ${cat.borderColor} rounded-xl ${cat.hoverBg} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h4 className={`font-medium ${cat.color}`}>{cat.name}</h4>
                      <p className="text-xs text-zinc-500">{cat.items.length} vidyas</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
