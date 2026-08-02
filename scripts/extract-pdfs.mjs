/**
 * Extract text from PDF files and create chunks for vector search
 * Run with: node scripts/extract-pdfs.mjs
 */

import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const SOURCES_DIR = './sources'
const OUTPUT_FILE = './data/chunks.json'
const CHUNK_SIZE = 500 // characters per chunk
const CHUNK_OVERLAP = 100 // overlap between chunks

/** Known-unusable text layers — excluded from the index by name.
 *  'Entire Rig Veda Samhita.pdf' is the Kashyap/SAKSI edition in a legacy 8-bit DV-Sanskrit
 *  font. pdftotext returns Latin-range bytes, so its 545 chunks were pure mojibake
 *  ('@\u00d2M\u00a5\u2026\u2030n\u02d8 \u2211\u2026\u2206 \u03a9\u02dbi\u2026\u2026'). The file is also gitignored and superseded by the
 *  accented sanskritdocuments RV. Remove an entry here only after re-measuring the text layer. */
const SKIP_FILES = new Set([
  'Entire Rig Veda Samhita.pdf',
])

// Category mapping based on folder structure
const LAYER_LABEL = {
  samhita: 'Samhita', brahmana: 'Brahmana', aranyaka: 'Aranyaka',
  upanishad: 'Upanishad', apparatus: 'Apparatus',
}

/**
 * The corpus is SAKHA-FIRST:
 *     vedas/<veda>/<shakha>/<layer>/
 *     vedas/yajurveda/<krishna|shukla>/<shakha>/<layer>/   <- one level deeper
 *
 * Krishna/Shukla is an organisational tier ABOVE shakha and exists for the Yajurveda only, so
 * the layer index is NOT constant across the tree. The previous map keyed on 'vedas/samhita'
 * etc., which stopped matching at the July restructure — every Vedic chunk has been filed as
 * 'Vedas > General' since, and Yajurveda could never be classified at all.
 */
function getCategory(filePath) {
  const rel = path.relative(SOURCES_DIR, filePath)
  const p = path.dirname(rel).split(path.sep)

  if (p[0] === 'vedas') {
    if (p[1] === '_reference') return { category: 'Vedas', subcategory: 'Reference' }
    const isYajur = p[1] === 'yajurveda'
    const shakha = isYajur ? p[3] : p[2]
    const layer = isYajur ? p[4] : p[3]
    if (!shakha) return { category: 'Vedas', subcategory: 'General' }
    const cap = shakha.charAt(0).toUpperCase() + shakha.slice(1)
    return { category: 'Vedas', subcategory: layer ? `${cap} · ${LAYER_LABEL[layer] || layer}` : cap }
  }
  if (p[0] === 'smriti') return { category: 'Smriti', subcategory: 'Itihasa & Purana' }
  if (p[0] === 'shlokas') return { category: 'Shlokas', subcategory: 'Stotras' }
  if (p[0] === 'unorganised-collection') return { category: 'Other', subcategory: 'Unattributed' }
  return { category: 'Other', subcategory: 'Uncategorized' }
}

function cleanText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim()
}

function createChunks(text, metadata) {
  const chunks = []
  const sentences = text.split(/(?<=[.!?।॥])\s+/)

  let currentChunk = ''
  let chunkIndex = 0

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > CHUNK_SIZE && currentChunk.length > 0) {
      chunks.push({
        id: `${metadata.id}-${chunkIndex}`,
        text: currentChunk.trim(),
        ...metadata,
        chunkIndex
      })

      // Keep overlap
      const words = currentChunk.split(' ')
      const overlapWords = words.slice(-Math.floor(words.length * 0.2))
      currentChunk = overlapWords.join(' ') + ' ' + sentence
      chunkIndex++
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence
    }
  }

  // Add remaining chunk
  if (currentChunk.trim()) {
    chunks.push({
      id: `${metadata.id}-${chunkIndex}`,
      text: currentChunk.trim(),
      ...metadata,
      chunkIndex
    })
  }

  return chunks
}

async function extractPdf(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const parser = new PDFParse({ data: dataBuffer })
    await parser.load()
    const result = await parser.getText()
    await parser.destroy()

    // Combine text from all pages
    const fullText = result.pages.map(p => p.text).join('\n')
    return cleanText(fullText)
  } catch (error) {
    console.error(`Error extracting ${filePath}:`, error.message)
    return ''
  }
}

async function processAllPdfs() {
  const allChunks = []

  function walkDir(dir) {
    const files = fs.readdirSync(dir)
    const pdfFiles = []

    for (const file of files) {
      // `_fetched/` holds gigabytes of acquisition payload — gitignored, largely image-only
      // scans and bad OCR. Indexing it would bury the curated corpus in noise and take hours.
      // It is summarised at /sources from the tracked manifest instead.
      // `_collection/` is packet staging (YAML findings), not corpus.
      if (file === '_fetched' || file === '_collection' || file.startsWith('.')) continue

      // Files whose text layer is known-unusable. Indexing them injects noise that looks like
      // content — you cannot spot mojibake in a search result, you only get bad hits.
      if (SKIP_FILES.has(file)) continue

      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        pdfFiles.push(...walkDir(filePath))
      } else if (file.toLowerCase().endsWith('.pdf')) {
        pdfFiles.push(filePath)
      }
    }

    return pdfFiles
  }

  const pdfFiles = walkDir(SOURCES_DIR)
  console.log(`Found ${pdfFiles.length} PDF files`)

  for (let i = 0; i < pdfFiles.length; i++) {
    const filePath = pdfFiles[i]
    const fileName = path.basename(filePath, '.pdf')
    const { category, subcategory } = getCategory(filePath)

    console.log(`[${i + 1}/${pdfFiles.length}] Processing: ${fileName}`)

    const text = await extractPdf(filePath)

    if (text.length > 100) { // Only process if we got meaningful content
      const metadata = {
        id: fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: fileName,
        source: path.relative(SOURCES_DIR, filePath),
        category,
        subcategory
      }

      const chunks = createChunks(text, metadata)
      console.log(`  Created ${chunks.length} chunks (${text.length} chars)`)
      allChunks.push(...chunks)
    } else {
      console.log(`  Skipped (no readable content)`)
    }
  }

  // Save chunks
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2))

  console.log(`\nTotal: ${allChunks.length} chunks saved to ${OUTPUT_FILE}`)

  // Print summary
  const byCategory = {}
  for (const chunk of allChunks) {
    const key = `${chunk.category} > ${chunk.subcategory}`
    byCategory[key] = (byCategory[key] || 0) + 1
  }
  console.log('\nChunks by category:')
  for (const [cat, count] of Object.entries(byCategory)) {
    console.log(`  ${cat}: ${count}`)
  }
}

processAllPdfs().catch(console.error)
