import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SOURCES_DIR = path.join(process.cwd(), 'sources')

interface DocInfo {
  name: string
  path: string
  category: string
  subcategory: string
  size: number
  sizeFormatted: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getCategoryFromPath(filePath: string): { category: string; subcategory: string } {
  const parts = filePath.split('/')

  if (parts[0] === 'vedas') {
    if (parts.length > 2) {
      const subcatMap: Record<string, string> = {
        'samhita': 'Samhita',
        'brahmana': 'Brahmana',
        'aranyaka': 'Aranyaka',
        'upanishad': 'Upanishad'
      }
      return { category: 'Vedas', subcategory: subcatMap[parts[1]] || 'General' }
    }
    return { category: 'Vedas', subcategory: 'General' }
  }

  if (parts[0] === 'smriti') {
    return { category: 'Smriti', subcategory: 'Itihasa & Purana' }
  }

  if (parts[0] === 'shlokas') {
    return { category: 'Shlokas', subcategory: 'Stotras' }
  }

  return { category: 'Other', subcategory: 'Uncategorized' }
}

function scanDirectory(dir: string, basePath: string = ''): DocInfo[] {
  const docs: DocInfo[] = []

  if (!fs.existsSync(dir)) {
    return docs
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    if (item.startsWith('.')) continue

    const fullPath = path.join(dir, item)
    const relativePath = basePath ? `${basePath}/${item}` : item
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      docs.push(...scanDirectory(fullPath, relativePath))
    } else if (item.toLowerCase().endsWith('.pdf')) {
      const { category, subcategory } = getCategoryFromPath(relativePath)
      docs.push({
        name: item.replace('.pdf', ''),
        path: relativePath,
        category,
        subcategory,
        size: stat.size,
        sizeFormatted: formatFileSize(stat.size)
      })
    }
  }

  return docs
}

export async function GET() {
  try {
    const docs = scanDirectory(SOURCES_DIR)

    // Group by category
    const byCategory: Record<string, DocInfo[]> = {}
    for (const doc of docs) {
      const key = `${doc.category} > ${doc.subcategory}`
      if (!byCategory[key]) {
        byCategory[key] = []
      }
      byCategory[key].push(doc)
    }

    return NextResponse.json({
      success: true,
      totalDocs: docs.length,
      totalSize: formatFileSize(docs.reduce((sum, d) => sum + d.size, 0)),
      docs,
      byCategory
    })
  } catch (error) {
    console.error('Error listing docs:', error)
    return NextResponse.json({ success: false, error: 'Failed to list documents' }, { status: 500 })
  }
}
