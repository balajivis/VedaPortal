#!/usr/bin/env node
/* =========================================================================
   DCS morphology for the Rgveda — lemma + morph per token.

   Source: Oliver Hellwig, Digital Corpus of Sanskrit, CC-BY-4.0.
   CoNLL-U, one file per hymn, sandhi-split and hand-annotated.

   WHAT IT MAKES POSSIBLE. The tokens on a verse page are currently inert:
   underlined, clickable, but with nothing behind the click. This puts a
   lemma and a full morphological analysis behind each one — which is the
   difference between a text you can look at and a text you can interrogate.

   ⚠ IAST and UNACCENTED, like the padapatha. It joins to the padapatha,
   not to the Devanagari mula.

   ⚠ ALIGNMENT IS POSITIONAL. DCS marks the hymn (## chapter: ṚV, 1, 1) but
   not the verse: verses are sequential `# text =` blocks. So verse N is the
   Nth block, and that is only safe if the block count matches the
   Anukramani's verse count. Where it does not, the hymn is SKIPPED rather
   than mis-attached — a morphology silently bound to the wrong verse would
   be worse than none.

     node scripts/ingest-rv-morphology.mjs [--dry]
   ========================================================================= */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SRC = '/private/tmp/claude-501/-Users-bv-Code-personal/dac7c064-6e47-4933-807b-8b122df1110a/scratchpad/dcs/dcs/data/conllu/files/Ṛgveda'
const OUT = 'sources/vedas/rigveda/shakala/apparatus/morphology'
const ANU = 'sources/vedas/rigveda/shakala/apparatus/anukramani'
const DRY = process.argv.includes('--dry')

function anukramaniCounts() {
  const c = new Map()
  for (let m = 1; m <= 10; m++) {
    const lines = readFileSync(join(ANU, `Mandala_${m}.txt`), 'utf8')
      .split('\n').map(l => l.trim()).filter(Boolean)
    for (const line of (/^[0-9]/.test(lines[0]) ? lines : lines.slice(1))) {
      const p = line.split('.')
      c.set(`${m}.${Number(p[0])}`, Number(p[1]))
    }
  }
  return c
}

const expected = anukramaniCounts()
const byHymn = new Map()
let skipped = [], parsed = 0

for (const f of readdirSync(SRC)) {
  if (!f.endsWith('.conllu')) continue
  const raw = readFileSync(join(SRC, f), 'utf8')
  const ch = raw.match(/##\s*chapter:\s*ṚV,\s*(\d+),\s*(\d+)/)
  if (!ch) continue
  const ref = `${+ch[1]}.${+ch[2]}`

  // Split into sentences (verses) on the "# text =" header.
  const blocks = raw.split(/\n(?=# text = )/).filter(b => b.includes('# text = '))
  const verses = blocks.map(b => {
    const toks = []
    for (const line of b.split('\n')) {
      if (!line || line.startsWith('#')) continue
      const c = line.split('\t')
      if (c.length < 6) continue
      const feats = c[5] === '_' ? '' : c[5].replace(/\|/g, ' · ')
      toks.push({ w: c[1], lemma: c[2], pos: c[3], morph: feats })
    }
    return toks
  }).filter(v => v.length)

  const want = expected.get(ref)
  if (want === undefined) continue
  if (verses.length !== want) { skipped.push({ ref, want, have: verses.length }); continue }
  byHymn.set(ref, verses)
  parsed += verses.length
}

console.log(`  hymns in DCS            : ${readdirSync(SRC).filter(f => f.endsWith('.conllu')).length}`)
console.log(`  hymns aligned to Anukr. : ${byHymn.size} / ${expected.size}`)
console.log(`  hymns SKIPPED (count ≠) : ${skipped.length}`)
console.log(`  verses with morphology  : ${parsed} / 10552  (${(parsed / 10552 * 100).toFixed(1)}%)`)
if (skipped.length) {
  console.log('  first skips (anukramaṇī vs dcs verse blocks):')
  for (const s of skipped.slice(0, 8)) console.log(`      RV ${s.ref.padEnd(8)} ${s.want} vs ${s.have}`)
}
if (DRY) { console.log('  --dry: nothing written'); process.exit(0) }

mkdirSync(OUT, { recursive: true })
for (let m = 1; m <= 10; m++) {
  const o = {}
  for (const [ref, verses] of byHymn) {
    const [a, s] = ref.split('.').map(Number)
    if (a === m) o[s] = verses
  }
  writeFileSync(join(OUT, `morphology-mandala-${m}.json`), JSON.stringify(o), 'utf8')
}
writeFileSync(join(OUT, 'PROVENANCE.md'), `# Ṛgveda Śākala — morphology

**Source.** Digital Corpus of Sanskrit (Oliver Hellwig), CoNLL-U, **CC-BY-4.0**.
Sandhi-split, hand-annotated: lemma, POS, full morphological features, dependency relations.

**Coverage.** ${parsed} of 10,552 ṛcs (${(parsed / 10552 * 100).toFixed(1)}%), across
${byHymn.size} of 1,028 hymns.

**${skipped.length} hymns skipped**, not merged. DCS marks the hymn but not the verse — verses
are sequential \`# text =\` blocks — so alignment is positional and is only safe where the block
count matches the Anukramaṇī's verse count. Where it does not, the hymn is skipped. A morphology
silently bound to the wrong verse is worse than no morphology. Skips are listed in \`SKIPPED.json\`.

**⚠ IAST and unaccented**, like the padapāṭha. Joins to the padapāṭha, not to the Devanāgarī mūla.

Regenerate: \`node scripts/ingest-rv-morphology.mjs\`
`, 'utf8')
writeFileSync(join(OUT, 'SKIPPED.json'), JSON.stringify(skipped, null, 1), 'utf8')
console.log(`  ✓ wrote ${OUT}/morphology-mandala-{1..10}.json + PROVENANCE.md + SKIPPED.json`)
