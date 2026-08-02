'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type NodeStatus = 'enumerated' | 'sourced' | 'structured' | 'voiced'

interface CorpusNode {
  kind: 'layer' | 'apparatus' | 'audio'
  name: string
  status: NodeStatus
  note?: string
}
interface ShakhaRecord {
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
interface HeldFile {
  name: string
  relPath: string
  sizeFormatted: string
  shakha?: string
  layer?: string
  area: string
}
interface Vidya {
  id: string
  name: string
  state: 'none' | 'partial' | 'sourced' | 'held'
  note?: string
  highlight?: string
  guardrail?: string
}
interface LibCategory {
  id: string
  name: string
  sanskrit: string
  accent: string
  vidyas: Vidya[]
}
interface Library {
  categories: LibCategory[]
  other_holdings: { area: string; note: string }[]
}
interface Payload {
  success: boolean
  shakhas: ShakhaRecord[]
  library: Library | null
  held: HeldFile[]
  manifest: { available: boolean; records: number; packets: string[]; bytesFormatted?: string }
  totals: {
    vidyas: number
    vidyasEmpty: number
    shakhas: number
    nodes: number
    sourced: number
    heldFiles: number
    heldBytes: string
  }
}

const STATE: Record<Vidya['state'], { label: string; cls: string }> = {
  none: { label: 'nothing held', cls: 'text-rose-400/80 bg-rose-950/30 border-rose-900/50' },
  partial: { label: 'partial', cls: 'text-orange-300 bg-orange-950/40 border-orange-800/50' },
  sourced: { label: 'sourced', cls: 'text-amber-300 bg-amber-950/60 border-amber-700/60' },
  held: { label: 'held', cls: 'text-emerald-300 bg-emerald-950/60 border-emerald-700/60' },
}

const ACCENT: Record<string, string> = {
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
  sky: 'text-sky-400',
  purple: 'text-purple-400',
}

// The status enum is the whole point: a reader who sees `enumerated` learns something true.
const STATUS: Record<NodeStatus, { label: string; cls: string; help: string }> = {
  enumerated: { label: 'enumerated', cls: 'text-zinc-400 bg-zinc-900 border-zinc-700', help: 'We know it exists. That is the entire claim.' },
  sourced: { label: 'sourced', cls: 'text-amber-300 bg-amber-950/60 border-amber-700/60', help: 'Editions identified' },
  structured: { label: 'structured', cls: 'text-sky-300 bg-sky-950/60 border-sky-700/60', help: 'Broken to praśna / anuvāka / mantra' },
  voiced: { label: 'voiced', cls: 'text-emerald-300 bg-emerald-950/60 border-emerald-700/60', help: 'Deep, usable treatment' },
}

const SURVIVAL: Record<string, string> = {
  living: 'text-emerald-400',
  endangered: 'text-amber-400',
  fragmentary: 'text-orange-400',
  rediscovered: 'text-sky-400',
  lost: 'text-rose-400',
}

const VEDA_LABEL: Record<string, string> = {
  rigveda: 'Ṛgveda',
  yajurveda: 'Yajurveda',
  samaveda: 'Sāmaveda',
  atharvaveda: 'Atharvaveda',
}

function Badge({ status }: { status: NodeStatus }) {
  const s = STATUS[status] ?? STATUS.enumerated
  return (
    <span title={s.help} className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${s.cls}`}>
      {s.label}
    </span>
  )
}

export default function SourcesPage() {
  const [data, setData] = useState<Payload | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>(null)
  const [showHeld, setShowHeld] = useState(false)

  useEffect(() => {
    fetch('/api/sources')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  const byVeda = (data?.shakhas ?? []).reduce<Record<string, ShakhaRecord[]>>((acc, s) => {
    ;(acc[s.veda] ||= []).push(s)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Source documents</h1>
            <p className="text-zinc-400 mt-1 text-sm">
              The corpus is organised by <span className="text-amber-400">śākhā</span>, not by layer. There is no such
              thing as &ldquo;an Āraṇyaka&rdquo; — there is the Taittirīya Āraṇyaka <em>of</em> the Taittirīya śākhā.
            </p>
          </div>
          <Link href="/docs" className="text-sm text-zinc-400 hover:text-amber-400 underline underline-offset-4">
            uploaded documents →
          </Link>
        </div>

        {loading && <p className="mt-10 text-zinc-500">Reading the corpus…</p>}
        {!loading && !data?.success && <p className="mt-10 text-rose-400">Could not read sources.</p>}

        {data?.success && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
              {[
                ['śākhās', data.totals.shakhas],
                ['nodes', data.totals.nodes],
                ['sourced', data.totals.sourced],
                ['files held', data.totals.heldFiles],
                ['on disk', data.totals.heldBytes],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                  <div className="text-2xl font-semibold text-amber-400">{v}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{k}</div>
                </div>
              ))}
            </div>

            {data.manifest.available && (
              <p className="mt-3 text-xs text-zinc-500">
                Plus <span className="text-zinc-300">{data.manifest.records}</span> fetched records
                {data.manifest.bytesFormatted ? ` (${data.manifest.bytesFormatted})` : ''} across{' '}
                {data.manifest.packets.length} acquisition packets — files are gitignored, the manifest is tracked.
              </p>
            )}

            {data.library && (
              <section className="mt-12">
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <h2 className="text-xl font-medium">The 18 Mahāvidyās</h2>
                  <p className="text-xs text-zinc-500">
                    <span className="text-rose-400/90">{data.totals.vidyasEmpty}</span> of {data.totals.vidyas} have no
                    source text behind them
                  </p>
                </div>
                <p className="text-xs text-zinc-500 mt-1 mb-4">
                  The taxonomy is inherited, not invented. The library page shows the map; this shows what stands
                  behind it.
                </p>

                <div className="space-y-6">
                  {data.library.categories.map((cat) => (
                    <div key={cat.id}>
                      <h3 className={`text-sm font-medium ${ACCENT[cat.accent] ?? 'text-zinc-300'} mb-2`}>
                        {cat.name} <span className="text-zinc-600 font-normal">{cat.sanskrit}</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {cat.vidyas.map((v) => (
                          <div
                            key={v.id}
                            className={`rounded-lg border bg-zinc-900/30 px-3 py-2.5 ${
                              v.state === 'none' ? 'border-rose-900/40' : 'border-zinc-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm text-zinc-200">{v.name}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${STATE[v.state].cls}`}
                              >
                                {STATE[v.state].label}
                              </span>
                            </div>
                            {v.note && <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{v.note}</p>}
                            {v.highlight && (
                              <p className="text-xs text-amber-300/80 mt-1.5 leading-relaxed border-l-2 border-amber-800/50 pl-2">
                                {v.highlight}
                              </p>
                            )}
                            {v.guardrail && (
                              <p className="text-xs text-rose-300/80 mt-1.5 leading-relaxed border-l-2 border-rose-800/60 pl-2">
                                ⚠ {v.guardrail}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {data.library.other_holdings?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-zinc-300 mb-2">Other holdings</h3>
                    <div className="space-y-2">
                      {data.library.other_holdings.map((o) => (
                        <div key={o.area} className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-2.5">
                          <span className="text-sm text-zinc-200">{o.area}</span>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{o.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            <h2 className="text-xl font-medium mt-14 mb-1">The Vedic corpus, by śākhā</h2>
            <p className="text-xs text-zinc-500 mb-4">
              13 śākhās · {data.totals.nodes} nodes · {data.totals.sourced} sourced
            </p>

            {Object.entries(byVeda).map(([veda, list]) => (
              <section key={veda} className="mt-10">
                <h2 className="text-lg font-medium text-amber-400 mb-3">{VEDA_LABEL[veda] ?? veda}</h2>
                <div className="space-y-2">
                  {list.map((s) => {
                    const id = `${s.veda}/${s.organization ?? ''}/${s.shakha}`
                    const isOpen = open === id
                    return (
                      <div key={id} className="rounded-lg border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                        <button
                          onClick={() => setOpen(isOpen ? null : id)}
                          className="w-full text-left px-4 py-3 hover:bg-zinc-900/60 transition flex items-center gap-3 flex-wrap"
                        >
                          <span className="font-medium capitalize">{s.shakha}</span>
                          {s.organization && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 capitalize">
                              {s.organization}
                            </span>
                          )}
                          <span className={`text-xs ${SURVIVAL[s.survival] ?? 'text-zinc-400'}`}>{s.survival}</span>
                          <span className="ml-auto text-xs text-zinc-500">
                            <span className="text-amber-400">{s.counts.sourced}</span> / {s.counts.total} sourced
                          </span>
                          <span className="text-zinc-600 text-xs">{isOpen ? '▾' : '▸'}</span>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 border-t border-zinc-800/70">
                            <div className="mt-3 space-y-2">
                              {s.nodes.map((n) => (
                                <div key={n.kind + n.name} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="capitalize text-zinc-200">{n.name}</span>
                                    <span className="text-[10px] text-zinc-600 uppercase">{n.kind}</span>
                                    <Badge status={n.status} />
                                  </div>
                                  {n.note && <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{n.note}</p>}
                                </div>
                              ))}
                            </div>

                            {s.recitingCommunities.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Reciting communities</h4>
                                {s.recitingCommunities.map((c, i) => (
                                  <p key={i} className="text-xs text-zinc-400">
                                    <span className="text-zinc-300">{c.region}</span>
                                    {c.note ? ` — ${c.note}` : ''}
                                  </p>
                                ))}
                              </div>
                            )}

                            {s.findings.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Findings</h4>
                                <ul className="space-y-1.5">
                                  {s.findings.map((f, i) => (
                                    <li key={i} className="text-xs text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-3">
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {s.sources.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Sources</h4>
                                <ul className="space-y-1">
                                  {s.sources.map((x, i) => (
                                    <li key={i} className="text-xs text-zinc-500 leading-relaxed">
                                      • {x}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}

            <section className="mt-12">
              <button
                onClick={() => setShowHeld(!showHeld)}
                className="text-sm text-zinc-300 hover:text-amber-400 flex items-center gap-2"
              >
                <span className="text-zinc-600">{showHeld ? '▾' : '▸'}</span>
                Files held on disk ({data.totals.heldFiles})
              </button>
              {showHeld && (
                <div className="mt-3 rounded-lg border border-zinc-800 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-zinc-900/60 text-zinc-500">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium">File</th>
                        <th className="text-left px-3 py-2 font-medium">Area</th>
                        <th className="text-left px-3 py-2 font-medium">Śākhā</th>
                        <th className="text-left px-3 py-2 font-medium">Layer</th>
                        <th className="text-right px-3 py-2 font-medium">Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.held.map((f) => (
                        <tr key={f.relPath} className="border-t border-zinc-800/60 hover:bg-zinc-900/40">
                          <td className="px-3 py-1.5 text-zinc-300">{f.name}</td>
                          <td className="px-3 py-1.5 text-zinc-500">{f.area}</td>
                          <td className="px-3 py-1.5 text-zinc-500 capitalize">{f.shakha ?? '—'}</td>
                          <td className="px-3 py-1.5 text-zinc-500 capitalize">{f.layer ?? '—'}</td>
                          <td className="px-3 py-1.5 text-right text-zinc-500">{f.sizeFormatted}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <p className="mt-10 text-xs text-zinc-600 leading-relaxed border-t border-zinc-900 pt-4">
              <span className="text-zinc-500">The gaps are data.</span> A śākhā that is attested but lost still gets a
              node and an honest status. <span className="text-zinc-400">enumerated</span> means &ldquo;we know it
              exists&rdquo; — nothing more. Nearly everything is enumerated, and that is correct for year one.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
