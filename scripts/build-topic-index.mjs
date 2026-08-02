#!/usr/bin/env node
/* =========================================================================
   Topic index — every occurrence of a term across the whole Ṛgveda.

   WHERE IT COMES FROM. The wisdomlib crawl left us per-word morphology for
   all 10,552 verses: 171,107 tokens carrying a LEMMA and a gloss. So the
   index is not a substring search over the text — it is built from the
   lemma, which is why `indraśatruḥ`, `indrasya` and `indram` all land on
   `indra`, and why a surface-form search would have missed them.

   ⚠ THE LEMMA IS THE UNIT, NOT THE WORD. A search for "soma" over the
   Devanāgarī would miss every inflected form and hit every compound. The
   morphology is what makes this honest.

   WHAT A TOPIC PAGE THEN CARRIES
     · what the term means, from the morphology's own gloss
     · how often it occurs, and in which maṇḍalas — the distribution is
       itself a finding (soma is 1,142 tokens, over half of them in IX)
     · every sūkta ascribed to it as devatā, from the Anukramaṇī
     · INCOMING REFERENCES — every commentary note that marks {{term}}

   Only terms above a floor are indexed, and only those that are actually
   things a reader would follow up. An index of 8,158 lemmas is not an index.

     node scripts/build-topic-index.mjs
   ========================================================================= */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'sources/vedas/rigveda/shakala'
const OUT = join(SRC, 'apparatus/topics')

const read = p => { try { return JSON.parse(readFileSync(p, 'utf8')) } catch { return {} } }

/* ---- 1. lemma -> occurrences, from the morphology ---- */
const lemma = new Map()          // lemma -> { count, gloss, refs:[m.s.v], byMandala }
for (let m = 1; m <= 10; m++) {
  const g = read(join(SRC, `apparatus/grammar/grammar-mandala-${m}.json`))
  for (const [s, verses] of Object.entries(g)) {
    verses.forEach((words, i) => {
      if (!words) return
      const seen = new Set()
      for (const w of words) {
        const L = w?.lemma
        if (!L || seen.has(L)) continue     // once per verse, not once per token
        seen.add(L)
        let e = lemma.get(L)
        if (!e) { e = { count: 0, gloss: w.gloss ?? null, refs: [], byMandala: {} }; lemma.set(L, e) }
        e.count++
        e.byMandala[m] = (e.byMandala[m] ?? 0) + 1
        e.refs.push(`${m}.${s}.${i + 1}`)
        if (!e.gloss && w.gloss) e.gloss = w.gloss
      }
    })
  }
}

/* ---- 2. devatā ascriptions, from the Anukramaṇī ---- */
function splitTop(s, sep) {
  const out = []; let d = 0, cur = ''
  for (const ch of s) {
    if (ch === '(') d++; else if (ch === ')') d--
    if (ch === sep && d === 0) { out.push(cur); cur = '' } else cur += ch
  }
  out.push(cur); return out.filter(Boolean)
}
const devata = new Map()         // normalised name -> [ref]
for (let m = 1; m <= 10; m++) {
  const lines = readFileSync(join(SRC, `apparatus/anukramani/Mandala_${m}.txt`), 'utf8')
    .split('\n').map(l => l.trim()).filter(Boolean)
  for (const line of (/^[0-9]/.test(lines[0]) ? lines : lines.slice(1))) {
    const p = line.split('.')
    if (!/^\d+$/.test(p[0])) continue
    const parts = []; let d = 0, cur = ''
    for (const ch of p.slice(2).join('.')) {
      if (ch === '(') d++; else if (ch === ')') d--
      if (ch === '.' && d === 0) { parts.push(cur); cur = '' } else cur += ch
    }
    parts.push(cur)
    const raw = parts.length >= 3 ? parts[1] : parts[0]
    for (const seg of splitTop(raw ?? '', ',')) {
      const name = seg.replace(/^\s*\([^)]*\)\s*/, '').trim().toLowerCase()
      if (!name) continue
      if (!devata.has(name)) devata.set(name, [])
      devata.get(name).push(`${m}.${p[0]}`)
    }
  }
}

/* ---- 3. incoming references from the commentary notes ---- */
const incoming = new Map()       // topic -> [{ref, title}]
for (let m = 1; m <= 10; m++) {
  const c = read(join(SRC, `samhita/commentary/commentary-mandala-${m}.json`))
  for (const [s, note] of Object.entries(c)) {
    const blob = [note.title, note.synthesis, note.practice, note.disagreements].join(' ')
    for (const mm of blob.matchAll(/\{\{([^}]+)\}\}/g)) {
      const t = mm[1].trim().toLowerCase()
      if (!incoming.has(t)) incoming.set(t, [])
      const list = incoming.get(t)
      if (!list.some(x => x.ref === `${m}.${s}`)) {
        list.push({ ref: `${m}.${s}`, title: note.title ?? null })
      }
    }
  }
}

/* ---- 3b. function words ----
   ⚠ The morphology tags Sanskrit pronouns as "noun" — `yad`, `tvad`, `mad`
   all come back `noun, nominative, singular`. So part of speech cannot do
   this filtering and an explicit list is required. Without it the index is
   headed by "tvad 3,437 verses", which is true and useless. */
const STOP = new Set([
  // pronouns and deictics
  'tvad','mad','tad','yad','idam','etad','adas','kim','asmad','yuṣmad',
  'sva','sarva','anya','ubha','ka','ya','sa',
  // particles, preverbs, adverbs of relation
  'ā','su','na','ca','vā','hi','tu','eva','api','iti','u','uta','nu','sma',
  'cit','id','atha','adha','yathā','tathā','katham','kva','kad','kadā','yat',
  'ceti','vai','khalu','ha','aha','añjas','ad','anu','abhi','adhi','ava',
  'ud','ni','nis','pari','pra','prati','vi','sam','upa','apa','antar',
  'punar','sadā','sanā','nūnam','iva','nakis','mā',
  // copulas and light verbs — real words, but not topics
  'as','bhū','kṛ','i','gam','dā','dhā',
  // numerals used adjectivally everywhere
  'eka','dvi','tri','catur',
])

/* ---- 3c. normalise a devatā name onto a lemma ----
   The Anukramaṇī writes `agniḥ` where the morphology's lemma is `agni`, and
   `aśvinau` where it is `aśvin`. Without this the devatā join matched
   NOTHING — indra came back "devatā of 0 sūktas" while heading 218 hymns. */
function toLemma(name) {
  const tries = [
    name,
    name.replace(/ḥ$/, ''),
    name.replace(/āḥ$/, 'a'),
    name.replace(/au$/, ''),
    name.replace(/ौ$/, ''),
    name.replace(/aḥ$/, 'a'),
    name.replace(/ī$/, 'ī'),
    name.replace(/ā$/, 'a'),
    name.replace(/tā$/, 'tṛ'),
    name.replace(/aḥ$/, ''),
  ]
  for (const t of tries) if (lemma.has(t)) return t
  return name.replace(/ḥ$/, '')
}
const devataByLemma = new Map()
for (const [name, refs] of devata) {
  const key = toLemma(name)
  if (!devataByLemma.has(key)) devataByLemma.set(key, [])
  devataByLemma.get(key).push(...refs)
}

/* ---- 4. choose what is worth a page ---- */
/* A term earns a page if it is a devatā, or is marked in a note, or is a
   common enough lemma to be worth following. Everything else would make the
   index unusable rather than useful. */
const FLOOR = 25
const topics = new Map()
const consider = new Set([
  ...lemma.keys(),
  ...devataByLemma.keys(),
  ...incoming.keys(),
])
for (const t of consider) {
  if (STOP.has(t)) continue
  const l = lemma.get(t)
  const dv = [...new Set(devataByLemma.get(t) ?? [])]
  const inc = incoming.get(t) ?? []
  const worth = dv.length > 0 || inc.length > 0 || (l && l.count >= FLOOR)
  if (!worth) continue
  /* KIND decides what the page leads with. A deity's backlinks are the
     sūktas addressed to it; a concept has none of those, and its backlink
     set is the verse occurrences — so for `ṛta` or `dhī` that list is the
     substance of the page, not an appendix. */
  const kind = dv.length ? 'devata' : 'concept'
  topics.set(t, {
    term: t,
    kind,
    gloss: l?.gloss ?? null,
    verses: l?.count ?? 0,
    byMandala: l?.byMandala ?? {},
    refs: l?.refs ?? [],
    devataOf: dv,
    incoming: inc,
  })
}

mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'topics.json'), JSON.stringify(Object.fromEntries(topics)), 'utf8')

const byCount = [...topics.values()].sort((a, b) => b.verses - a.verses)
console.log(`  lemmas in corpus     : ${lemma.size}`)
console.log(`  devatā names         : ${devata.size}`)
console.log(`  topics with a page   : ${topics.size}`)
console.log(`  marked in notes      : ${incoming.size}`)
console.log(`  topics that are devatā of at least one sūkta: ${[...topics.values()].filter(t => t.devataOf.length).length}`)
const deities = [...topics.values()].filter(t => t.kind === 'devata')
const concepts = [...topics.values()].filter(t => t.kind === 'concept')
console.log(`  deities/persons      : ${deities.length}`)
console.log(`  concepts             : ${concepts.length}`)
console.log(`  total refs stored    : ${[...topics.values()].reduce((a, t) => a + t.refs.length, 0).toLocaleString()}`)
console.log('\n  most frequent concepts (the ones with no devatā list, so occurrences ARE the backlinks):')
for (const t of concepts.sort((a, b) => b.verses - a.verses).slice(0, 10)) {
  console.log(`      ${t.term.padEnd(14)} ${String(t.verses).padStart(5)} verses`)
}
console.log('\n  most frequent:')
for (const t of byCount.slice(0, 12)) {
  console.log(`      ${t.term.padEnd(14)} ${String(t.verses).padStart(5)} verses   devatā of ${String(t.devataOf.length).padStart(3)} sūktas`)
}
console.log(`\n  ✓ wrote ${OUT}/topics.json`)
