/**
 * Build vector index from extracted chunks using transformers.js
 * Run with: node scripts/build-index.mjs
 */

import fs from 'fs'
import path from 'path'
import { pipeline } from '@xenova/transformers'

const CHUNKS_FILE = './data/chunks.json'
const INDEX_FILE = './data/vector-index.json'
const BATCH_SIZE = 10

// Use a small, fast embedding model
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2'

async function buildIndex() {
  // Load chunks
  if (!fs.existsSync(CHUNKS_FILE)) {
    console.error(`Chunks file not found: ${CHUNKS_FILE}`)
    console.error('Run extract-pdfs.mjs first')
    process.exit(1)
  }

  const chunks = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8'))
  console.log(`Loaded ${chunks.length} chunks`)

  // Initialize embedding model
  console.log(`Loading embedding model: ${MODEL_NAME}`)
  const embedder = await pipeline('feature-extraction', MODEL_NAME)
  console.log('Model loaded!')

  // Generate embeddings in batches
  const indexedChunks = []

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE)
    const progress = Math.round((i / chunks.length) * 100)
    process.stdout.write(`\rEmbedding: ${progress}% (${i}/${chunks.length})`)

    for (const chunk of batch) {
      try {
        // Truncate text if too long (model has max token limit)
        const text = chunk.text.slice(0, 512)

        // Generate embedding
        const output = await embedder(text, { pooling: 'mean', normalize: true })
        const embedding = Array.from(output.data)

        indexedChunks.push({
          ...chunk,
          embedding
        })
      } catch (error) {
        console.error(`\nError embedding chunk ${chunk.id}:`, error.message)
      }
    }
  }

  console.log(`\nGenerated ${indexedChunks.length} embeddings`)

  // Save index using stream to avoid memory issues with large JSON
  console.log('Writing index file...')
  const writeStream = fs.createWriteStream(INDEX_FILE)

  writeStream.write('{\n')
  writeStream.write(`  "model": "${MODEL_NAME}",\n`)
  writeStream.write(`  "dimensions": ${indexedChunks[0]?.embedding?.length || 384},\n`)
  writeStream.write(`  "count": ${indexedChunks.length},\n`)
  writeStream.write('  "chunks": [\n')

  for (let i = 0; i < indexedChunks.length; i++) {
    const chunk = indexedChunks[i]
    const isLast = i === indexedChunks.length - 1
    writeStream.write('    ' + JSON.stringify(chunk) + (isLast ? '\n' : ',\n'))

    if (i % 10000 === 0) {
      process.stdout.write(`\rWriting: ${Math.round((i / indexedChunks.length) * 100)}%`)
    }
  }

  writeStream.write('  ]\n')
  writeStream.write('}\n')
  writeStream.end()

  await new Promise((resolve) => writeStream.on('finish', resolve))
  console.log(`\nIndex saved to ${INDEX_FILE}`)

  // Show file size
  const stats = fs.statSync(INDEX_FILE)
  console.log(`Index size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
}

buildIndex().catch(console.error)
