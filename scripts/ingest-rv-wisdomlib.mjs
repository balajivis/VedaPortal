#!/usr/bin/env node
/* =========================================================================
   Extract Wilson's translation AND the per-word grammar from the cached
   wisdomlib pages.

   Reads /tmp/wilson-cache only — it never fetches. So it can run against a
   PARTIAL cache while the crawl is still going, and re-running later picks
   up whatever has since arrived.

   TWO THINGS PER VERSE:
     translation  Wilson 1866, who renders FOLLOWING SAYANA — the traditional
                  reading in English, not another Victorian one.
     grammar      surface < lemma, POS + case/number/gender, and a gloss,
                  per word. Verse-addressed, which is exactly what DCS could
                  not give us: DCS splits by sentence and carries no verse
                  number, so only 12 of 1028 hymns aligned positionally.

     node scripts/ingest-rv-wisdomlib.mjs
   ========================================================================= */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const CACHE = '/tmp/wilson-cache'
const OUT_T = 'sources/vedas/rigveda/shakala/samhita/translations'
const OUT_G = 'sources/vedas/rigveda/shakala/apparatus/grammar'

function lines(html) {
  const t = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
  return t.split('\n').map(l => l.trim()).filter(Boolean)
}

function verseRef(html) {
  const m = html.match(/<title>\s*Rig Veda (\d+)\.(\d+)\.(\d+)/)
  return m ? { m: +m[1], s: +m[2], v: +m[3] } : null
}

function translation(L) {
  const i = L.findIndex(l => /^English translation:?$/i.test(l))
  if (i < 0) return null
  const out = []
  for (let k = i + 1; k < L.length; k++) {
    if (/^(Details|Ṛṣi|Rishi|Devatā|Chandas|Svara|Sanskrit text|\[Rigveda)/i.test(L[k])) break
    out.push(L[k])
  }
  const joined = out.join(' ').replace(/\s+/g, ' ').trim()
  /* ⭐ SAYANA IS IN HERE. wisdomlib splices Sayana's Rgveda-bhasya into the
     Wilson text inline — "… wealth.” Commentary by Sayana: Rgveda-bhasya
     Agni = purohita, the priest who superintends family rites; …". That is
     the 14th-century commentary itself, verse-addressed, arriving free with a
     crawl that was aimed at the translation. It was NOT found by the Poona
     OCR alignment, which scored 31.9% and stalled.
     Translation and commentary are different KINDS of witness and must not
     be stored as one blob: Wilson is a rendering, Sayana is an argument. */
  const cut = joined.search(/[“"]?\s*Commentary by S[āa]ya[ṇn]a\s*:/i)
  if (cut < 0) return { translation: strip(joined), sayana: null }
  const head = joined.slice(0, cut)
  const tail = joined.slice(cut)
    .replace(/^[“"]?\s*Commentary by S[āa]ya[ṇn]a\s*:\s*/i, '')
    .replace(/^[ṚR][gG]veda-bh[āa][ṣs]ya\s*/i, '')
    .trim()
  return { translation: strip(head), sayana: tail || null }
}

const strip = t => t.replace(/^[“"]|[”"]$/g, '').trim() || null

/* Grammar entries look like:
     ete            <- surface
     <
     etad           <- lemma (after any number of "<" steps)
     [noun], nominative, plural, masculine
     "this; he,she,it (pers. pron.)…"                          */
function grammar(L) {
  const i = L.findIndex(l => /analysis of grammar/i.test(l))
  if (i < 0) return null
  const out = []
  let cur = null
  for (let k = i + 1; k < L.length; k++) {
    const l = L[k]
    // Stop at the page furniture. The footer's "Article published on…" was
    // otherwise parsed as a word with EMAIL-PROTECTED morphology.
    if (/^(Let's grow|Wisdom Library|Like what you read|Related products|Help me|Article published|Other Vedic|FAQ|Glossary|Full-text|Related definitions|See also|Source:|Buy now|Support|Share|Tags:)/i.test(l)) break
    if (/wisdomlib|EMAIL.{0,3}PROTECTED|^Let us know|^Contact|^Newsletter|^Donate/i.test(l)) break
    if (l === '<') continue
    if (l.startsWith('[')) {                       // morphology line
      // "[noun], nominative, plural, masculine" — the ] is mid-string, not
      // at the end, so an end-anchored strip leaves it behind.
      if (cur) cur.morph = l.replace(/^\[/, '').replace(/\]/, '').trim()
      continue
    }
    if (/^[“"]/.test(l)) {                         // gloss line
      if (cur) cur.gloss = l.replace(/^[“"]|[”"]$/g, '').trim()
      continue
    }
    // A bare word. Either a new entry, or a lemma step of the current one.
    if (cur && !cur.morph) cur.lemma = l           // still walking "<" chain
    else { cur = { surface: l, lemma: l }; out.push(cur) }
  }
  return out.length ? out : null
}

if (!existsSync(CACHE)) { console.error('  no cache at ' + CACHE); process.exit(1) }
const files = readdirSync(CACHE).filter(f => f.endsWith('.html'))
const T = new Map(), G = new Map(), S = new Map()
let noRef = 0
for (const f of files) {
  const html = readFileSync(join(CACHE, f), 'utf8')
  const ref = verseRef(html)
  if (!ref) { noRef++; continue }
  const L = lines(html)
  const key = `${ref.m}.${ref.s}.${ref.v}`
  const t = translation(L)
  if (t?.translation) T.set(key, t.translation)
  if (t?.sayana) S.set(key, t.sayana)
  const g = grammar(L);     if (g) G.set(key, g)
}
console.log(`  cached pages      : ${files.length}`)
console.log(`  not a verse page  : ${noRef}  (sukta/mandala headers)`)
console.log(`  translations      : ${T.size}`)
console.log(`  grammar sets      : ${G.size}`)
console.log(`  ⭐ SĀYAṆA glosses  : ${S.size}   (spliced inline by wisdomlib — free with this crawl)`)
console.log(`  coverage of 10552 : ${(T.size / 10552 * 100).toFixed(1)}%`)

const OUT_S = 'sources/vedas/rigveda/shakala/samhita/commentary/sayana'
mkdirSync(OUT_T, { recursive: true }); mkdirSync(OUT_G, { recursive: true }); mkdirSync(OUT_S, { recursive: true })
for (let m = 1; m <= 10; m++) {
  const t = {}, g = {}
  for (const [k, v] of T) { const [a, s, i] = k.split('.').map(Number); if (a === m) ((t[s] ??= []))[i - 1] = v }
  for (const [k, v] of G) { const [a, s, i] = k.split('.').map(Number); if (a === m) ((g[s] ??= []))[i - 1] = v }
  const y = {}
  for (const [k, v] of S) { const [a, s, i] = k.split('.').map(Number); if (a === m) ((y[s] ??= []))[i - 1] = v }
  writeFileSync(join(OUT_S, `sayana-mandala-${m}.json`), JSON.stringify(y), 'utf8')
  writeFileSync(join(OUT_T, `wilson-mandala-${m}.json`), JSON.stringify(t), 'utf8')
  writeFileSync(join(OUT_G, `grammar-mandala-${m}.json`), JSON.stringify(g), 'utf8')
}
console.log(`  ✓ wrote wilson-mandala-{1..10}.json and grammar-mandala-{1..10}.json`)
console.log(`    (partial while the crawl runs — re-run to pick up more)`)
