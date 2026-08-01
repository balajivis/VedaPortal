#!/usr/bin/env node
/* =========================================================================
   Ingest the accented Rgveda Samhita (Sakala) from sanskritdocuments.org.

   WHY THIS SOURCE. It is the clean accented Unicode witness located by the
   source sweep — measured at 4,678 svara marks per 30 pp sampled — and it
   is the replacement for the Kashyap/SAKSI PDF, which is on the do-not-
   ingest list and is RC4-encrypted besides.

   LICENCE. The mula text is an ancient composition in the public domain.
   Typesetting or encoding a public-domain text creates no new copyright
   (no US protection for typographic arrangement; Feist forecloses
   "sweat of the brow"; India has no published-edition right). The
   volunteers' encoding carries sanskritdocuments' personal-study notice,
   which is recorded as provenance, not honoured as a restriction on the
   text. Attribution is owed and is written into PROVENANCE.md regardless.

   THE CHECKSUM IS THE POINT. The Anukramani gives an independent
   per-hymn verse count for all 1,028 hymns, summing to 10,552. This
   script parses the text, then asserts every hymn against that count and
   REFUSES TO WRITE if any disagree. A silent miscount would corrupt every
   canonical address downstream, so a hard failure is the correct
   behaviour.

     node scripts/ingest-rv-samhita.mjs            # fetch + verify + write
     node scripts/ingest-rv-samhita.mjs --dry      # verify only
   ========================================================================= */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = 'sources/vedas/rigveda/shakala/samhita/text'
const CACHE = '/tmp/rv-src'
const BASE = 'https://sanskritdocuments.org/doc_veda'
const DRY = process.argv.includes('--dry')

const DEV_DIGITS = '०१२३४५६७८९'
const toArabic = s => s.replace(/[०-९]/g, d => String(DEV_DIGITS.indexOf(d)))

/* The verse terminator: "॥ ३.०५३.०१" — mandala.sukta.verse, zero-padded,
   in Devanagari numerals. Capture the address; everything since the last
   marker is the verse body. */
const ADDR = /॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)/g

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

async function source(m) {
  const file = join(CACHE, `r${String(m).padStart(2, '0')}.html`)
  if (existsSync(file)) return readFileSync(file, 'utf8')
  const url = `${BASE}/r${String(m).padStart(2, '0')}.html`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  const html = await res.text()
  mkdirSync(CACHE, { recursive: true })
  writeFileSync(file, html)
  return html
}

function parseMandala(html, m) {
  const text = stripTags(html)
  const verses = []
  let last = 0
  for (const match of text.matchAll(ADDR)) {
    const [full, dm, ds, dv] = match
    // Everything since the previous marker. For the FIRST verse of a file
    // that span also contains the page's nav chrome ("Home veda ITX
    // Devanagari PDF…"), so cut anything at or before the last Latin-script
    // character: real verse text contains none.
    const body = text
      .slice(last, match.index)
      .replace(/^[\s\S]*[A-Za-z][^\u0900-\u097F]*/, '')
      // …and the Devanagari page title that follows it: "ऋग्वेदः मण्डलं १"
      .replace(/^\s*ऋग्वेदः\s*मण्डलं\s*[०-९]+\s*/, '')
      .replace(/\s+/g, ' ')
      .trim()
    last = match.index + full.length
    const mm = Number(toArabic(dm))
    const ss = Number(toArabic(ds))
    const vv = Number(toArabic(dv))
    // Guard against stray markers from other mandalas on the same page.
    if (mm !== m) continue
    if (!body) continue
    verses.push({ m: mm, s: ss, v: vv, text: body })
  }
  return verses
}

/* ---- The Anukramani checksum, read straight from the mirrored files ---- */
function anukramaniCounts() {
  const dir = 'sources/vedas/rigveda/shakala/apparatus/anukramani'
  const counts = new Map()
  for (let m = 1; m <= 10; m++) {
    const lines = readFileSync(join(dir, `Mandala_${m}.txt`), 'utf8')
      .split('\n').map(l => l.trim()).filter(Boolean)
    const rows = /^[0-9]/.test(lines[0]) ? lines : lines.slice(1)
    for (const line of rows) {
      const p = line.split('.')
      counts.set(`${m}.${Number(p[0])}`, Number(p[1]))
    }
  }
  return counts
}

const expected = anukramaniCounts()
const all = []
for (let m = 1; m <= 10; m++) {
  const v = parseMandala(await source(m), m)
  console.log(`  mandala ${String(m).padStart(2)}: ${String(v.length).padStart(5)} verses`)
  all.push(...v)
}

console.log(`\n  parsed total: ${all.length}   anukramani total: ${[...expected.values()].reduce((a, b) => a + b, 0)}`)

/* ---- Verify per hymn. Any mismatch is fatal. ---- */
const got = new Map()
for (const r of all) got.set(`${r.m}.${r.s}`, (got.get(`${r.m}.${r.s}`) ?? 0) + 1)

const problems = []
for (const [ref, want] of expected) {
  const have = got.get(ref) ?? 0
  if (have !== want) problems.push({ ref, want, have })
}
for (const ref of got.keys()) if (!expected.has(ref)) problems.push({ ref, want: 0, have: got.get(ref) })

/* Accent coverage — the whole reason for choosing this source. */
const svara = all.reduce((a, r) => a + (r.text.match(/[॒॑]/g)?.length ?? 0), 0)
const noAccent = all.filter(r => !/[॒॑]/.test(r.text)).length
console.log(`  svara marks : ${svara}`)
console.log(`  verses with no accent at all: ${noAccent}`)

if (problems.length) {
  console.error(`\n  ✗ ${problems.length} hymn(s) disagree with the Anukramani. NOT WRITING.`)
  for (const p of problems.slice(0, 25)) {
    console.error(`      RV ${p.ref}: anukramani ${p.want}, parsed ${p.have}`)
  }
  if (problems.length > 25) console.error(`      … and ${problems.length - 25} more`)
  process.exit(1)
}
console.log('  ✓ every hymn matches the Anukramani verse count')

if (DRY) { console.log('\n  --dry: nothing written'); process.exit(0) }

mkdirSync(OUT_DIR, { recursive: true })
for (let m = 1; m <= 10; m++) {
  const rows = all.filter(r => r.m === m)
  const byHymn = {}
  for (const r of rows) (byHymn[r.s] ??= [])[r.v - 1] = r.text
  writeFileSync(join(OUT_DIR, `mandala-${m}.json`), JSON.stringify(byHymn), 'utf8')
}
writeFileSync(join(OUT_DIR, 'PROVENANCE.md'), `# Ṛgveda Saṃhitā — accented text

**Source.** sanskritdocuments.org \`doc_veda/r01\`–\`r10\`, encoded by sanskritdocuments
volunteers from ITRANS source. Accented Devanāgarī — the site describes the files as
"with anudātta and svarita vedic accents" and sampling confirms it.

**Licence.** The mūla text is public domain. Typesetting or encoding a public-domain text
creates no new copyright. The volunteers' encoding carries sanskritdocuments' personal-study
notice, recorded here as provenance rather than honoured as a restriction on the text.
**Attribution is owed regardless** — credit sanskritdocuments.org and its volunteer encoders.

This replaces \`Entire Rig Veda Samhita.pdf\` (ed. R. L. Kashyap, SAKSI), which is on the
do-not-ingest list and is RC4-encrypted.

**Verified on ingest (${new Date().toISOString().slice(0, 10)}).**

| Check | Result |
|---|---|
| Verses parsed | **${all.length} / 10,552** |
| Per-hymn counts vs Anukramaṇī | **all 1,028 hymns agree** |
| Svara marks | ${svara.toLocaleString()} |
| Verses carrying no accent | ${noAccent} |

The per-hymn check is the load-bearing one. The Anukramaṇī is an *independent* witness to
the verse count, so agreement across all 1,028 hymns means the text is aligned to canonical
addresses — not merely that it parsed.

**Format.** \`mandala-N.json\` = \`{ "<sukta>": ["<verse 1>", "<verse 2>", …] }\`, in
address order, accents intact.

Regenerate: \`node scripts/ingest-rv-samhita.mjs\`
`, 'utf8')

console.log(`\n  ✓ wrote ${OUT_DIR}/mandala-{1..10}.json + PROVENANCE.md`)
