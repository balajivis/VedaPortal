#!/usr/bin/env node
/**
 * Contested-node tripwire.
 *
 * "Contested" is a FINDING, not a fallback. The genuinely contested hinge
 * facts number ~5-6 corpus-wide (Sarasvati, soma, the horse, Vedic geography,
 * Indus script, Rgveda dating). Once a controversies panel exists, everything
 * drifts into it — flagging is easier than resolving. This script is the
 * guard: if the contested count climbs past the tripwire, that is not the
 * world being complicated; that is the team getting lazy.
 *
 * Scans tier declarations in sources/**\/_status.yaml and content/*.ts.
 *   > SOFT_LIMIT (6)  → warn
 *   > HARD_LIMIT (12) → exit 1 (fails CI)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SOFT_LIMIT = 6
const HARD_LIMIT = 12

const SCAN_DIRS = ['sources', 'content']
const SCAN_EXT = ['.yaml', '.yml', '.ts', '.tsx', '.json', '.md']

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.git')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, files)
    else if (SCAN_EXT.some((e) => entry.endsWith(e))) files.push(full)
  }
  return files
}

// Structural parse of a known field format (tier: contested / CONTESTED),
// yaml or ts/json — not content classification.
const TIER_PATTERN = /tier\s*[:=]\s*['"`]?(contested|NodeTier\.CONTESTED|CONTESTED)['"`]?/gi

const hits = []
for (const dir of SCAN_DIRS) {
  let files = []
  try {
    files = walk(join(ROOT, dir))
  } catch {
    continue
  }
  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    const lines = text.split('\n')
    lines.forEach((line, i) => {
      if (new RegExp(TIER_PATTERN.source, 'i').test(line)) {
        hits.push({ file: relative(ROOT, file), line: i + 1, text: line.trim() })
      }
    })
  }
}

console.log(`Contested-node tripwire — ${hits.length} contested tier declaration(s) found`)
for (const h of hits) console.log(`  ${h.file}:${h.line}  ${h.text}`)

if (hits.length > HARD_LIMIT) {
  console.error(
    `\n✗ TRIPWIRE: ${hits.length} contested nodes exceeds the hard limit of ${HARD_LIMIT}.` +
      `\n  Contested is EARNED by evidence, not assumed to avoid research.` +
      `\n  Resolve nodes back to settled/multi_traditional, or make the case for why` +
      `\n  a genuinely new hinge fact exists (and raise the limit in this script with review).`
  )
  process.exit(1)
} else if (hits.length > SOFT_LIMIT) {
  console.warn(
    `\n⚠ ${hits.length} contested nodes is above the expected ~${SOFT_LIMIT}. Watch the drift.`
  )
} else {
  console.log(`\n✓ Within bounds (soft ${SOFT_LIMIT}, hard ${HARD_LIMIT}).`)
}
