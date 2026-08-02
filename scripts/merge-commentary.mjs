#!/usr/bin/env node
/* =========================================================================
   Fold _pending/<m>.<s>.json records into commentary-mandala-<m>.json.

   Agents write one file per sūkta because several run concurrently and the
   shared JSON cannot take simultaneous writes. This is the fold step.

   ⚠ IT IS A GATE, NOT A COPY. Agents die mid-run — two did on maṇḍala 2, one
   stalled after 600s and one on a closed connection — leaving half-written
   records behind. A record merges only if all four fields are present and
   the synthesis is substantial. Anything short is a fragment, not a note,
   and is REPORTED rather than shipped.

     node scripts/merge-commentary.mjs [mandala]
   ========================================================================= */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const D = 'sources/vedas/rigveda/shakala/samhita/commentary'
const only = process.argv[2] ? Number(process.argv[2]) : null
const REQ = ['title', 'synthesis', 'practice', 'disagreements']

const dir = join(D, '_pending')
const files = existsSync(dir) ? readdirSync(dir) : []
const byMandala = new Map()
for (const f of files) {
  const m = f.match(/^(\d+)\.(\d+)\.json$/)
  if (!m) continue
  const mm = Number(m[1]), ss = Number(m[2])
  if (only && mm !== only) continue
  if (!byMandala.has(mm)) byMandala.set(mm, [])
  byMandala.get(mm).push([ss, join(dir, f)])
}

if (!byMandala.size) { console.log('  nothing pending'); process.exit(0) }

for (const [m, list] of [...byMandala].sort((a, b) => a[0] - b[0])) {
  const target = join(D, `commentary-mandala-${m}.json`)
  const main = existsSync(target) ? JSON.parse(readFileSync(target, 'utf8')) : {}
  let merged = 0
  const rejected = []

  for (const [s, f] of list.sort((a, b) => a[0] - b[0])) {
    let r
    try { r = JSON.parse(readFileSync(f, 'utf8')) }
    catch { rejected.push([s, 'unparseable']); continue }
    const miss = REQ.filter(k => !r[k])
    if (miss.length) { rejected.push([s, `missing ${miss.join(', ')}`]); continue }
    const n = r.synthesis.trim().split(/\s+/).length
    if (n < 300) { rejected.push([s, `synthesis only ${n} words`]); continue }
    Object.assign(r, {
      kind: r.kind ?? 'machine',
      model: r.model ?? 'claude-opus-5',
      generated: r.generated ?? new Date().toISOString().slice(0, 10),
      title_kind: r.title_kind ?? 'machine-suggested',
      weighted: r.weighted ?? 'wilson',
      witnesses: r.witnesses ?? ['wilson-1866', 'griffith-1896', 'sayana-via-wilson'],
    })
    main[String(s)] = r
    merged++
  }

  /* The naming sweep lives here so it cannot be skipped: "the fire" names
     the god and must become Agni — except where it genuinely means the
     hearth fire. */
  let swept = 0
  for (const rec of Object.values(main)) {
    for (const fld of ['title', 'synthesis', 'practice']) {
      if (!rec[fld]) continue
      const before = rec[fld]
      rec[fld] = rec[fld]
        .replace(/\bthe fire\b(?!\s+(on the hearth|is laid))/g, 'Agni')
        .replace(/\bThe fire\b/g, 'Agni')
      if (rec[fld] !== before) swept++
    }
  }
  writeFileSync(target, JSON.stringify(main), 'utf8')

  const have = Object.keys(main).map(Number).sort((a, b) => a - b)
  const names = Object.entries(main)
    .filter(([, r]) => ['Sāyaṇa', 'Wilson', 'Griffith'].some(x => (r.synthesis ?? '').includes(x)))
    .map(([k]) => k)

  console.log(`  maṇḍala ${m}: merged ${merged}, swept ${swept} fields — now ${have.length} sūktas`)
  console.log(`    present: ${have.join(', ')}`)
  if (rejected.length) {
    console.log(`    ⚠ rejected ${rejected.length} incomplete (agent died mid-write):`)
    for (const [s, why] of rejected.slice(0, 10)) console.log(`        ${m}.${s} — ${why}`)
  }
  if (names.length) console.log(`    ⚠ names in synthesis: ${names.join(', ')}`)
}
