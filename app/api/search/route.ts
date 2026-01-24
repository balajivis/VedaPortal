import { NextRequest, NextResponse } from 'next/server'
import { searchByKeywords, getIndexStats, type SearchResult } from '@/lib/vector-search'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const category = searchParams.get('category') || undefined
  const limit = parseInt(searchParams.get('limit') || '10')

  // Return index stats if no query
  if (!query) {
    const stats = getIndexStats()
    return NextResponse.json({
      success: true,
      stats
    })
  }

  try {
    // Use keyword search (vector search requires embedding the query)
    const results = searchByKeywords(query, {
      topK: limit,
      category
    })

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({
      success: false,
      error: 'Search failed'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, embedding, category, limit = 10 } = body

    if (!query && !embedding) {
      return NextResponse.json({
        success: false,
        error: 'Query or embedding required'
      }, { status: 400 })
    }

    let results: SearchResult[]

    if (embedding && Array.isArray(embedding)) {
      // Vector search with provided embedding
      const { searchByEmbedding } = await import('@/lib/vector-search')
      results = searchByEmbedding(embedding, {
        topK: limit,
        category
      })
    } else {
      // Keyword search
      results = searchByKeywords(query, {
        topK: limit,
        category
      })
    }

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({
      success: false,
      error: 'Search failed'
    }, { status: 500 })
  }
}
