import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPracticeCategory, getAllPracticeCategories } from '@/content/practices'

export function generateStaticParams() {
  return getAllPracticeCategories().map(category => ({
    categoryId: category.id
  }))
}

export default async function PracticeCategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const category = getPracticeCategory(categoryId)

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
            <Link href="/practices" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm">
              Practices
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

      {/* Practices Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.practices.map(practice => (
            <Link
              key={practice.id}
              href={`/practices/${category.id}/${practice.id}`}
              className="group block"
            >
              <div className={`${category.bgColor} ${category.hoverBg} border ${category.borderColor} rounded-xl p-6 transition-all h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className={`text-xl font-semibold text-zinc-100 group-hover:${category.color} transition-colors`}>
                      {practice.name}
                    </h2>
                    <p className={`${category.color} text-lg`}>{practice.sanskrit}</p>
                  </div>
                  <svg className={`w-5 h-5 ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-zinc-500 italic mb-3">{practice.tagline}</p>
                <p className="text-zinc-300 mb-4">{practice.description}</p>

                <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                  {practice.duration && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {practice.duration}
                    </span>
                  )}
                  {practice.frequency && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {practice.frequency}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {practice.keyBenefits.slice(0, 3).map(benefit => (
                    <span key={benefit} className={`px-2.5 py-1 rounded-full text-xs border ${category.borderColor} ${category.color}`}>
                      {benefit}
                    </span>
                  ))}
                  {practice.keyBenefits.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs bg-zinc-800 text-zinc-500">
                      +{practice.keyBenefits.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-400 mb-4">Other Practice Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getAllPracticeCategories()
              .filter(c => c.id !== category.id)
              .map(cat => (
                <Link
                  key={cat.id}
                  href={`/practices/${cat.id}`}
                  className={`p-4 ${cat.bgColor} border ${cat.borderColor} rounded-xl ${cat.hoverBg} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h4 className={`font-medium ${cat.color}`}>{cat.name}</h4>
                      <p className="text-xs text-zinc-500">{cat.practices.length} practices</p>
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
