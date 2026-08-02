'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export type Row = {
  term: string
  kind: 'devata' | 'concept'
  verses: number
  suktas: number
  gloss: string | null
  /** A one-line reason this term is worth opening — computed, not written. */
  hook: string | null
}

/* =========================================================================
   Search, not a wall. 1,111 terms listed in full is a directory nobody
   reads; a box you type into plus a handful of live examples is a door.

   The featured set is chosen ON MOUNT rather than on the server, because a
   server-side shuffle would either be identical on every request (static)
   or mismatch on hydration. Picking client-side after mount avoids both.
   ========================================================================= */
export function TopicSearch({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState('')
  const [picks, setPicks] = useState<Row[] | null>(null)

  const interesting = useMemo(() => rows.filter(r => r.hook), [rows])

  const shuffle = () => {
    const pool = [...interesting]
    const out: Row[] = []
    while (out.length < 6 && pool.length) {
      out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
    }
    setPicks(out)
  }
  useEffect(shuffle, [])   // first set arrives after mount; no hydration mismatch

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    /* Match the term first, then the gloss — someone typing "cow" should
       reach `go`, and someone typing "go" should not have to scroll past
       every gloss containing the word. */
    const starts: Row[] = [], contains: Row[] = [], viaGloss: Row[] = []
    for (const r of rows) {
      if (r.term.startsWith(s)) starts.push(r)
      else if (r.term.includes(s)) contains.push(r)
      else if (r.gloss?.toLowerCase().includes(s)) viaGloss.push(r)
    }
    const by = (a: Row, b: Row) => (b.suktas - a.suktas) || (b.verses - a.verses)
    return [...starts.sort(by), ...contains.sort(by), ...viaGloss.sort(by)].slice(0, 40)
  }, [q, rows])

  return (
    <>
      <div className="tp-search">
        <input
          className="tp-input"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="a term, or its meaning — soma, ṛta, cow, river, dawn…"
          autoComplete="off"
          spellCheck={false}
          aria-label="Search topics"
        />
        {q ? (
          <button className="tp-clear" onClick={() => setQ('')} aria-label="Clear">clear</button>
        ) : null}
      </div>

      {q.trim() ? (
        <section className="tp-section">
          <div className="vd-app-label">
            {hits.length ? `${hits.length}${hits.length === 40 ? '+' : ''} matching` : 'nothing matches'}
          </div>
          {hits.length ? (
            <div className="vd-index">
              {hits.map(r => (
                <Link key={r.term} href={`/topic/${encodeURIComponent(r.term)}`} className="vd-index-row">
                  <span className="vd-index-main">
                    <span className="vd-index-title" lang="sa">{r.term}</span>
                    {r.gloss ? <span className="vd-index-sub">{r.gloss.slice(0, 110)}</span> : null}
                  </span>
                  <span className="vd-index-meta">
                    {r.suktas ? `devatā of ${r.suktas}` : `${r.verses} verses`}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="tp-note">
              Terms are indexed by <strong>lemma</strong> in IAST — try{' '}
              <button className="tp-inline" onClick={() => setQ('agni')}>agni</button>,{' '}
              <button className="tp-inline" onClick={() => setQ('ṛta')}>ṛta</button>, or an
              English sense like{' '}
              <button className="tp-inline" onClick={() => setQ('river')}>river</button>.
            </p>
          )}
        </section>
      ) : (
        <section className="tp-section">
          <div className="vd-app-label">
            a few worth following
            <button className="tp-shuffle" onClick={shuffle}>show me others</button>
          </div>
          <div className="tp-picks">
            {(picks ?? []).map(r => (
              <Link key={r.term} href={`/topic/${encodeURIComponent(r.term)}`} className="tp-pick">
                <span className="tp-pick-term" lang="sa">{r.term}</span>
                <span className="tp-pick-hook">{r.hook}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
