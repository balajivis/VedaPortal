'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface DocInfo {
  name: string
  path: string
  category: string
  subcategory: string
  size: number
  sizeFormatted: string
}

interface DocsResponse {
  success: boolean
  totalDocs: number
  totalSize: string
  docs: DocInfo[]
  byCategory: Record<string, DocInfo[]>
}

interface AuthUser {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
}

const categoryColors: Record<string, string> = {
  Vedas: 'text-amber-400 bg-amber-950/50 border-amber-800/50',
  Smriti: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50',
  Shlokas: 'text-sky-400 bg-sky-950/50 border-sky-800/50',
  Other: 'text-purple-400 bg-purple-950/50 border-purple-800/50',
  Uploads: 'text-rose-400 bg-rose-950/50 border-rose-800/50',
}

function getCategoryColor(category: string): string {
  return categoryColors[category] || categoryColors.Other
}

export default function DocsPage() {
  const router = useRouter()
  const [docs, setDocs] = useState<DocsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('vedas')
  const [selectedSubcategory, setSelectedSubcategory] = useState('general')

  useEffect(() => {
    fetchDocs()
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      }
    } catch {
      // Not logged in
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.refresh()
  }

  const fetchDocs = async () => {
    try {
      const res = await fetch('/api/docs')
      const data = await res.json()
      if (data.success) {
        setDocs(data)
      }
    } catch (error) {
      console.error('Error fetching docs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)
    setUploadMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/docs/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()

      if (data.success) {
        setUploadMessage({ type: 'success', text: `${data.message}. ${data.chunksAdded} chunks added.` })
        form.reset()
        fetchDocs() // Refresh the list
      } else {
        setUploadMessage({ type: 'error', text: data.error || 'Upload failed' })
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'Upload failed. Please try again.' })
    } finally {
      setUploading(false)
    }
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
            <Link href="/search" className="text-zinc-400 hover:text-white transition">
              Search
            </Link>
            <Link href="/docs" className="text-amber-400 font-medium">
              Documents
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-zinc-400 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-zinc-400 hover:text-white transition">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Source Documents</h1>
          <p className="text-zinc-400">
            {docs ? `${docs.totalDocs} documents (${docs.totalSize})` : 'Loading...'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Document List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-zinc-400">Loading documents...</div>
            ) : docs && Object.entries(docs.byCategory).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(docs.byCategory).map(([categoryKey, categoryDocs]) => {
                  const [cat] = categoryKey.split(' > ')
                  return (
                    <div key={categoryKey} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <h2 className={`text-lg font-semibold mb-3 ${getCategoryColor(cat).split(' ')[0]}`}>
                        {categoryKey}
                        <span className="text-zinc-500 text-sm font-normal ml-2">
                          ({categoryDocs.length} docs)
                        </span>
                      </h2>
                      <div className="space-y-2">
                        {categoryDocs.map((doc, index) => (
                          <a
                            key={index}
                            href={`/sources/${doc.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition group"
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-zinc-200 group-hover:text-white transition">
                                {doc.name}
                              </span>
                            </div>
                            <span className="text-zinc-500 text-sm">{doc.sizeFormatted}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-zinc-400">No documents found</div>
            )}
          </div>

          {/* Upload Panel */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-4">
              {user && user.role === 'ADMIN' ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Upload New Document</h2>
                    <span className="text-xs text-zinc-500">{user.name}</span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-6">
                    Upload a PDF to add it to the searchable library. The document will be processed, chunked, and indexed automatically.
                  </p>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">PDF File</label>
                  <input
                    type="file"
                    name="file"
                    accept=".pdf"
                    required
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-amber-600 file:text-white file:cursor-pointer hover:file:bg-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Category</label>
                  <select
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                  >
                    <option value="vedas">Vedas</option>
                    <option value="smriti">Smriti</option>
                    <option value="shlokas">Shlokas</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Subcategory</label>
                  <select
                    name="subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                  >
                    {selectedCategory === 'vedas' && (
                      <>
                        <option value="general">General</option>
                        <option value="samhita">Samhita</option>
                        <option value="brahmana">Brahmana</option>
                        <option value="aranyaka">Aranyaka</option>
                        <option value="upanishad">Upanishad</option>
                      </>
                    )}
                    {selectedCategory === 'smriti' && (
                      <>
                        <option value="itihasa">Itihasa</option>
                        <option value="purana">Purana</option>
                        <option value="dharmashastra">Dharmashastra</option>
                      </>
                    )}
                    {selectedCategory === 'shlokas' && (
                      <>
                        <option value="stotras">Stotras</option>
                        <option value="mantras">Mantras</option>
                      </>
                    )}
                    {selectedCategory === 'other' && (
                      <>
                        <option value="uploads">Uploads</option>
                        <option value="commentary">Commentary</option>
                      </>
                    )}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
                >
                  {uploading ? 'Uploading & Processing...' : 'Upload Document'}
                </button>
              </form>

              {uploadMessage && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  uploadMessage.type === 'success'
                    ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                    : 'bg-red-950/50 text-red-400 border border-red-800/50'
                }`}>
                  {uploadMessage.text}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs">
                  <strong>Note:</strong> Uploaded documents are added to keyword search immediately.
                  Vector embeddings require rebuilding the index.
                </p>
              </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-white mb-4">Upload Documents</h2>
                  <p className="text-zinc-400 text-sm mb-6">
                    {user ? 'Admin access required to upload documents.' : 'Admin login required to upload documents.'}
                  </p>
                  {!user && (
                    <Link
                      href="/login"
                      className="block w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition text-center"
                    >
                      Admin Login
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
