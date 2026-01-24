import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPractice, getAllPractices } from '@/content/practices'

export function generateStaticParams() {
  return getAllPractices().map(({ practice, category }) => ({
    categoryId: category.id,
    practiceId: practice.id
  }))
}

// Simple markdown-like renderer for content
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentTable: string[][] = []
  let inTable = false
  let tableHeaders: string[] = []

  lines.forEach((line, index) => {
    // Table handling
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim())

      if (!inTable) {
        inTable = true
        tableHeaders = cells
      } else if (line.includes('---')) {
        // Skip separator line
      } else {
        currentTable.push(cells)
      }
      return
    } else if (inTable) {
      // End of table
      elements.push(
        <div key={`table-${index}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                {tableHeaders.map((h, i) => (
                  <th key={i} className="text-left py-2 px-3 text-zinc-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.map((row, ri) => (
                <tr key={ri} className="border-b border-zinc-800">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-3 text-zinc-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      inTable = false
      currentTable = []
      tableHeaders = []
    }

    // Headers
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-2xl font-bold text-zinc-100 mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-xl font-semibold text-zinc-200 mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('- **')) {
      // Bold list item
      const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
      if (match) {
        elements.push(
          <li key={index} className="ml-4 mb-2 text-zinc-300">
            <strong className="text-zinc-100">{match[1]}</strong>
            {match[2] && `: ${match[2]}`}
          </li>
        )
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={index} className="ml-4 mb-2 text-zinc-300">
          {line.replace('- ', '')}
        </li>
      )
    } else if (line.match(/^\d+\.\s\*\*/)) {
      // Numbered list with bold
      const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*-?\s*(.*)/)
      if (match) {
        elements.push(
          <li key={index} className="ml-4 mb-2 text-zinc-300 list-decimal">
            <strong className="text-zinc-100">{match[1]}</strong>
            {match[2] && ` — ${match[2]}`}
          </li>
        )
      }
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      // Italic quote
      elements.push(
        <p key={index} className="text-amber-400/80 italic my-4">
          {line.replace(/^\*|\*$/g, '')}
        </p>
      )
    } else if (line.trim() === '') {
      // Empty line - paragraph break
      elements.push(<div key={index} className="h-2" />)
    } else if (line.trim()) {
      // Regular paragraph
      elements.push(
        <p key={index} className="text-zinc-300 leading-relaxed mb-4">
          {line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-zinc-100">$1</strong>')
               .split(/<strong class="text-zinc-100">|<\/strong>/)
               .map((part, i) => i % 2 === 1 ? <strong key={i} className="text-zinc-100">{part}</strong> : part)}
        </p>
      )
    }
  })

  return elements
}

export default async function PracticeDetailPage({
  params
}: {
  params: Promise<{ categoryId: string; practiceId: string }>
}) {
  const { categoryId, practiceId } = await params
  const result = getPractice(practiceId)

  if (!result || result.category.id !== categoryId) {
    notFound()
  }

  const { practice, category } = result

  // Get other practices in same category
  const otherPractices = category.practices.filter(p => p.id !== practice.id).slice(0, 3)

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
              <Link href="/practices" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
                Practices
              </Link>
              <span className="text-zinc-600">/</span>
              <Link
                href={`/practices/${category.id}`}
                className="text-zinc-400 hover:text-amber-400 transition-colors text-sm"
              >
                {category.name}
              </Link>
              <span className="text-zinc-600">/</span>
              <div>
                <h1 className="text-lg font-semibold text-zinc-100">{practice.name}</h1>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${category.bgColor} ${category.color} border ${category.borderColor}`}>
              {category.icon} {practice.sanskrit}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className={`${category.bgColor} border ${category.borderColor} rounded-2xl p-8 mb-8`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-zinc-100 mb-2">{practice.name}</h1>
            <p className={`text-3xl ${category.color} mb-2`}>{practice.sanskrit}</p>
            <p className="text-xl text-zinc-400 italic mb-4">{practice.tagline}</p>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">{practice.description}</p>
          </div>

          {/* Quick Info */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            {practice.duration && (
              <div className="flex items-center gap-2 text-zinc-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{practice.duration}</span>
              </div>
            )}
            {practice.frequency && (
              <div className="flex items-center gap-2 text-zinc-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{practice.frequency}</span>
              </div>
            )}
          </div>
        </div>

        {/* Key Benefits */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Key Benefits</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {practice.keyBenefits.map(benefit => (
              <div
                key={benefit}
                className={`p-3 ${category.bgColor} border ${category.borderColor} rounded-lg`}
              >
                <span className={`text-sm ${category.color}`}>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="prose-invert">
          {renderContent(practice.content)}
        </section>

        {/* Related Practices */}
        {otherPractices.length > 0 && (
          <section className="border-t border-zinc-800 pt-8 mt-8">
            <h2 className="text-xl font-semibold text-zinc-100 mb-6">More {category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPractices.map(p => (
                <Link
                  key={p.id}
                  href={`/practices/${category.id}/${p.id}`}
                  className="group"
                >
                  <div className={`p-4 ${category.bgColor} border ${category.borderColor} rounded-xl ${category.hoverBg} transition-colors`}>
                    <h3 className={`font-medium text-zinc-100 group-hover:${category.color} transition-colors`}>
                      {p.name}
                    </h3>
                    <p className={`text-sm ${category.color}`}>{p.sanskrit}</p>
                    <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{p.tagline}</p>
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
              href={`/practices/${category.id}`}
              className="text-zinc-400 hover:text-amber-400 transition-colors text-sm"
            >
              ← Back to {category.name}
            </Link>
            <Link
              href="/practices"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
            >
              All Practices →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
