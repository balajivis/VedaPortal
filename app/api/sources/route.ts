import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const ROOT = process.cwd()
const VEDAS_DIR = path.join(ROOT, 'sources', 'vedas')
const MANIFEST = path.join(ROOT, 'sources', '_fetched', '_manifest.yaml')
const LIBRARY = path.join(ROOT, 'sources', '_library.yaml')

export type NodeStatus = 'enumerated' | 'sourced' | 'structured' | 'voiced'

export interface CorpusNode {
  kind: 'layer' | 'apparatus' | 'audio'
  name: string
  status: NodeStatus
  note?: string
}

export interface ShakhaRecord {
  veda: string
  organization: string | null
  shakha: string
  survival: string
  tier: string
  recitingCommunities: { region?: string; note?: string }[]
  nodes: CorpusNode[]
  findings: string[]
  sources: string[]
  counts: { total: number; sourced: number }
}

export interface HeldFile {
  name: string
  relPath: string
  size: number
  sizeFormatted: string
  shakha?: string
  layer?: string
  area: string
}

function fmt(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

/**
 * Path shape is ŚĀKHĀ-FIRST and Kṛṣṇa/Śukla is a tier ABOVE śākhā, Yajurveda only:
 *   vedas/rigveda/shakala/samhita/file.pdf
 *   vedas/yajurveda/krishna/taittiriya/aranyaka/file.pdf
 * The old route read parts[1] as the layer, which was only true before the restructure.
 */
function classify(relPath: string): { area: string; shakha?: string; layer?: string } {
  const p = relPath.split('/')
  if (p[0] !== 'vedas') {
    if (p[0] === 'smriti') return { area: 'Smṛti' }
    if (p[0] === 'shlokas') return { area: 'Shlokas' }
    if (p[0] === 'unorganised-collection') return { area: 'Unattributed' }
    return { area: 'Other' }
  }
  if (p[1] === '_reference') return { area: 'Reference' }
  const isYajur = p[1] === 'yajurveda'
  const shakha = isYajur ? p[3] : p[2]
  const layer = isYajur ? p[4] : p[3]
  return { area: 'Vedas', shakha, layer }
}

function readShakhas(): ShakhaRecord[] {
  const out: ShakhaRecord[] = []
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry)
      if (fs.statSync(full).isDirectory()) walk(full)
      else if (entry === '_status.yaml') {
        try {
          const d = YAML.parse(fs.readFileSync(full, 'utf8')) || {}
          const nodes: CorpusNode[] = []
          for (const kind of ['layers', 'apparatus'] as const) {
            for (const [name, v] of Object.entries(d[kind] || {})) {
              const o = v as { status?: NodeStatus; note?: string }
              nodes.push({
                kind: kind === 'layers' ? 'layer' : 'apparatus',
                name,
                status: o?.status || 'enumerated',
                note: o?.note,
              })
            }
          }
          if (d.audio && typeof d.audio === 'object') {
            nodes.push({ kind: 'audio', name: 'audio', status: d.audio.status, note: d.audio.note })
          }
          out.push({
            veda: d.veda,
            organization: d.organization ?? null,
            shakha: d.shakha,
            survival: d.survival || 'unknown',
            tier: d.tier || 'settled',
            recitingCommunities: d.reciting_communities || [],
            nodes,
            findings: d.findings || [],
            sources: d.sources || [],
            counts: { total: nodes.length, sourced: nodes.filter((n) => n.status === 'sourced').length },
          })
        } catch {
          /* a malformed status file must not take the page down */
        }
      }
    }
  }
  walk(VEDAS_DIR)
  return out
}

function readHeld(): HeldFile[] {
  const files: HeldFile[] = []
  const walk = (dir: string, base = '') => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir)) {
      if (entry.startsWith('.') || entry === '_fetched') continue
      const full = path.join(dir, entry)
      const rel = base ? `${base}/${entry}` : entry
      const st = fs.statSync(full)
      if (st.isDirectory()) walk(full, rel)
      else if (/\.(pdf|htm|html|txt|tsv|itx|xml)$/i.test(entry)) {
        const { area, shakha, layer } = classify(rel)
        files.push({ name: entry, relPath: rel, size: st.size, sizeFormatted: fmt(st.size), shakha, layer, area })
      }
    }
  }
  walk(path.join(ROOT, 'sources'))
  return files.sort((a, b) => b.size - a.size)
}

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return { available: false, records: 0, packets: [] as string[], bytes: 0 }
  try {
    const d = YAML.parse(fs.readFileSync(MANIFEST, 'utf8')) || {}
    let records = 0
    let bytes = 0
    const packets: string[] = []
    for (const [k, v] of Object.entries(d)) {
      if (Array.isArray(v)) {
        records += v.length
        packets.push(k)
        for (const r of v as { bytes?: number }[]) bytes += Number(r?.bytes) || 0
      }
    }
    return { available: true, records, packets, bytes, bytesFormatted: fmt(bytes) }
  } catch {
    return { available: false, records: 0, packets: [] as string[], bytes: 0 }
  }
}

function readLibrary() {
  if (!fs.existsSync(LIBRARY)) return null
  try {
    return YAML.parse(fs.readFileSync(LIBRARY, 'utf8'))
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const shakhas = readShakhas()
    const library = readLibrary()
    const held = readHeld()
    const manifest = readManifest()

    const nodeTotals = shakhas.reduce(
      (a, s) => ({ total: a.total + s.counts.total, sourced: a.sourced + s.counts.sourced }),
      { total: 0, sourced: 0 }
    )

    return NextResponse.json({
      success: true,
      generatedAt: new Date().toISOString(),
      shakhas,
      library,
      held,
      manifest,
      totals: {
        vidyas: (library?.categories || []).reduce((n: number, c: { vidyas?: unknown[] }) => n + (c.vidyas?.length || 0), 0),
        vidyasEmpty: (library?.categories || []).reduce(
          (n: number, c: { vidyas?: { state?: string }[] }) =>
            n + (c.vidyas || []).filter((v) => v.state === 'none').length,
          0
        ),
        shakhas: shakhas.length,
        nodes: nodeTotals.total,
        sourced: nodeTotals.sourced,
        heldFiles: held.length,
        heldBytes: fmt(held.reduce((s, f) => s + f.size, 0)),
      },
    })
  } catch (e) {
    console.error('sources route failed', e)
    return NextResponse.json({ success: false, error: 'Failed to read sources' }, { status: 500 })
  }
}
