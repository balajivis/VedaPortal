/**
 * Vector search library for Veda Portal
 * Uses cosine similarity to find relevant chunks
 */

import fs from 'fs'
import path from 'path'

export interface Chunk {
  id: string
  text: string
  title: string
  source: string
  category: string
  subcategory: string
  chunkIndex: number
  embedding?: number[]
}

export interface VectorIndex {
  model: string
  dimensions: number
  count: number
  chunks: Chunk[]
}

export interface ChunksOnly {
  chunks: Chunk[]
}

export interface SearchResult {
  id: string
  text: string
  title: string
  source: string
  category: string
  subcategory: string
  score: number
}

let cachedIndex: VectorIndex | null = null
let cachedChunks: Chunk[] | null = null

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  return denominator === 0 ? 0 : dotProduct / denominator
}

export function loadIndex(): VectorIndex | null {
  if (cachedIndex) return cachedIndex

  const indexPath = path.join(process.cwd(), 'data', 'vector-index.json')

  if (!fs.existsSync(indexPath)) {
    console.warn('Vector index not found. Run build-index.mjs first.')
    return null
  }

  try {
    const data = fs.readFileSync(indexPath, 'utf-8')
    cachedIndex = JSON.parse(data) as VectorIndex
    console.log(`Loaded vector index: ${cachedIndex.count} chunks`)
    return cachedIndex
  } catch (error) {
    console.error('Error loading index:', error)
    return null
  }
}

// Load chunks only (for keyword search without embeddings)
export function loadChunks(): Chunk[] | null {
  if (cachedChunks) return cachedChunks

  // Try vector index first
  const index = loadIndex()
  if (index) {
    cachedChunks = index.chunks
    return cachedChunks
  }

  // Fall back to chunks.json (no embeddings)
  const chunksPath = path.join(process.cwd(), 'data', 'chunks.json')

  if (!fs.existsSync(chunksPath)) {
    console.warn('No chunks or index found. Run extract-pdfs.mjs first.')
    return null
  }

  try {
    const data = fs.readFileSync(chunksPath, 'utf-8')
    cachedChunks = JSON.parse(data) as Chunk[]
    console.log(`Loaded chunks: ${cachedChunks.length} chunks (no embeddings)`)
    return cachedChunks
  } catch (error) {
    console.error('Error loading chunks:', error)
    return null
  }
}

export function searchByEmbedding(
  queryEmbedding: number[],
  options: {
    topK?: number
    minScore?: number
    category?: string
  } = {}
): SearchResult[] {
  const { topK = 10, minScore = 0.3, category } = options
  const index = loadIndex()

  if (!index) {
    return []
  }

  // Filter by category if specified
  let chunks = index.chunks
  if (category) {
    chunks = chunks.filter(c =>
      c.category.toLowerCase() === category.toLowerCase() ||
      c.subcategory.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter to chunks with embeddings and calculate similarity
  const chunksWithEmbeddings = chunks.filter(c => c.embedding && c.embedding.length > 0)
  const scored = chunksWithEmbeddings.map(chunk => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding!)
  }))

  // Sort by score and filter
  const results = scored
    .filter(r => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ embedding, chunkIndex, ...rest }) => rest) // Remove embedding from results

  return results
}

// For text-based search (works with or without embeddings)
export function searchByKeywords(
  query: string,
  options: {
    topK?: number
    category?: string
  } = {}
): SearchResult[] {
  const { topK = 10, category } = options
  const chunks = loadChunks()

  if (!chunks) {
    return []
  }

  const queryTerms = query.toLowerCase().split(/\s+/)

  let filteredChunks = chunks
  if (category) {
    filteredChunks = chunks.filter(c =>
      c.category.toLowerCase() === category.toLowerCase() ||
      c.subcategory.toLowerCase() === category.toLowerCase()
    )
  }

  // Simple keyword matching with scoring
  const scored = filteredChunks.map(chunk => {
    const text = chunk.text.toLowerCase()
    let score = 0

    for (const term of queryTerms) {
      if (text.includes(term)) {
        // Boost for exact word matches
        const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'gi')
        const matches = text.match(wordBoundaryRegex)
        score += matches ? matches.length * 2 : 1
      }
    }

    // Normalize by text length
    score = score / Math.sqrt(chunk.text.length)

    return { ...chunk, score }
  })

  const results = scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ embedding, chunkIndex, ...rest }) => rest)

  return results
}

// Get unique categories from chunks
export function getCategories(): { category: string; subcategory: string; count: number }[] {
  const chunks = loadChunks()
  if (!chunks) return []

  const categoryMap = new Map<string, number>()

  for (const chunk of chunks) {
    const key = `${chunk.category}|${chunk.subcategory}`
    categoryMap.set(key, (categoryMap.get(key) || 0) + 1)
  }

  return Array.from(categoryMap.entries()).map(([key, count]) => {
    const [category, subcategory] = key.split('|')
    return { category, subcategory, count }
  })
}

// Get index stats
export function getIndexStats() {
  const chunks = loadChunks()
  if (!chunks) return null

  const index = loadIndex()

  return {
    model: index?.model || 'none',
    dimensions: index?.dimensions || 0,
    totalChunks: chunks.length,
    hasEmbeddings: !!index,
    categories: getCategories()
  }
}
