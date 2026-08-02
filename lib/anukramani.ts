/* =========================================================================
   Anukramani loader — the navigation spine for the Rgveda.

   Source: sources/vedas/rigveda/shakala/apparatus/anukramani/ (WSC2023,
   Apache-2.0, mirrored and verified 2026-08-01 — 1028/1028 hymns,
   verse-sum 10552 exact).

   This is the ONLY machine-readable Anukramani of any Veda, so it is also
   the only thing that can give the portal a complete, honest navigation
   tree today: every hymn of the Rgveda is enumerable with its rsi, devata
   and chandas, whether or not we hold its text.

   PARSING TRAPS, both real and both documented in PROVENANCE.md:
     - Split on '.' with maxsplit=3. Devata and chandas fields carry
       parenthesised verse ranges that CONTAIN periods.
     - RV 8.31 omits the rsi field (4 fields, not 5).
   ========================================================================= */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(
  process.cwd(),
  'sources/vedas/rigveda/shakala/apparatus/anukramani'
)

/** Canonical hymn counts per mandala. Used to assert the parse, not to
 *  generate — if a file disagrees we want to know, not to paper over it. */
export const CANONICAL = [191, 43, 62, 58, 87, 75, 104, 103, 114, 191]

export type Hymn = {
  mandala: number
  sukta: number
  /** "3.53" */
  ref: string
  verses: number
  /** May be empty — RV 8.31 has no rsi field in the source. */
  rishi: string
  /** Raw field, ranges intact: "(1)indraparvatau,(2-14)indrah,…" */
  devataRaw: string
  chandasRaw: string
}

/** Strip the parenthesised verse ranges to get a display list of names.
 *
 *  Must split on commas at paren depth 0 only: a range like
 *  "(1-9,11,14-15,17)triṣṭup" carries commas INSIDE the parentheses, and a
 *  naive split shreds it into "(1-9", "11", "14-15"… */
export function names(raw: string): string[] {
  if (!raw) return []
  const parts: string[] = []
  let depth = 0, cur = ''
  for (const ch of raw) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === ',' && depth === 0) { parts.push(cur); cur = '' } else cur += ch
  }
  parts.push(cur)
  return parts.map(s => s.replace(/\([^)]*\)/g, '').trim()).filter(Boolean)
}

/** The same fields, but keeping each name paired with the verse range it
 *  governs — which is the data the apparatus actually needs when a deity or
 *  metre shifts mid-hymn. */
export function spans(raw: string): { range: string | null; name: string }[] {
  if (!raw) return []
  return splitTop(raw, ',').map(seg => {
    const m = seg.match(/^\s*\(([^)]*)\)\s*(.*)$/)
    return m ? { range: m[1], name: m[2].trim() } : { range: null, name: seg.trim() }
  }).filter(x => x.name)
}

function splitTop(s: string, sep: string): string[] {
  const out: string[] = []
  let depth = 0, cur = ''
  for (const ch of s) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === sep && depth === 0) { out.push(cur); cur = '' } else cur += ch
  }
  out.push(cur)
  return out.filter(Boolean)
}

/** True where a field carries per-verse ranges — i.e. the deity or metre
 *  SHIFTS mid-hymn, which is why HymnAscription is a join model and not
 *  three columns. */
export function shifts(raw: string): boolean {
  return /\([0-9]/.test(raw || '')
}

let CACHE: Hymn[] | null = null

export function allHymns(): Hymn[] {
  if (CACHE) return CACHE
  const out: Hymn[] = []
  for (let m = 1; m <= 10; m++) {
    const raw = readFileSync(join(DIR, `Mandala_${m}.txt`), 'utf8')
    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
    // first line is the header: hymn.verses.seer.divinity.meter
    const rows = lines[0]?.[0] && /[0-9]/.test(lines[0][0]) ? lines : lines.slice(1)
    for (const line of rows) {
      const p = line.split('.')
      const sukta = Number(p[0])
      const verses = Number(p[1])
      if (!Number.isFinite(sukta) || !Number.isFinite(verses)) continue
      // Rejoin from index 2 and re-split on the LAST two logical fields is
      // unsafe (periods inside ranges), so take field 2 as rsi and treat the
      // remainder as devata + chandas separated by the first '.' that is not
      // inside parentheses.
      const rest = p.slice(2).join('.')
      const { rishi, devataRaw, chandasRaw } = splitRest(rest)
      out.push({
        mandala: m, sukta, ref: `${m}.${sukta}`,
        verses, rishi, devataRaw, chandasRaw,
      })
    }
  }
  CACHE = out
  return out
}

/** Split "rsi.devata.chandas" where devata/chandas contain periods inside
 *  parentheses. Walks the string tracking paren depth. */
function splitRest(rest: string) {
  const parts: string[] = []
  let depth = 0, cur = ''
  for (const ch of rest) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === '.' && depth === 0) { parts.push(cur); cur = '' } else cur += ch
  }
  parts.push(cur)
  // RV 8.31 has no rsi: 4 fields not 5, so `rest` yields 2 parts not 3.
  if (parts.length >= 3) {
    return { rishi: parts[0].trim(), devataRaw: parts[1].trim(), chandasRaw: parts.slice(2).join('.').trim() }
  }
  return { rishi: '', devataRaw: (parts[0] ?? '').trim(), chandasRaw: (parts[1] ?? '').trim() }
}

export function mandala(m: number): Hymn[] {
  return allHymns().filter(h => h.mandala === m)
}

export function hymn(m: number, s: number): Hymn | undefined {
  return allHymns().find(h => h.mandala === m && h.sukta === s)
}

/** Prev/next across the WHOLE corpus, so navigation crosses mandala
 *  boundaries rather than dead-ending at 3.62 → nothing. */
export function neighbours(m: number, s: number) {
  const all = allHymns()
  const i = all.findIndex(h => h.mandala === m && h.sukta === s)
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  }
}

/** Verse-level neighbours within a hymn, spilling into the adjacent hymn at
 *  the edges. Verse counts come from the Anukramani's own column. */
export function verseNeighbours(m: number, s: number, v: number) {
  const h = hymn(m, s)
  if (!h) return { prev: null as string | null, next: null as string | null }
  const { prev: ph, next: nh } = neighbours(m, s)
  return {
    prev: v > 1 ? `${m}.${s}.${v - 1}` : ph ? `${ph.ref}.${ph.verses}` : null,
    next: v < h.verses ? `${m}.${s}.${v + 1}` : nh ? `${nh.ref}.1` : null,
  }
}

/** The per-mandala families, for the mandala index. Book-level lineage is
 *  not per-hymn authorship — even family books carry intrusive hymns — so
 *  this is a label, not a claim about every hymn inside. */
export const FAMILY: Record<number, string> = {
  1: 'many authors · late outer envelope',
  2: 'Gṛtsamada · family book',
  3: 'Viśvāmitra (Kuśika) · family book',
  4: 'Vāmadeva (Gautama) · family book',
  5: 'Atri · family book',
  6: 'Bharadvāja · family book — oldest core',
  7: 'Vasiṣṭha · family book — dāśarājña',
  8: 'mostly Kāṇva · hybrid',
  9: 'all families · Soma Pavamāna — filed by DEITY, not by poet',
  10: 'many authors · late outer envelope',
}

/** Which verses we actually hold text for. Everything else renders as
 *  `enumerated` — we know it exists, and that is the entire claim. */
export const HELD_VERSES = new Set<string>(['3.53.12'])

/* =========================================================================
   Samhita text — accented, from sources/.../samhita/text/
   Ingested and verified by scripts/ingest-rv-samhita.mjs: all 1,028 hymns
   agree with the Anukramani verse count, 175,308 svara marks, zero verses
   without accent.
   ========================================================================= */

const TEXT_DIR = join(process.cwd(), 'sources/vedas/rigveda/shakala/samhita/text')
const TEXT_CACHE = new Map<number, Record<string, string[]>>()

function mandalaText(m: number): Record<string, string[]> {
  let t = TEXT_CACHE.get(m)
  if (!t) {
    t = JSON.parse(readFileSync(join(TEXT_DIR, `mandala-${m}.json`), 'utf8'))
    TEXT_CACHE.set(m, t!)
  }
  return t!
}

/** The accented text of one rc, or null where we genuinely hold none. */
export function verseText(m: number, s: number, v: number): string | null {
  try {
    return mandalaText(m)[String(s)]?.[v - 1] ?? null
  } catch {
    return null
  }
}

/** Every rc of a hymn, in address order. */
export function hymnText(m: number, s: number): string[] {
  try {
    return mandalaText(m)[String(s)] ?? []
  } catch {
    return []
  }
}

/** Split an accented verse into display tokens.
 *
 *  ⚠ THIS IS NOT A PADAPATHA. It is whitespace segmentation of the
 *  samhita-patha, so sandhi is NOT resolved and compound boundaries are not
 *  marked. Every word token is flagged machineSplit until the real
 *  padapatha (GRETIL, complete for Sakala) is joined in — otherwise a
 *  model's guess would render as the tradition's own word division.
 *
 *  DANDA IS STRUCTURE, NOT PUNCTUATION. The single danda U+0964 closes a
 *  hemistich and the double danda U+0965 closes the verse. They must BREAK
 *  THE LINE, not flow inline — otherwise the text wraps at whatever column
 *  the viewport happens to end at and the metrical division is lost. A
 *  danda is also not a word, so it is never machineSplit and never
 *  clickable. */
export function displayTokens(text: string): {
  text: string
  machineSplit?: true
  danda?: true
  breakAfter?: true
}[] {
  const out: { text: string; machineSplit?: true; danda?: true; breakAfter?: true }[] = []
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    // A danda can be glued to the preceding word ("शुचिः॥"), so peel it off.
    const m = raw.match(/^(.*?)([।॥]+)$/)
    if (m && m[1]) {
      out.push({ text: m[1], machineSplit: true })
      out.push({ text: m[2], danda: true, breakAfter: true })
    } else if (m) {
      out.push({ text: m[2], danda: true, breakAfter: true })
    } else {
      out.push({ text: raw, machineSplit: true })
    }
  }
  // A break after the very last token would leave a dangling empty line.
  const last = out[out.length - 1]
  if (last?.breakAfter) delete last.breakAfter
  return out
}

/* =========================================================================
   Translations. One loader per translator, because each is a SEPARATE
   WITNESS with its own verse division — Griffith prints RV 1.65 as five
   verses where the Sakala numbering has ten. Never merge them into one
   "translation" field.
   ========================================================================= */

const TR_DIR = join(process.cwd(), 'sources/vedas/rigveda/shakala/samhita/translations')
const TR_CACHE = new Map<string, Record<string, string[]>>()

function trFile(who: string, m: number): Record<string, string[]> {
  const key = `${who}-${m}`
  let t = TR_CACHE.get(key)
  if (!t) {
    try { t = JSON.parse(readFileSync(join(TR_DIR, `${who}-mandala-${m}.json`), 'utf8')) }
    catch { t = {} }
    TR_CACHE.set(key, t!)
  }
  return t!
}

/** Hymns where this translator's verse count differs from the Anukramani.
 *  Loaded so a verse page can SAY SO rather than quietly mis-attach. */
let MISALIGNED: Set<string> | null = null
function misaligned(): Set<string> {
  if (!MISALIGNED) {
    try {
      const rows = JSON.parse(readFileSync(join(TR_DIR, 'MISALIGNED.json'), 'utf8'))
      MISALIGNED = new Set(rows.map((r: { ref: string }) => r.ref))
    } catch { MISALIGNED = new Set() }
  }
  return MISALIGNED
}

export type Translation = {
  who: 'griffith'
  label: string
  era: string
  text: string
  /** True where this translator divides the hymn differently from the
   *  Anukramani, so the verse-to-verse join is not guaranteed. */
  divergentDivision: boolean
}

export function translations(m: number, s: number, v: number): Translation[] {
  const out: Translation[] = []
  const g = trFile('griffith', m)[String(s)]?.[v - 1]
  if (g) out.push({
    who: 'griffith',
    label: 'Griffith',
    era: '[MOD-1896 · Victorian]',
    text: g,
    divergentDivision: misaligned().has(`${m}.${s}`),
  })
  return out
}

/* -------------------------------------------------------------------------
   Padapatha — GRETIL, the tradition's own word division.
   ⚠ IAST roman and UNACCENTED. Serves word division, NOT the accent
   argument. See sources/.../apparatus/padapatha/PROVENANCE.md
   ------------------------------------------------------------------------- */
const PADA_DIR = join(process.cwd(), 'sources/vedas/rigveda/shakala/apparatus/padapatha')
const PADA_CACHE = new Map<number, Record<string, string[]>>()

export function padapatha(m: number, s: number, v: number): string | null {
  let t = PADA_CACHE.get(m)
  if (!t) {
    try { t = JSON.parse(readFileSync(join(PADA_DIR, `padapatha-mandala-${m}.json`), 'utf8')) }
    catch { t = {} }
    PADA_CACHE.set(m, t!)
  }
  return t![String(s)]?.[v - 1] ?? null
}

/* =========================================================================
   Metre — computed syllable counts and pada lineation.

   The point of holding this is not the badge. It is that the metre tells us
   where the PADA boundaries fall, and a verse displayed by pada is the verse
   as it is actually structured and recited. Breaking on the danda alone gives
   hemistichs — two long lines — which is not the metrical shape.
   ========================================================================= */

export type MetreInfo = {
  syllables: number
  computed: string
  stated: string
  exact: boolean
  delta: number
  /** Syllables per pada for the STATED metre, when it is a known shape. */
  padaLengths: number[] | null
}

/** Pada structure per Vedic metre. Where a metre has uneven padas the
 *  tradition's own division is used, not an even split. */
const PADA_SHAPE: Record<string, number[]> = {
  'gāyatrī':  [8, 8, 8],
  'uṣṇih':    [8, 8, 12],
  'anuṣṭubh': [8, 8, 8, 8],
  'bṛhatī':   [8, 8, 12, 8],
  'paṅkti':   [8, 8, 8, 8, 8],
  'triṣṭubh': [11, 11, 11, 11],
  'jagatī':   [12, 12, 12, 12],
}

const CANON_METRE: Record<string, string> = {
  'triṣṭup': 'triṣṭubh', 'anuṣṭup': 'anuṣṭubh', 'uṣṇik': 'uṣṇih',
  'paṅktiḥ': 'paṅkti', 'jagatiī': 'jagatī',
}
export const canonMetre = (x: string) => CANON_METRE[x?.trim()] ?? x?.trim() ?? ''

let METRE: Map<string, Omit<MetreInfo, 'padaLengths'>> | null = null
function metreTable() {
  if (!METRE) {
    METRE = new Map()
    try {
      const rows = JSON.parse(
        readFileSync(join(process.cwd(), 'sources/vedas/rigveda/shakala/apparatus/metre/metre.json'), 'utf8')
      )
      for (const r of rows) METRE.set(r.ref, r)
    } catch { /* absent until the classifier has run */ }
  }
  return METRE!
}

export function metre(m: number, s: number, v: number): MetreInfo | null {
  const r = metreTable().get(`${m}.${s}.${v}`)
  if (!r) return null
  const shape = PADA_SHAPE[canonMetre(r.stated)] ?? null
  return { ...r, padaLengths: shape }
}

/** Count syllables in a Devanagari string — same rule as the classifier:
 *  independent vowels + consonants not killed by virama. */
const VIRAMA = '्'
function isVowel(c: string) { return c >= 'ऄ' && c <= 'औ' }
function isCons(c: string) {
  return (c >= 'क' && c <= 'ह') || (c >= 'क़' && c <= 'य़')
}

/** Split a verse into padas of the given syllable lengths.
 *
 *  ⚠ Returns null unless the verse's syllable count MATCHES the shape. We do
 *  not force a lineation onto a verse that does not scan — a wrong pada break
 *  is worse than none, because it would assert a metrical structure the text
 *  does not have. Those verses keep danda-based hemistich breaks. */
export function padas(text: string, lengths: number[] | null): string[] | null {
  if (!lengths) return null
  const want = lengths.reduce((a, b) => a + b, 0)
  const out: string[] = []
  let count = 0, start = 0, target = lengths[0], li = 0
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    let isSyl = false
    if (isVowel(c)) isSyl = true
    else if (isCons(c) && text[i + 1] !== VIRAMA) isSyl = true
    if (isSyl) {
      count++
      if (count === target && li < lengths.length - 1) {
        // extend to the next space so a word is never cut in half
        let end = i + 1
        while (end < text.length && !/[\s।॥]/.test(text[end])) end++
        out.push(text.slice(start, end).trim())
        start = end
        li++
        target += lengths[li]
      }
    }
  }
  if (count !== want) return null      // does not scan — do not fake it
  out.push(text.slice(start).trim())
  return out.filter(Boolean)
}

/* -------------------------------------------------------------------------
   Wilson's translation + per-word grammar, from wisdomlib.
   Wilson renders FOLLOWING SAYANA, so this is the traditional reading in
   English. The grammar is verse-addressed — which DCS is not.
   Both are PARTIAL while the crawl runs; absence means not-yet-fetched.
   ------------------------------------------------------------------------- */
const GRAM_DIR = join(process.cwd(), 'sources/vedas/rigveda/shakala/apparatus/grammar')
const WIL_CACHE = new Map<number, Record<string, string[]>>()
const GRAM_CACHE = new Map<number, Record<string, GrammarWord[][]>>()

export type GrammarWord = { surface: string; lemma?: string; morph?: string; gloss?: string }

function loadJson<T>(dir: string, file: string): T {
  try { return JSON.parse(readFileSync(join(dir, file), 'utf8')) } catch { return {} as T }
}

export function wilson(m: number, s: number, v: number): string | null {
  let t = WIL_CACHE.get(m)
  if (!t) {
    t = loadJson<Record<string, string[]>>(TR_DIR, `wilson-mandala-${m}.json`)
    WIL_CACHE.set(m, t)
  }
  return t[String(s)]?.[v - 1] ?? null
}

export function grammar(m: number, s: number, v: number): GrammarWord[] | null {
  let t = GRAM_CACHE.get(m)
  if (!t) {
    t = loadJson<Record<string, GrammarWord[][]>>(GRAM_DIR, `grammar-mandala-${m}.json`)
    GRAM_CACHE.set(m, t)
  }
  return t[String(s)]?.[v - 1] ?? null
}

/* -------------------------------------------------------------------------
   Address concordance — mandala.sukta.rc <-> astaka.adhyaya.varga.rc.
   The Rgveda has two divisions of the same sequential text; Wilson and the
   marginal varga labels in the scans use the astaka one. Validated as a
   strict superset of our 10,552 verses.
   ------------------------------------------------------------------------- */
let CONC: Map<string, { ashtaka: string; anuvaka: string }> | null = null

export function addressSystems(m: number, s: number, v: number) {
  if (!CONC) {
    CONC = new Map()
    try {
      const tsv = readFileSync(
        join(process.cwd(), 'sources/vedas/rigveda/shakala/apparatus/concordance/rv_ashtaka_mandala_concordance.tsv'),
        'utf8'
      )
      for (const line of tsv.split('\n').slice(1)) {
        const [ms, ashtaka, anuvaka] = line.split('\t')
        if (ms) CONC.set(ms.trim(), { ashtaka: (ashtaka ?? '').trim(), anuvaka: (anuvaka ?? '').trim() })
      }
    } catch { /* absent */ }
  }
  const key = `${String(m).padStart(2, '0')}.${String(s).padStart(3, '0')}.${String(v).padStart(2, '0')}`
  return CONC.get(key) ?? null
}

/* -------------------------------------------------------------------------
   Sūkta orientation notes — MACHINE-GENERATED, never a verified reading.
   Generated from Wilson + Griffith only; the model never saw the Sanskrit.
   Rendered behind a machine badge. See commentary/PROVENANCE.md.
   ------------------------------------------------------------------------- */
const COMM_DIR = join(process.cwd(), 'sources/vedas/rigveda/shakala/samhita/commentary')
const COMM_CACHE = new Map<number, Record<string, SuktaNote>>()

export type SuktaNote = {
  /* Split deliberately. `synthesis` is what the sūkta SAYS — the reading a
     learner needs, weighted toward Wilson because Wilson follows Sāyaṇa and
     so carries the tradition's own sense. `disagreements` is where the
     witnesses part company. They are separate fields because the next stage
     EMBEDS these notes and clusters them by subject: a note that is mostly
     about translators clusters by "translation dispute" rather than by
     theme, so only `synthesis` should go into the vector. */
  /* Order matters and is the whole design. A reciter opens this page to
     understand what they are saying and why it bears on their life — not to
     read a philology paper. So: what the sūkta says, then where it lives in
     practice, and only then the textual apparatus. The scholarship is here
     to be trustworthy, not to be the point. */
  /* `synthesis` is NARRATIVE — the sūkta in its own voice. No "Sāyaṇa
     notes", no "Wilson has": a reciter should meet the hymn, not a
     bibliography. Every attribution — the traditional commentary AND the
     translators — goes in `disagreements`, rendered under "how it has been
     read". Name-dropping in the body is what makes a manual read like a
     seminar. */
  /* A short suggested title. The Anukramaṇī gives no hymn titles — these are
     ours, and machine-made, so they are offered next to the address rather
     than in place of it. RV 1.1 is the canonical name; the title is a handle. */
  title?: string
  synthesis: string
  practice?: string
  disagreements?: string
  text?: string
  kind: 'machine'
  model: string
  generated: string
  witnesses: string[]
  saw_sanskrit: boolean
}

export function suktaNote(m: number, s: number): SuktaNote | null {
  let t = COMM_CACHE.get(m)
  if (!t) {
    t = loadJson<Record<string, SuktaNote>>(COMM_DIR, `commentary-mandala-${m}.json`)
    COMM_CACHE.set(m, t)
  }
  return t[String(s)] ?? null
}

/* -------------------------------------------------------------------------
   Sāyaṇa's Ṛgveda-bhāṣya, verse-addressed.

   Recovered as inline text inside the wisdomlib pages — the content-anchored
   alignment against the Poona OCR scored 31.9% and was abandoned; this
   arrived as a string split. It is the 14th-century commentary itself, and
   it is the tradition's own voice on the verse, so it renders as its own
   apparatus row rather than being folded into a translation.

   ⚠ Coverage is PARTIAL and uneven — wisdomlib splices a gloss only where
   its Wilson text carries one, so roughly half the verses of maṇḍala 1 have
   none. Absence here means "not in this witness", never "Sāyaṇa was silent".
   ------------------------------------------------------------------------- */
const SAY_DIR = join(process.cwd(), 'sources/vedas/rigveda/shakala/samhita/commentary/sayana')
const SAY_CACHE = new Map<number, Record<string, (string | null)[]>>()

export function sayana(m: number, s: number, v: number): string | null {
  let t = SAY_CACHE.get(m)
  if (!t) {
    t = loadJson<Record<string, (string | null)[]>>(SAY_DIR, `sayana-mandala-${m}.json`)
    SAY_CACHE.set(m, t)
  }
  const x = t[String(s)]?.[v - 1]
  return typeof x === 'string' && x.trim() ? x : null
}

/** How many verses of a sūkta carry a gloss — so the page can say so. */
export function sayanaCount(m: number, s: number): number {
  let t = SAY_CACHE.get(m)
  if (!t) {
    t = loadJson<Record<string, (string | null)[]>>(SAY_DIR, `sayana-mandala-${m}.json`)
    SAY_CACHE.set(m, t)
  }
  return (t[String(s)] ?? []).filter(x => typeof x === 'string' && x.trim()).length
}

/* -------------------------------------------------------------------------
   Topic index — built from the per-word morphology, so it indexes LEMMAS
   rather than surface strings. See scripts/build-topic-index.mjs.
   ------------------------------------------------------------------------- */
export type Topic = {
  term: string
  /* 'devata' — backlinks are the sūktas addressed to it.
     'concept' — no devatā list exists, so the VERSE OCCURRENCES are the
     backlink set, and the page must lead with them. */
  kind: 'devata' | 'concept'
  gloss: string | null
  verses: number
  byMandala: Record<string, number>
  refs: string[]
  devataOf: string[]
  incoming: { ref: string; title: string | null }[]
}

let TOPICS: Record<string, Topic> | null = null
function allTopics(): Record<string, Topic> {
  if (!TOPICS) {
    TOPICS = loadJson<Record<string, Topic>>(
      join(process.cwd(), 'sources/vedas/rigveda/shakala/apparatus/topics'), 'topics.json'
    )
  }
  return TOPICS
}
export function topic(term: string): Topic | null {
  return allTopics()[term.toLowerCase()] ?? null
}
export function topicList(): Topic[] {
  return Object.values(allTopics())
}
