'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories, getAllVidyas } from '@/content/vidyas'

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = getAllCategories()
  const allVidyas = getAllVidyas()

  const filteredVidyas = useMemo(() => {
    let result = allVidyas

    if (selectedCategory) {
      result = result.filter(v => v.category.id === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(v =>
        v.vidya.name.toLowerCase().includes(query) ||
        v.vidya.sanskrit.includes(query) ||
        v.vidya.description.toLowerCase().includes(query) ||
        v.vidya.keyTopics.some(t => t.toLowerCase().includes(query))
      )
    }

    return result
  }, [allVidyas, selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
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
                <h1 className="text-2xl font-bold">Vidya Library</h1>
              </div>
              <p className="text-zinc-400 text-sm">
                Browse the 18 Mahavidyas — India&apos;s comprehensive knowledge traditions
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Link href="/practices" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">
                Practices
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

          <div className="flex items-start justify-between gap-4 mt-4">
            {/* Search */}
            <div className="relative w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search vidyas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-amber-500 text-zinc-900'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
              }`}
            >
              <span>📚</span>
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded text-xs ${
                selectedCategory === null
                  ? 'bg-amber-600 text-amber-100'
                  : 'bg-zinc-700 text-zinc-500'
              }`}>
                {allVidyas.length}
              </span>
            </button>

            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-500 text-zinc-900'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-amber-100'
                    : 'bg-zinc-700 text-zinc-500'
                }`}>
                  {category.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Overview Link */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          href="/library/explainers/mahavidyas"
          className="block p-4 bg-gradient-to-r from-amber-950/50 to-purple-950/50 border border-amber-600/30 rounded-xl hover:border-amber-500/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🕉️</span>
              <div>
                <h3 className="font-semibold text-zinc-100">The 18 Mahavidyas Overview</h3>
                <p className="text-sm text-zinc-400">Interactive diagram showing how all traditions connect</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Results */}
      {(selectedCategory || searchQuery) && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Showing <span className="text-zinc-100 font-medium">{filteredVidyas.length}</span> vidya{filteredVidyas.length !== 1 ? 's' : ''}
              {selectedCategory && (
                <> in <span className="text-amber-400">{categories.find(c => c.id === selectedCategory)?.name}</span></>
              )}
              {searchQuery && (
                <> matching &ldquo;<span className="text-amber-400">{searchQuery}</span>&rdquo;</>
              )}
            </p>
            {(selectedCategory || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVidyas.map(({ vidya, category }) => (
            <Link
              key={vidya.id}
              href={`/library/${category.id}/${vidya.id}`}
              className="group block"
            >
              <div className={`${category.bgColor} ${category.hoverBg} border ${category.borderColor} rounded-xl p-6 transition-all h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.color} border ${category.borderColor}`}>
                    {category.name}
                  </span>
                </div>

                <h3 className={`text-lg font-semibold text-zinc-100 group-hover:${category.color} transition-colors mb-1`}>
                  {vidya.name}
                </h3>
                <p className={`text-sm ${category.color} mb-3`}>{vidya.sanskrit}</p>

                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                  {vidya.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {vidya.keyTopics.slice(0, 3).map(topic => (
                    <span key={topic} className="px-2 py-0.5 bg-zinc-800/50 rounded-full text-xs text-zinc-500">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredVidyas.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-zinc-400 mb-2">No vidyas found</p>
            <p className="text-zinc-500 text-sm">Try adjusting your search or filter</p>
            <button
              onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
