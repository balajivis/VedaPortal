#!/usr/bin/env node
/**
 * Tavily search — FALLBACK ONLY.
 *
 * Exhaust the native web search first. This exists for the cases native search
 * handles badly: deep catalogue pages, non-English institutional sites, and
 * queries where you need raw page content rather than a summary.
 *
 *   node scripts/tavily-search.mjs "Jaiminiya Samhita manuscript catalogue"
 *   node scripts/tavily-search.mjs --depth advanced --max 10 "NGMCP Vedic"
 *   node scripts/tavily-search.mjs --raw "Kathaka Samhita accented edition"
 *
 * Reads TAVILY_API_KEY from .env (gitignored). Never print the key.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname

function loadKey() {
  if (process.env.TAVILY_API_KEY) return process.env.TAVILY_API_KEY
  try {
    const env = readFileSync(join(ROOT, '.env'), 'utf8')
    const m = env.match(/^TAVILY_API_KEY=(.+)$/m)
    if (m) return m[1].trim()
  } catch {}
  return null
}

const args = process.argv.slice(2)
let depth = 'basic'
let max = 5
let raw = false
const terms = []

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--depth') depth = args[++i]
  else if (args[i] === '--max') max = Number(args[++i])
  else if (args[i] === '--raw') raw = true
  else terms.push(args[i])
}

const query = terms.join(' ').trim()
if (!query) {
  console.error('usage: tavily-search.mjs [--depth basic|advanced] [--max N] [--raw] "query"')
  process.exit(2)
}

const key = loadKey()
if (!key) {
  console.error('TAVILY_API_KEY not found in env or .env — use native web search instead.')
  process.exit(3)
}

const res = await fetch('https://api.tavily.com/search', {
  method: 'POST',
  headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
  body: JSON.stringify({
    query,
    search_depth: depth,
    max_results: max,
    include_raw_content: raw,
    include_answer: false, // we want sources, not a synthesised answer
  }),
})

if (!res.ok) {
  console.error(`Tavily HTTP ${res.status} — ${res.statusText}`)
  process.exit(4)
}

const data = await res.json()
for (const r of data.results ?? []) {
  console.log(`\n── ${r.title}\n   ${r.url}`)
  if (r.content) console.log(`   ${r.content.replace(/\s+/g, ' ').slice(0, 400)}`)
  if (raw && r.raw_content) console.log(`\n   --- raw ---\n${r.raw_content.slice(0, 4000)}`)
}
console.log(`\n(${(data.results ?? []).length} results)`)
