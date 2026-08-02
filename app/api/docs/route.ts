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

const LAYER_LABEL: Record<string, string> = {
  samhita: 'Samhita',
  brahmana: 'Brahmana',
  aranyaka: 'Aranyaka',
  upanishad: 'Upanishad',
  apparatus: 'Apparatus',
}

/**
 * The corpus is ŚĀKHĀ-FIRST:
 *     vedas/<veda>/<shakha>/<layer>/file.pdf
 *     vedas/yajurveda/<krishna|shukla>/<shakha>/<layer>/file.pdf   ← one level deeper
 *
 * Kṛṣṇa/Śukla is an organisational tier ABOVE śākhā and exists for the Yajurveda only, so the
 * layer index is not constant across the tree. This previously read parts[1] as the layer, which
 * held only before the śākhā-first restructure — since then every Vedic file has been mis-filed,
 * and Yajurveda could not be classified at all.
 */
function getCategoryFromPath(filePath: string): { category: string; subcategory: string } {
  const parts = filePath.split('/')

  if (parts[0] === 'vedas') {
    if (parts[1] === '_reference') return { category: 'Vedas', subcategory: 'Reference' }
    const isYajur = parts[1] === 'yajurveda'
    const shakha = isYajur ? parts[3] : parts[2]
    const layer = isYajur ? parts[4] : parts[3]
    if (!shakha) return { category: 'Vedas', subcategory: 'General' }
    const cap = shakha.charAt(0).toUpperCase() + shakha.slice(1)
    // Śākhā is the meaningful unit — name it, and qualify by layer where we have one.
    return { category: 'Vedas', subcategory: layer ? `${cap} · ${LAYER_LABEL[layer] || layer}` : cap }
  }

  if (parts[0] === 'smriti') return { category: 'Smriti', subcategory: 'Itihasa & Purana' }
  if (parts[0] === 'shlokas') return { category: 'Shlokas', subcategory: 'Stotras' }
  if (parts[0] === 'unorganised-collection') return { category: 'Other', subcategory: 'Unattributed' }

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
    // `_fetched/` holds gigabytes of gitignored acquisition payload. It is summarised at
    // /sources from the tracked manifest — listing the files here would be misleading and slow.
    if (item === '_fetched' || item === '_collection') continue

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
