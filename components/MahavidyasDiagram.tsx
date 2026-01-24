'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { CATEGORIES, type Vidya } from '@/content/vidyas'

export function MahavidyasDiagram() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredVidya, setHoveredVidya] = useState<Vidya | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.classList.add('animate-in')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory)

  // Render a single vidya item as a link
  const VidyaItem = ({ vidya, categoryId, colorClasses }: {
    vidya: Vidya
    categoryId: string
    colorClasses: { bg: string; border: string; text: string; textMuted: string }
  }) => (
    <Link
      href={`/library/${categoryId}/${vidya.id}`}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHoveredVidya(vidya)}
      onMouseLeave={() => setHoveredVidya(null)}
      className={`
        px-4 py-2 rounded-lg ${colorClasses.bg} border ${colorClasses.border}
        cursor-pointer transition-all hover:scale-105 hover:shadow-lg
        ${hoveredVidya?.id === vidya.id ? 'ring-2 ring-white/50' : ''}
      `}
    >
      <div className={`${colorClasses.text} font-medium text-sm`}>{vidya.name}</div>
      <div className={`${colorClasses.textMuted} text-xs`}>{vidya.sanskrit}</div>
    </Link>
  )

  return (
    <div className="w-full bg-zinc-950 overflow-auto p-6">
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto opacity-0 transition-opacity duration-700 [&.animate-in]:opacity-100"
      >
        {/* Visual Diagram */}
        <div className="relative mb-8">
          {/* Core Vedas - Top Row */}
          <div className="flex justify-center mb-6">
            <div
              onClick={() => handleCategoryClick('vedas')}
              className={`
                cursor-pointer transition-all duration-300 p-4 rounded-xl border-2
                ${CATEGORIES[0].bgColor} ${CATEGORIES[0].borderColor}
                ${selectedCategory === 'vedas' ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-zinc-950 scale-105' : 'hover:scale-102'}
              `}
            >
              <div className="text-center mb-3">
                <Link href="/library/vedas" onClick={(e) => e.stopPropagation()} className="hover:underline">
                  <h3 className={`text-lg font-bold ${CATEGORIES[0].color}`}>
                    {CATEGORIES[0].name}
                  </h3>
                </Link>
                <p className="text-zinc-500 text-sm">{CATEGORIES[0].sanskrit}</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                {CATEGORIES[0].items.map(veda => (
                  <VidyaItem
                    key={veda.id}
                    vidya={veda}
                    categoryId="vedas"
                    colorClasses={{
                      bg: 'bg-amber-900/30',
                      border: 'border-amber-600/30',
                      text: 'text-amber-300',
                      textMuted: 'text-amber-500/70'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row: Vedangas - Center Circle - Upavedas */}
          <div className="flex justify-center items-center gap-6 mb-6 flex-wrap lg:flex-nowrap">
            {/* Vedangas - Left */}
            <div
              onClick={() => handleCategoryClick('vedangas')}
              className={`
                cursor-pointer transition-all duration-300 p-4 rounded-xl border-2 w-full lg:w-auto
                ${CATEGORIES[1].bgColor} ${CATEGORIES[1].borderColor}
                ${selectedCategory === 'vedangas' ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-zinc-950 scale-105' : 'hover:scale-102'}
              `}
            >
              <div className="text-center mb-3">
                <Link href="/library/vedangas" onClick={(e) => e.stopPropagation()} className="hover:underline">
                  <h3 className={`text-lg font-bold ${CATEGORIES[1].color}`}>
                    {CATEGORIES[1].name}
                  </h3>
                </Link>
                <p className="text-zinc-500 text-sm">{CATEGORIES[1].sanskrit}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES[1].items.map(vedanga => (
                  <VidyaItem
                    key={vedanga.id}
                    vidya={vedanga}
                    categoryId="vedangas"
                    colorClasses={{
                      bg: 'bg-emerald-900/30',
                      border: 'border-emerald-600/30',
                      text: 'text-emerald-300',
                      textMuted: 'text-emerald-500/70'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Center Circle */}
            <Link
              href="/library"
              className="flex-shrink-0 w-40 h-40 rounded-full border-4 border-zinc-700 bg-zinc-900 flex items-center justify-center hover:border-zinc-500 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-100">18</div>
                <div className="text-zinc-400 text-sm">Mahavidyas</div>
                <div className="text-zinc-500 text-xs">महाविद्या</div>
              </div>
            </Link>

            {/* Upavedas - Right */}
            <div
              onClick={() => handleCategoryClick('upavedas')}
              className={`
                cursor-pointer transition-all duration-300 p-4 rounded-xl border-2 w-full lg:w-auto
                ${CATEGORIES[2].bgColor} ${CATEGORIES[2].borderColor}
                ${selectedCategory === 'upavedas' ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-zinc-950 scale-105' : 'hover:scale-102'}
              `}
            >
              <div className="text-center mb-3">
                <Link href="/library/upavedas" onClick={(e) => e.stopPropagation()} className="hover:underline">
                  <h3 className={`text-lg font-bold ${CATEGORIES[2].color}`}>
                    {CATEGORIES[2].name}
                  </h3>
                </Link>
                <p className="text-zinc-500 text-sm">{CATEGORIES[2].sanskrit}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES[2].items.map(upaveda => (
                  <VidyaItem
                    key={upaveda.id}
                    vidya={upaveda}
                    categoryId="upavedas"
                    colorClasses={{
                      bg: 'bg-sky-900/30',
                      border: 'border-sky-600/30',
                      text: 'text-sky-300',
                      textMuted: 'text-sky-500/70'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Darshanas - Bottom Row */}
          <div className="flex justify-center">
            <div
              onClick={() => handleCategoryClick('darshanas')}
              className={`
                cursor-pointer transition-all duration-300 p-4 rounded-xl border-2
                ${CATEGORIES[3].bgColor} ${CATEGORIES[3].borderColor}
                ${selectedCategory === 'darshanas' ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-zinc-950 scale-105' : 'hover:scale-102'}
              `}
            >
              <div className="text-center mb-3">
                <Link href="/library/darshanas" onClick={(e) => e.stopPropagation()} className="hover:underline">
                  <h3 className={`text-lg font-bold ${CATEGORIES[3].color}`}>
                    {CATEGORIES[3].name}
                  </h3>
                </Link>
                <p className="text-zinc-500 text-sm">{CATEGORIES[3].sanskrit}</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                {CATEGORIES[3].items.map(darshana => (
                  <VidyaItem
                    key={darshana.id}
                    vidya={darshana}
                    categoryId="darshanas"
                    colorClasses={{
                      bg: 'bg-purple-900/30',
                      border: 'border-purple-600/30',
                      text: 'text-purple-300',
                      textMuted: 'text-purple-500/70'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Preview Panel */}
        {hoveredVidya && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
            <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-xl p-4 shadow-2xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-zinc-100">{hoveredVidya.name}</h3>
                  <p className="text-zinc-500 text-sm">{hoveredVidya.sanskrit}</p>
                </div>
                <span className="text-xs text-zinc-500">Click to explore →</span>
              </div>
              <p className="text-sm text-zinc-400">{hoveredVidya.description}</p>
            </div>
          </div>
        )}

        {/* Category Detail Panel */}
        {activeCategory && (
          <div className={`
            max-w-3xl mx-auto p-6 rounded-xl border-2 transition-all duration-300 mb-6
            ${activeCategory.bgColor} ${activeCategory.borderColor}
          `}>
            <h2 className={`text-2xl font-bold mb-2 ${activeCategory.color}`}>
              {activeCategory.name} <span className="text-lg font-normal text-zinc-500">({activeCategory.sanskrit})</span>
            </h2>
            <p className="text-zinc-300 mb-4">{activeCategory.description}</p>
            <Link
              href={`/library/${activeCategory.id}`}
              className={`inline-flex items-center gap-2 px-4 py-2 ${activeCategory.bgColor} ${activeCategory.color} border ${activeCategory.borderColor} rounded-lg text-sm hover:opacity-80 transition-opacity`}
            >
              Browse all {activeCategory.items.length} {activeCategory.name} →
            </Link>
          </div>
        )}

        {/* Summary Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Sanskrit</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Count</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Components</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map(category => (
                <tr
                  key={category.id}
                  className={`border-b border-zinc-800 cursor-pointer transition-colors ${
                    selectedCategory === category.id ? category.bgColor : 'hover:bg-zinc-900'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <td className={`py-3 px-4 font-bold ${category.color}`}>
                    <Link href={`/library/${category.id}`} className="hover:underline">
                      {category.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-zinc-500">{category.sanskrit}</td>
                  <td className="py-3 px-4 text-zinc-400">{category.items.length}</td>
                  <td className="py-3 px-4 text-zinc-400">
                    {category.items.map((item, i) => (
                      <span key={item.id}>
                        <Link
                          href={`/library/${category.id}/${item.id}`}
                          className={`${category.color} hover:underline`}
                        >
                          {item.name}
                        </Link>
                        {i < category.items.length - 1 && <span className="text-zinc-600">, </span>}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insight */}
        <div className="mt-8 p-6 bg-amber-950/30 border border-amber-600/50 rounded-xl">
          <h3 className="text-amber-400 font-bold mb-2">The Integrated Knowledge System</h3>
          <p className="text-zinc-300 text-sm">
            The 18 Mahavidyas represent a holistic educational framework. The{' '}
            <Link href="/library/vedas" className="text-amber-400 font-medium hover:underline">Four Vedas</Link> form
            the spiritual core. The{' '}
            <Link href="/library/vedangas" className="text-emerald-400 font-medium hover:underline">Six Vedangas</Link> are limbs that enable proper
            understanding and transmission. The{' '}
            <Link href="/library/upavedas" className="text-sky-400 font-medium hover:underline">Four Upavedas</Link> apply this wisdom to
            practical life. And the{' '}
            <Link href="/library/darshanas" className="text-purple-400 font-medium hover:underline">Foundational Wisdom</Link> texts provide philosophical
            frameworks and ethical guidance for society.
          </p>
        </div>

        {/* Quick Reference */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(category => (
            <Link
              key={category.id}
              href={`/library/${category.id}`}
              className={`p-4 rounded-xl border ${category.borderColor} ${category.bgColor} ${category.hoverBg} transition-colors`}
            >
              <div className={`text-2xl font-bold ${category.color}`}>{category.items.length}</div>
              <div className="text-zinc-300 text-sm">{category.name}</div>
              <div className="text-zinc-500 text-xs">{category.sanskrit}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
