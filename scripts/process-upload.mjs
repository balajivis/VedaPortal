#!/usr/bin/env node
/**
 * Process an uploaded PDF file - extract text, chunk, and add to index
 * Usage: node scripts/process-upload.mjs <pdf-path> <category> <subcategory>
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get directory of this script
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, '..')

const CHUNKS_FILE = path.join(ROOT_DIR, 'data', 'chunks.json')

function cleanText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[^\S\n]+/g, ' ')
    .trim()
}

function chunkText(text, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/)
  const chunks = []

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ')
    if (chunk.length > 50) {
      chunks.push(chunk)
    }
  }

  return chunks
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function processUpload(pdfPath, category, subcategory) {
  console.log(`Processing: ${pdfPath}`)

  if (!fs.existsSync(pdfPath)) {
    console.log(JSON.stringify({ success: false, error: 'File not found' }))
    process.exit(1)
  }

  const buffer = fs.readFileSync(pdfPath)
  const fileName = path.basename(pdfPath)
  const title = fileName.replace(/\.pdf$/i, '')
  const relativePath = `${category}/${subcategory}/${fileName}`

  // Extract text using pdf-parse
  let text = ''
  try {
    const { PDFParse } = await import('pdf-parse')
    const parser = new PDFParse({ data: buffer })
    await parser.load()
    const result = await parser.getText()
    await parser.destroy()
    // Combine text from all pages
    text = result.pages.map(p => p.text).join('\n')
    text = cleanText(text)
  } catch (err) {
    console.log(JSON.stringify({
      success: false,
      error: `Text extraction failed: ${err.message}`
    }))
    process.exit(1)
  }

  if (!text || text.length < 100) {
    console.log(JSON.stringify({
      success: false,
      error: 'No readable text found in PDF'
    }))
    process.exit(1)
  }

  console.log(`Extracted ${text.length} characters`)

  // Chunk the text
  const textChunks = chunkText(text)
  const newChunks = textChunks.map((chunkText, index) => ({
    id: slugify(title),
    text: chunkText,
    title,
    source: relativePath,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    subcategory: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
    chunkIndex: index
  }))

  console.log(`Created ${newChunks.length} chunks`)

  // Ensure data directory exists
  const dataDir = path.dirname(CHUNKS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Load existing chunks and append
  let existingChunks = []
  if (fs.existsSync(CHUNKS_FILE)) {
    existingChunks = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8'))
  }

  const allChunks = [...existingChunks, ...newChunks]
  fs.writeFileSync(CHUNKS_FILE, JSON.stringify(allChunks, null, 2))

  console.log(JSON.stringify({
    success: true,
    chunksAdded: newChunks.length,
    totalChunks: allChunks.length,
    textLength: text.length
  }))
}

// Get arguments
const args = process.argv.slice(2)
if (args.length < 3) {
  console.log('Usage: node process-upload.mjs <pdf-path> <category> <subcategory>')
  process.exit(1)
}

processUpload(args[0], args[1], args[2]).catch(err => {
  console.log(JSON.stringify({ success: false, error: err.message }))
  process.exit(1)
})
