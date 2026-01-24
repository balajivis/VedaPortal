'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface SearchResult {
  id: string
  text: string
  title: string
  source: string
  category: string
  subcategory: string
  score: number
}

interface IndexStats {
  model: string
  dimensions: number
  totalChunks: number
  hasEmbeddings: boolean
  categories: { category: string; subcategory: string; count: number }[]
}

const categoryColors: Record<string, string> = {
  Vedas: 'text-amber-400 bg-amber-950/50 border-amber-800/50',
  Smriti: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50',
  Shlokas: 'text-sky-400 bg-sky-950/50 border-sky-800/50',
  Other: 'text-purple-400 bg-purple-950/50 border-purple-800/50',
}

function getCategoryColor(category: string): string {
  return categoryColors[category] || categoryColors.Other
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<IndexStats | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searched, setSearched] = useState(false)

  // Load stats on mount
  useEffect(() => {
    fetch('/api/search')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stats) {
          setStats(data.stats)
        }
      })
      .catch(console.error)
  }, [])

  // Auto-search if query is provided in URL
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  const performSearch = useCallback(async (searchQuery: string, category?: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        limit: '20',
      })
      if (category) {
        params.set('category', category)
      }

      const res = await fetch(`/api/search?${params}`)
      const data = await res.json()

      if (data.success) {
        setResults(data.results)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const search = useCallback(() => {
    performSearch(query, selectedCategory)
  }, [query, selectedCategory, performSearch])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const terms = query.toLowerCase().split(/\s+/)
    let highlighted = text

    for (const term of terms) {
      const regex = new RegExp(`(${term})`, 'gi')
      highlighted = highlighted.replace(regex, '<mark class="bg-amber-500/30 text-amber-200 rounded px-0.5">$1</mark>')
    }

    return highlighted
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/veda-logo-light.png"
              alt="Veda Portal"
              width={712}
              height={395}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/library" className="text-zinc-400 hover:text-white transition">
              Library
            </Link>
            <Link href="/practices" className="text-zinc-400 hover:text-white transition">
              Practices
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Search the Sacred Texts</h1>
          <p className="text-zinc-400">
            {stats
              ? `Search across ${stats.totalChunks.toLocaleString()} passages from Vedic scriptures`
              : 'Loading index...'}
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for mantras, concepts, stories..."
              className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Category Filter */}
          {stats && stats.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedCategory === ''
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              {Array.from(new Set(stats.categories.map(c => c.category))).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {searched && !loading && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-zinc-400">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-zinc-500 text-sm mt-2">Try different keywords or remove the category filter</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm mb-4">
                Found {results.length} results for &ldquo;{query}&rdquo;
              </p>

              {results.map((result, index) => (
                <div
                  key={`${result.id}-${index}`}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-white">{result.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded border ${getCategoryColor(result.category)}`}>
                      {result.category} &gt; {result.subcategory}
                    </span>
                  </div>
                  <p
                    className="text-zinc-300 text-sm leading-relaxed line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: highlightText(result.text, query) }}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>Source: {result.source}</span>
                      <span>Score: {result.score.toFixed(4)}</span>
                    </div>
                    <a
                      href={`/sources/${result.source}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-amber-600/20 border border-amber-600/50 rounded text-amber-400 text-xs hover:bg-amber-600/30 transition"
                    >
                      Open PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Footer */}
          {stats && !searched && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.categories.map((cat, index) => (
                <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400 text-sm">{cat.category}</p>
                  <p className="text-zinc-500 text-xs">{cat.subcategory}</p>
                  <p className="text-2xl font-bold text-white mt-1">{cat.count.toLocaleString()}</p>
                  <p className="text-zinc-500 text-xs">passages</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Loading search...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
