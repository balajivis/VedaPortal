#!/usr/bin/env node
/* =========================================================================
   Vedic metre classifier — Stage 2b.

   Counts syllables in the accented Devanagari samhita text and classifies
   each rc by Vedic chandas, then compares the result against the
   Anukramani's OWN stated chandas for that verse.

   WHY COUNTING, NOT PATTERN-MATCHING. Classical vrtta is identified by a
   guru/laghu PATTERN (GGGLGLG…) matched against a table of named metres.
   Vedic chandas is not that: it is defined by SYLLABLE COUNT per pada —
   Gayatri 3x8, Anustubh 4x8, Tristubh 4x11, Jagati 4x12. So a classical
   metre identifier (e.g. shreevatsa/sanskrit, whose tables carry zero
   entries for any of these) answers a different question. This is
   deterministic arithmetic.

   ⭐ THE POINT IS THE DISAGREEMENT. The Anukramani is an INDEPENDENT
   witness — the tradition's own metre ascription, made by people who had
   the recitation. Where the count disagrees with it, that is a FINDINGS
   LIST, not a bug list: it may be our syllable rule, a textual variant, or
   a genuine crux the tradition itself smoothed. Nobody has run this
   comparison over the whole Rgveda.

     node scripts/classify-metre.mjs [--limit N]
   ========================================================================= */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const TXT = 'sources/vedas/rigveda/shakala/samhita/text'
const ANU = 'sources/vedas/rigveda/shakala/apparatus/anukramani'
const OUT = 'sources/vedas/rigveda/shakala/apparatus/metre'

/* ---------------------------------------------------------- syllabifier */

const VIRAMA = '्'
const IND_VOWEL = /[ऄ-औॠॡ]/
const CONSONANT = /[क-हक़-य़ॹ-ॿ]/

/** Strip everything that is not syllable-bearing.
 *  Accents (U+0951/0952 and the Vedic Extensions) are TONE, not syllables.
 *  Anusvara, candrabindu, visarga and avagraha are not nuclei either. */
function clean(s) {
  return s
    .replace(/[॒॑᳐-᳿]/g, '')   // svara
    .replace(/[ऀ-ः़्॑-॔]/g, m => (m === VIRAMA ? m : ''))
    .replace(/[ऽ।॥]/g, ' ')          // avagraha, dandas
    .replace(/[0-9०-९]/g, ' ')            // pluti / verse numerals
    .replace(/\s+/g, ' ')
    .trim()
}

/** Syllable count. In Devanagari every akshara carries a vowel UNLESS a
 *  virama kills it, so: independent vowels + consonants not followed by
 *  virama. Matras attach to a consonant already counted. */
export function syllables(text) {
  const s = clean(text)
  let n = 0
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (IND_VOWEL.test(ch)) { n++; continue }
    if (CONSONANT.test(ch)) {
      if (s[i + 1] !== VIRAMA) n++
    }
  }
  return n
}

/* ------------------------------------------------------------- classifier */
/* Vedic chandas by TOTAL syllables. The pada structure is given for the
   record; classification here is on the total, which is how the tradition's
   own names are defined. */
const METRES = [
  { name: 'gāyatrī',   total: 24, padas: '3×8' },
  { name: 'uṣṇih',     total: 28, padas: '8+8+12' },
  { name: 'anuṣṭubh',  total: 32, padas: '4×8' },
  { name: 'bṛhatī',    total: 36, padas: '8+8+12+8' },
  { name: 'paṅkti',    total: 40, padas: '5×8' },
  { name: 'triṣṭubh',  total: 44, padas: '4×11' },
  { name: 'jagatī',    total: 48, padas: '4×12' },
]

export function classify(n) {
  const exact = METRES.find(m => m.total === n)
  if (exact) return { name: exact.name, exact: true, delta: 0 }
  // Vedic padas run short or long by a syllable fairly often; report the
  // nearest metre AND the deviation rather than forcing or refusing.
  let best = null
  for (const m of METRES) {
    const d = Math.abs(m.total - n)
    if (!best || d < best.d) best = { m, d }
  }
  return { name: best.m.name, exact: false, delta: n - best.m.total }
}

/* ------------------------------------------- the Anukramani's own ascription */
function splitTop(s, sep) {
  const out = []; let depth = 0, cur = ''
  for (const ch of s) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === sep && depth === 0) { out.push(cur); cur = '' } else cur += ch
  }
  out.push(cur); return out.filter(Boolean)
}
function inRange(range, v) {
  return range.split(',').some(p => {
    const [a, b] = p.split('-').map(Number)
    return b === undefined ? a === v : v >= a && v <= b
  })
}
function statedChandas() {
  const map = new Map()
  for (let m = 1; m <= 10; m++) {
    const lines = readFileSync(join(ANU, `Mandala_${m}.txt`), 'utf8')
      .split('\n').map(l => l.trim()).filter(Boolean)
    const rows = /^[0-9]/.test(lines[0]) ? lines : lines.slice(1)
    for (const line of rows) {
      const p = line.split('.')
      const sukta = Number(p[0]); const verses = Number(p[1])
      // rsi.devata.chandas, paren-aware
      const rest = p.slice(2).join('.')
      const parts = []; let depth = 0, cur = ''
      for (const ch of rest) {
        if (ch === '(') depth++; else if (ch === ')') depth--
        if (ch === '.' && depth === 0) { parts.push(cur); cur = '' } else cur += ch
      }
      parts.push(cur)
      const chRaw = (parts.length >= 3 ? parts.slice(2).join('.') : parts[1]) ?? ''
      const spans = splitTop(chRaw, ',').map(seg => {
        const mm = seg.match(/^\s*\(([^)]*)\)\s*(.*)$/)
        return mm ? { range: mm[1], name: mm[2].trim() } : { range: null, name: seg.trim() }
      }).filter(x => x.name)
      for (let v = 1; v <= verses; v++) {
        const hit = spans.find(x => !x.range || inRange(x.range, v)) ?? spans[0]
        if (hit) map.set(`${m}.${sukta}.${v}`, hit.name)
      }
    }
  }
  return map
}

/* ------------------------------------------------------------------- run */
const stated = statedChandas()
const rows = []
for (let m = 1; m <= 10; m++) {
  const j = JSON.parse(readFileSync(join(TXT, `mandala-${m}.json`), 'utf8'))
  for (const [s, verses] of Object.entries(j)) {
    verses.forEach((text, i) => {
      const v = i + 1
      const n = syllables(text)
      const c = classify(n)
      const said = (stated.get(`${m}.${s}.${v}`) ?? '').replace(/ī$/, 'ī')
      rows.push({ ref: `${m}.${s}.${v}`, syllables: n, computed: c.name, exact: c.exact, delta: c.delta, stated: said })
    })
  }
}

/* The Anukramani writes metre names in PAUSA form — triṣṭup for triṣṭubh,
   anuṣṭup for anuṣṭubh, uṣṇik for uṣṇih, paṅktiḥ for paṅkti. Those are the
   same metre, and counting them as disagreements manufactured ~3,400 false
   ones on the first run. */
const CANON = new Map(Object.entries({
  triṣṭup: 'triṣṭubh', triṣṭubh: 'triṣṭubh',
  anuṣṭup: 'anuṣṭubh', anuṣṭubh: 'anuṣṭubh',
  uṣṇik: 'uṣṇih', uṣṇih: 'uṣṇih',
  paṅktiḥ: 'paṅkti', paṅkti: 'paṅkti',
  jagatiī: 'jagatī', jagatī: 'jagatī',
  gāyatrī: 'gāyatrī', bṛhatī: 'bṛhatī',
}))
const norm = x => CANON.get(String(x).trim()) ?? String(x).trim()

/* ⚠ pragātha is NOT a syllable count — it is a STROPHIC form, a
   Bṛhatī+Satobṛhatī pair. It cannot agree or disagree with a syllable
   classifier, so it is excluded from the comparison rather than scored as
   a failure. Same for any compound/mixed ascription. */
const STROPHIC = /pragātha|strophic/i
const comparable = rows.filter(r => r.stated && !STROPHIC.test(r.stated) && CANON.has(r.stated.trim()))

const agree = comparable.filter(r => norm(r.computed) === norm(r.stated))
const disagree = comparable.filter(r => norm(r.computed) !== norm(r.stated))
const exact = rows.filter(r => r.exact)

/* Tolerance banding. The samhita-patha as transmitted is metrically SHORT
   in thousands of places — vowels written as contracted must be restored to
   scan. That is exactly why van Nooten & Holland produced a metrically
   restored edition. So a -1/-2 residue is expected and is itself the
   finding, not an error. */
const band = n => rows.filter(r => Math.abs(r.delta) === n).length
console.log(`  verses classified        : ${rows.length}`)
console.log(`  exact syllable match     : ${exact.length}  (${(exact.length / rows.length * 100).toFixed(1)}%)`)
console.log(`  within ±1 syllable       : ${exact.length + band(1)}  (${((exact.length + band(1)) / rows.length * 100).toFixed(1)}%)`)
console.log(`  within ±2 syllables      : ${exact.length + band(1) + band(2)}  (${((exact.length + band(1) + band(2)) / rows.length * 100).toFixed(1)}%)`)
console.log(`  comparable to Anukramaṇī : ${comparable.length}  (strophic/compound ascriptions excluded: ${rows.length - comparable.length})`)
console.log(`  AGREE with Anukramaṇī    : ${agree.length}  (${(agree.length / comparable.length * 100).toFixed(1)}%)`)
console.log(`  disagree                 : ${disagree.length}`)

const byPair = new Map()
for (const r of disagree) {
  const k = `${r.stated} → ${r.computed}`
  byPair.set(k, (byPair.get(k) ?? 0) + 1)
}
console.log('\n  top disagreement pairs (stated → computed):')
for (const [k, n] of [...byPair].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`      ${String(n).padStart(5)}  ${k}`)
}

/* Per-maṇḍala metre statistics — Running Notes T12, computed rather than cited. */
console.log('\n  per-maṇḍala metre distribution (computed):')
for (let m = 1; m <= 10; m++) {
  const mine = rows.filter(r => r.ref.startsWith(`${m}.`))
  const c = new Map()
  for (const r of mine) c.set(r.computed, (c.get(r.computed) ?? 0) + 1)
  const top = [...c].sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([k, n]) => `${k} ${(n / mine.length * 100).toFixed(0)}%`).join('  ')
  console.log(`      M${String(m).padStart(2)}  ${top}`)
}

mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'metre.json'), JSON.stringify(rows), 'utf8')
writeFileSync(join(OUT, 'DISAGREEMENTS.json'), JSON.stringify(disagree, null, 1), 'utf8')
console.log(`\n  ✓ wrote ${OUT}/metre.json and DISAGREEMENTS.json`)
