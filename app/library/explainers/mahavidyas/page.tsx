import Link from 'next/link'
import { MahavidyasDiagram } from '@/components/MahavidyasDiagram'

export default function MahavidyasExplainerPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/library"
                className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Library</span>
              </Link>
              <div className="h-4 w-px bg-zinc-700" />
              <div>
                <h1 className="text-lg font-semibold text-zinc-100">The 18 Mahavidyas</h1>
                <p className="text-sm text-zinc-500">Interactive Overview</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
              Interactive
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <MahavidyasDiagram />
      </main>
    </div>
  )
}
