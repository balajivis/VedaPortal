#!/usr/bin/env node
/* =========================================================================
   Wilson's English Rgveda, from wisdomlib.

   WHY WILSON. He translates FOLLOWING SAYANA throughout — so this is the
   traditional reading in English, not another Victorian rendering. It is
   the text wisdomlib itself runs on, and the sweep flagged it as "THE
   CROSS-CHECK ON SAYANA, AND IT IS FULLY OPEN".

   WHY NOT THE LOCAL SCANS. sources/_fetched/rv-wilson-english holds all six
   volumes, but they are ordered by ASTAKA, not mandala, and OCR recovers
   only 792 of 1028 hymn boundaries. Sequential alignment needs EVERY
   boundary — one miss shifts every hymn after it — so 77% is unusable.
   wisdomlib has already solved that mapping.

   ADDRESSING. Doc ids are globally sequential in verse order, with one
   header page before each sukta's verses:

       doc837806 = "Sukta 63"      (header)
       doc837807 = RV 9.63.1
       ...

   So every id is computable from the Anukramani's verse counts. Verified
   against a probe at the 9.62/9.63 boundary — which also corrected an
   arithmetic slip of mine: RV 9.62 has 30 verses, not 29.

   ETIQUETTE. robots.txt permits /hinduism/book/ and sets no crawl-delay;
   this still paces itself, identifies itself, and resumes from cache so a
   re-run costs nothing. Wilson 1850-88 is public domain. Attribution to
   wisdomlib is written into PROVENANCE.md regardless.

     node scripts/ingest-rv-wilson.mjs --anchor            # find the anchor id
     node scripts/ingest-rv-wilson.mjs --range 9.62 9.63   # verify a slice
     node scripts/ingest-rv-wilson.mjs                     # full run
   ========================================================================= */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'sources/vedas/rigveda/shakala/samhita/translations'
const CACHE = '/tmp/wilson-cache'
const ANU = 'sources/vedas/rigveda/shakala/apparatus/anukramani'
const UA = 'VedaPortal/0.1 (research; github.com/balajivis/VedaPortal)'
const DELAY_MS = 900

/* Anchor: doc837806 is the Sukta-63 header of mandala 9. */
const ANCHOR = { doc: 837806, m: 9, s: 63 }

function counts() {
  const c = []
  for (let m = 1; m <= 10; m++) {
    const lines = readFileSync(join(ANU, `Mandala_${m}.txt`), 'utf8')
      .split('\n').map(l => l.trim()).filter(Boolean)
    for (const line of (/^[0-9]/.test(lines[0]) ? lines : lines.slice(1))) {
      const p = line.split('.')
      c.push({ m, s: Number(p[0]), verses: Number(p[1]) })
    }
  }
  return c
}

/* Each sukta consumes 1 header + N verse ids. Walk outward from the anchor. */
function buildIds() {
  const all = counts()
  const i = all.findIndex(x => x.m === ANCHOR.m && x.s === ANCHOR.s)
  if (i < 0) throw new Error('anchor sukta not in the Anukramani')
  // Each sukta costs 1 header + N verse pages. AND each MANDALA costs one
  // more header page of its own. Missing that drifted the map by exactly the
  // number of mandala boundaries crossed — 8 going back from M9 to M1, 1
  // going forward to M10 — which is how it was caught.
  const ids = new Map()
  let doc = ANCHOR.doc
  for (let k = i; k < all.length; k++) {
    const h = all[k]
    if (k > i && h.m !== all[k - 1].m) doc += 1        // new mandala header
    for (let v = 1; v <= h.verses; v++) ids.set(`${h.m}.${h.s}.${v}`, doc + v)
    doc += h.verses + 1
  }
  doc = ANCHOR.doc
  for (let k = i - 1; k >= 0; k--) {
    const h = all[k]
    doc -= h.verses + 1
    if (h.m !== all[k + 1].m) doc -= 1                 // crossed a mandala start
    for (let v = 1; v <= h.verses; v++) ids.set(`${h.m}.${h.s}.${v}`, doc + v)
  }
  return ids
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function page(id) {
  const f = join(CACHE, `${id}.html`)
  if (existsSync(f)) return readFileSync(f, 'utf8')
  const url = `https://www.wisdomlib.org/hinduism/book/rig-veda-english-translation/d/doc${id}.html`
  const res = await fetch(url, { headers: { 'user-agent': UA } })
  const html = await res.text()
  mkdirSync(CACHE, { recursive: true })
  writeFileSync(f, html)
  await sleep(DELAY_MS)
  return html
}

/* The translation sits between "English translation:" and "Details:". */
function extract(html) {
  const t = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
  const lines = t.split('\n').map(l => l.trim()).filter(Boolean)
  const i = lines.findIndex(l => /^English translation:?$/i.test(l))
  if (i < 0) return null
  const out = []
  for (let k = i + 1; k < lines.length; k++) {
    if (/^(Details|Ṛṣi|Rishi|Sanskrit text|\[Rigveda)/i.test(lines[k])) break
    out.push(lines[k])
  }
  const s = out.join(' ').replace(/\s+/g, ' ').replace(/^[“"]|[”"]$/g, '').trim()
  return s || null
}

const ids = buildIds()

if (process.argv.includes('--anchor')) {
  for (const r of ['9.62.30', '9.63.1', '1.1.1', '10.191.4']) console.log(`  ${r} -> doc${ids.get(r)}`)
  process.exit(0)
}

const ri = process.argv.indexOf('--range')
const wanted = ri > 0
  ? [...ids.keys()].filter(k => { const p = k.split('.'); const ref = `${p[0]}.${p[1]}`
      return ref === process.argv[ri + 1] || ref === process.argv[ri + 2] })
  : [...ids.keys()]

console.log(`  fetching ${wanted.length} verses (cache: ${CACHE}, ${DELAY_MS}ms pacing)`)
const got = new Map()
let fail = 0, n = 0
for (const ref of wanted) {
  const text = extract(await page(ids.get(ref)))
  if (text) got.set(ref, text); else fail++
  if (++n % 250 === 0) console.log(`    ${n}/${wanted.length}  ok=${got.size} fail=${fail}`)
}
console.log(`  retrieved : ${got.size}`)
console.log(`  failed    : ${fail}`)

if (ri > 0) {
  for (const [k, v] of [...got].slice(0, 3)) console.log(`    ${k}: ${v.slice(0, 110)}`)
  process.exit(0)
}

mkdirSync(OUT, { recursive: true })
for (let m = 1; m <= 10; m++) {
  const o = {}
  for (const [ref, text] of got) {
    const [a, s, v] = ref.split('.').map(Number)
    if (a === m) ((o[s] ??= []))[v - 1] = text
  }
  writeFileSync(join(OUT, `wilson-mandala-${m}.json`), JSON.stringify(o), 'utf8')
}
console.log(`  ✓ wrote ${OUT}/wilson-mandala-{1..10}.json`)
