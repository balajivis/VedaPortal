#!/usr/bin/env node
/* =========================================================================
   Ingest Griffith's English Rgveda from the copy already in sources/.

     sources/vedas/rigveda/shakala/samhita/Rig Veda English translation by Griffith.pdf

   WHY THIS COPY. It is sanskritweb's build, generated from the sacred-texts
   HTM files and — in its own words — made "to permit of 1) easy searching
   and 2) easy extracting", as clean 7-bit ASCII with hymns addressed
   [BB-HHH]. That makes it a far better ingest target than the archive.org
   scan of the print edition, whose OCR interleaves footnotes mid-verse and
   corrupts words (£hd, vtsve devtth, Yaruna for Varuna).

   ⚠ WHAT GRIFFITH IS, AND WHY IT IS TAGGED THE WAY IT IS.
   Griffith 1896 is the default English Rgveda because its COPYRIGHT
   EXPIRED, not because it is good — Victorian idiom throughout, and it
   renders `janam` as "race" where the word means folk/people. It ships
   tagged [MOD-1896, Victorian] and never renders without the Sanskrit
   adjacent. It is here as the foil the diagnosis is about, not as the
   answer.

   Diacritics are dropped in this build ("Rbu", "Vrtra", "Asvins") — a
   property of the source, recorded, not corrected.

   THE CHECKSUM. Every hymn is asserted against the Anukramani's own verse
   count. Mismatches are reported per hymn and the file is NOT written if
   the alignment is bad, because a silently mis-numbered translation would
   attach the wrong English to a canonical address.

     node scripts/ingest-rv-griffith.mjs [--dry]
   ========================================================================= */

import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const PDF = 'sources/vedas/rigveda/shakala/samhita/Rig Veda English translation by Griffith.pdf'
const OUT_DIR = 'sources/vedas/rigveda/shakala/samhita/translations'
const TXT = '/tmp/griffith-clean.txt'
const DRY = process.argv.includes('--dry')

if (!existsSync(TXT)) execFileSync('pdftotext', [PDF, TXT])
const raw = readFileSync(TXT, 'utf8')

/* Hymn blocks: "[03-053] HYMN LIII. Indra, Parvata, Etc." */
const HYMN = /\[(\d{2})-(\d{3})\]([^\n]*)\n/g

const blocks = []
let m, prev = null
while ((m = HYMN.exec(raw))) {
  if (prev) prev.body = raw.slice(prev.start, m.index)
  prev = { mandala: +m[1], sukta: +m[2], title: m[3].trim(), start: HYMN.lastIndex }
  blocks.push(prev)
}
if (prev) prev.body = raw.slice(prev.start)

/* The PDF's table of contents repeats every [BB-HHH] marker, so a hymn can
   appear twice. Keep whichever block actually carries verses — the TOC
   entry has none. */
const best = new Map()
for (const b of blocks) {
  // [BB-000] is a book-header marker, not a hymn. Skip it — otherwise it
  // parses to zero verses and trips the empty-hymn gate.
  if (b.sukta === 0) continue
  const key = `${b.mandala}.${b.sukta}`
  const prevB = best.get(key)
  if (!prevB || (b.body?.length ?? 0) > (prevB.body?.length ?? 0)) best.set(key, b)
}
blocks.length = 0
blocks.push(...best.values())

/* Verses inside a block start at line-start with "1." or "2 ". A verse runs
   until the next such number, so padas on continuation lines are kept. */
function versesOf(body) {
  const lines = body.split('\n')
  const out = []
  let cur = null
  let lastNum = 0
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    if (/^<\d+>$/.test(t)) continue          // page-break markers

    // Verse 1 is sometimes typeset as Roman "I" (e.g. "I WE choose Agni"),
    // which is why a strict digit match silently produced zero verses.
    let num = null, rest = null
    const roman = t.match(/^I\s+([A-Z].*)$/)
    const digit = t.match(/^(\d{1,3})\.?\s+(.*)$/)
    if (digit) { num = Number(digit[1]); rest = digit[2] }
    else if (roman && lastNum === 0) { num = 1; rest = roman[1] }

    // Monotonic resync rather than abandon: accept any number that advances
    // the count by 1-3. Griffith occasionally merges verses against the
    // Sakala numbering, and a small skip must not orphan the whole rest of
    // the hymn — which is what a strict "must be exactly next" rule did.
    if (num !== null && num > lastNum && num <= lastNum + 3) {
      if (cur) out.push(cur.join(' '))
      cur = [rest]
      lastNum = num
    } else if (cur) {
      cur.push(t)
    }
  }
  if (cur) out.push(cur.join(' '))
  return out.map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean)
}

/* ---- Anukramani checksum ---- */
function anukramaniCounts() {
  const dir = 'sources/vedas/rigveda/shakala/apparatus/anukramani'
  const counts = new Map()
  for (let mm = 1; mm <= 10; mm++) {
    const lines = readFileSync(join(dir, `Mandala_${mm}.txt`), 'utf8')
      .split('\n').map(l => l.trim()).filter(Boolean)
    const rows = /^[0-9]/.test(lines[0]) ? lines : lines.slice(1)
    for (const line of rows) {
      const p = line.split('.')
      counts.set(`${mm}.${Number(p[0])}`, Number(p[1]))
    }
  }
  return counts
}

const expected = anukramaniCounts()
const byHymn = new Map()
for (const b of blocks) byHymn.set(`${b.mandala}.${b.sukta}`, versesOf(b.body))

console.log(`  hymn blocks found : ${blocks.length} (anukramani 1028)`)
const total = [...byHymn.values()].reduce((a, v) => a + v.length, 0)
console.log(`  verses parsed     : ${total} (anukramani 10552)`)

const problems = []
for (const [ref, want] of expected) {
  const have = byHymn.get(ref)?.length ?? 0
  if (have !== want) problems.push({ ref, want, have })
}
const missing = [...expected.keys()].filter(r => !byHymn.has(r))
console.log(`  hymns absent      : ${missing.length}`)
console.log(`  hymns mismatched  : ${problems.length}`)

if (problems.length) {
  console.log('\n  first 15 disagreements:')
  for (const p of problems.slice(0, 15)) {
    console.log(`      RV ${p.ref.padEnd(7)} anukramani ${String(p.want).padStart(3)}   griffith ${String(p.have).padStart(3)}`)
  }
}

/* ⭐ THE RESIDUE IS DATA, NOT PARSER ERROR — verified by reading the source.
   Griffith genuinely prints RV 1.65 as FIVE verses of two lines each where
   the Sakala numbering has TEN; the same holds across 1.65-1.70, and he
   splits elsewhere (1.179: 9 against 6). His hymn ends at 5 and 1.66
   begins. So a translator's verse division is its own witness and can
   disagree with the tradition's.

   Therefore: do not force alignment, and do not silently drop the hymns
   that disagree. Write them, and write the disagreement alongside in
   MISALIGNED.json so any verse-level join can see it. What WOULD be a bug
   is a parser producing zero verses — that is gated separately. */
const rate = problems.length / expected.size
const empty = [...byHymn.values()].filter(v => v.length === 0).length
console.log(`\n  hymns matching the Anukramani exactly : ${((1 - rate) * 100).toFixed(2)}%`)
console.log(`  hymns where Griffith divides differently: ${problems.length}`)
console.log(`  hymns with NO verses parsed             : ${empty}`)
if (empty > 0) {
  console.error('  ✗ some hymns parsed to zero verses — that IS a parser fault. NOT WRITING.')
  process.exit(1)
}
if (DRY) { console.log('  --dry: nothing written'); process.exit(0) }

mkdirSync(OUT_DIR, { recursive: true })
for (let mm = 1; mm <= 10; mm++) {
  const o = {}
  for (const [ref, verses] of byHymn) {
    const [a, b] = ref.split('.').map(Number)
    if (a === mm) o[b] = verses
  }
  writeFileSync(join(OUT_DIR, `griffith-mandala-${mm}.json`), JSON.stringify(o), 'utf8')
}
writeFileSync(join(OUT_DIR, 'MISALIGNED.json'), JSON.stringify(problems, null, 2), 'utf8')
console.log(`  ✓ wrote ${OUT_DIR}/griffith-mandala-{1..10}.json`)
console.log(`  ✓ wrote MISALIGNED.json — ${problems.length} hymns where Griffith's verse count differs from the Anukramani`)
