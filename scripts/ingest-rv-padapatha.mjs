#!/usr/bin/env node
/* =========================================================================
   GRETIL's Rgveda padapatha — the tradition's own word division.

   WHY IT MATTERS. Where the padapatha survives, sandhi is already resolved
   BY THE TRADITION — the hardest preprocessing problem in Sanskrit NLP,
   done ~2,500 years ago and free. Every verse page currently marks its
   tokens `machine-split` because we are guessing boundaries from
   whitespace. This is the real thing.

   ⚠ TWO LIMITS, MEASURED, NOT ASSUMED.
     1. It is IAST ROMAN, not Devanagari (0 chars in U+0900-097F).
     2. It is UNACCENTED (0 accent marks over 2.3 MB).
   So it CANNOT simply replace the Devanagari mula tokens, and it does not
   serve the accent argument — the padapatha is precisely where each word's
   independent accent is visible before sandhi obscures it, and this witness
   has dropped it. It ships as its own apparatus row, in the script it is
   actually in. An accented Devanagari padapatha (VSM Poona, or detlef108)
   is a separate, later join.

     node scripts/ingest-rv-padapatha.mjs [--dry]
   ========================================================================= */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SRC = '/tmp/pada.htm'
const OUT = 'sources/vedas/rigveda/shakala/apparatus/padapatha'
const DRY = process.argv.includes('--dry')

const html = readFileSync(SRC, 'utf8')
// Drop <style>/<script> CONTENTS, not just their tags. Otherwise the whole
// head block lands in the first verse's body — the same first-record trap the
// samhita ingest hit with the page nav chrome.
const text = html
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<head[\s\S]*?<\/head>/gi, ' ')
  .replace(/<[^>]+>/g, '\n')

/* "agnim | īḷe | ... \n // RV_1,1.1 //"  — body precedes its address. */
const RE = /([^\n][^]*?)\/\/\s*RV_(\d+),(\d+)\.(\d+)\s*\/\//g
const rows = new Map()
const dupes = []
let m
while ((m = RE.exec(text))) {
  // Work LINE BY LINE and keep only the trailing run of lines that are
  // actually padapatha-shaped. Everything a body can pick up ahead of its
  // address marker — the stylesheet, the file header prose, section labels —
  // fails that shape. Collapsing whitespace first would destroy the only
  // signal available for telling them apart.
  const lines = m[1]
    .replace(/-RV_[\d:\/]+-/g, ' ')
    .replace(/\(RV_[\d,]+\)/g, ' ')
    .replace(/Mandala\s*\d+/g, ' ')
    .replace(/\/\/\s*\d+\s*\/\/\.?/g, ' ')   // varga markers "//12//."
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)

  // IAST letters, pipes, hyphens, apostrophes, spaces — nothing else.
  // Digits are IN: IAST marks pluti with a numeral (manuṣye3).
  // The solidus is IN: GRETIL uses a bare "/" as an editorial mark inside
  // some verses (RV 1,121.13 "… api | kartam | / ayajyūn"). Excluding
  // either silently dropped ten real verses.
  const SHAPE = /^[A-Za-zĀāĪīŪūṚṛṜṝḶḷḸḹṀṁṂṃḤḥṄṅÑñṬṭḌḍṆṇŚśṢṣĖėŌōÅå0-9'’\-|\/\[\]?,\s.]+$/
  // Scan backwards while lines are padapatha-shaped. Do NOT require a pipe
  // per line — a wrapped verse can end on a single word ("agāt") and
  // demanding a pipe there discards 632 real verses.
  const keep = []
  for (let i = lines.length - 1; i >= 0; i--) {
    if (SHAPE.test(lines[i])) keep.unshift(lines[i]); else break
  }
  // Then trim from the FRONT any lines with no pipe at all. That removes
  // GRETIL's file-header prose — which is plain ASCII and so passes the
  // shape test — without touching wrapped continuations at the end.
  while (keep.length && !keep[0].includes('|')) keep.shift()
  const cleaned = keep.join(' ').replace(/\s+/g, ' ').trim()
  if (!cleaned || !cleaned.includes('|')) continue
  const key = `${+m[2]}.${+m[3]}.${+m[4]}`
  // ⚠ UPSTREAM DEFECT, verified by reading the source: GRETIL jumps
  // RV_9,97.34 -> RV_9,97.36 and then labels the NEXT verse 9,97.36 again.
  // Verse 35 is unlabelled and 36 duplicated. Keep both bodies in order;
  // the repair pass below re-seats the first one onto the missing address.
  if (rows.has(key)) { dupes.push({ key, body: cleaned }); continue }
  rows.set(key, cleaned)
}

/* Repair the known 9.97 mislabelling: the FIRST body carrying the duplicated
   address actually belongs to the preceding, unlabelled verse. */
for (const { key, body } of dupes) {
  const [a, s2, v] = key.split('.').map(Number)
  const prev = `${a}.${s2}.${v - 1}`
  if (!rows.has(prev)) {
    // The body already stored under `key` is really the earlier verse; the
    // duplicate we held back is the true `key`. Swap them into place.
    rows.set(prev, rows.get(key))
    rows.set(key, body)
    console.log(`  ⚠ repaired upstream mislabel: recovered ${prev} from GRETIL's duplicated ${key}`)
  }
}

/* Checksum against the text we already hold — same 10,552 addresses. */
const TXT = 'sources/vedas/rigveda/shakala/samhita/text'
let expected = 0, missing = [], countMismatch = 0
for (let mm = 1; mm <= 10; mm++) {
  const j = JSON.parse(readFileSync(join(TXT, `mandala-${mm}.json`), 'utf8'))
  for (const [s, verses] of Object.entries(j)) {
    verses.forEach((v, i) => {
      expected++
      const key = `${mm}.${s}.${i + 1}`
      const p = rows.get(key)
      if (!p) missing.push(key)
      else {
        // A padapatha has >= as many words as the samhita line, never fewer:
        // resolving sandhi splits words apart, it never joins them.
        const pw = p.split('|').length
        const sw = v.replace(/[।॥]/g, ' ').split(/\s+/).filter(Boolean).length
        if (pw < sw) countMismatch++
      }
    })
  }
}
console.log(`  padapatha verses parsed : ${rows.size}`)
console.log(`  samhita verses held     : ${expected}`)
console.log(`  addresses missing       : ${missing.length}`)
console.log(`  verses where padapatha has FEWER words than samhita: ${countMismatch}`)
if (missing.length) console.log(`    first: ${missing.slice(0, 8).join(', ')}`)

if (missing.length > 0) {
  console.error('  ✗ padapatha does not cover every held verse. NOT WRITING.')
  process.exit(1)
}
console.log('  ✓ every held verse has a padapatha')
if (DRY) { console.log('  --dry: nothing written'); process.exit(0) }

mkdirSync(OUT, { recursive: true })
for (let mm = 1; mm <= 10; mm++) {
  const o = {}
  for (const [k, v] of rows) {
    const [a, s, i] = k.split('.').map(Number)
    if (a === mm) ((o[s] ??= []))[i - 1] = v
  }
  writeFileSync(join(OUT, `padapatha-mandala-${mm}.json`), JSON.stringify(o), 'utf8')
}
writeFileSync(join(OUT, 'PROVENANCE.md'), `# Ṛgveda Śākala — padapāṭha

**Source.** GRETIL, \`sa_RgvedasaMhitApadapATha\`, input by the Sansknet project, TEI-encoded
by GRETIL. Licence CC-BY-SA. Verse-keyed \`RV_m,s.v\`.

**Coverage.** ${rows.size} verses — every one of the 10,552 ṛcs we hold.

**⚠ Two limits, measured on the source:**

| | |
|---|---|
| Script | **IAST roman**, not Devanāgarī (0 chars in U+0900–097F) |
| Accent | **none** — 0 marks over 2.3 MB |

The second matters. The padapāṭha is exactly where each word's *independent* accent is
visible before sandhi obscures it, and this witness has dropped it. So this serves word
division and lemma work, **not** the accent argument. An accented Devanāgarī padapāṭha
exists — the VSM Poona critical edition prints one (see \`sources/_fetched/rv-sayana-poona\`),
and detlef108.de has another — and joining one of those is separate later work.

Because of the script mismatch this does **not** replace the Devanāgarī mūla tokens, which
stay marked \`machine-split\` until an accented Devanāgarī padapāṭha is joined.

Regenerate: \`node scripts/ingest-rv-padapatha.mjs\`
`, 'utf8')
console.log(`  ✓ wrote ${OUT}/padapatha-mandala-{1..10}.json + PROVENANCE.md`)
