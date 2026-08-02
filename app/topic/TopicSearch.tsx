'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export type Row = {
  term: string
  kind: 'devata' | 'concept' | 'rsi'
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
/* ⚠ NOBODY TYPES MACRONS. The lemmas are IAST — sudās, ṛta, uṣas — and a
   reader typing "sudas", "rta" or "usas" got zero results, which reads as
   "not in the corpus" rather than "wrong keyboard". So both the query and
   the term are folded to bare ASCII before matching. Unicode NFD splits the
   combining marks off the base letters; the ṛ/ḷ family and ś/ṣ do not
   decompose that way in every case, so they are mapped explicitly. */
const FOLD: Record<string, string> = {
  'ā': 'a', 'ī': 'i', 'ū': 'u', 'ṛ': 'r', 'ṝ': 'r', 'ḷ': 'l', 'ḹ': 'l',
  'ṅ': 'n', 'ñ': 'n', 'ṇ': 'n', 'ṭ': 't', 'ḍ': 'd', 'ś': 's', 'ṣ': 's',
  'ḥ': 'h', 'ṃ': 'm', 'ṁ': 'm', 'ĕ': 'e', 'ŏ': 'o',
}
function fold(s: string) {
  return s.toLowerCase().replace(/[^\x00-\x7F]/g, ch => FOLD[ch] ?? ch)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/* Same rule in the list: a ṛṣi is shown with his title. */
export function label(r: Row) {
  if (r.kind !== 'rsi') return r.term
  const stem = r.term.replace(/ā$/, 'as').replace(/ḥ$/, '')
  return `${stem.charAt(0).toUpperCase()}${stem.slice(1)} Ṛṣi`
}

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

  /* Fold once, not per keystroke per row. */
  const folded = useMemo(
    () => rows.map(r => ({ r, t: fold(r.term), g: r.gloss ? fold(r.gloss) : '' })),
    [rows]
  )

  const hits = useMemo(() => {
    const s = fold(q.trim())
    if (!s) return []
    /* Match the term first, then the gloss — someone typing "cow" should
       reach `go`, and someone typing "go" should not have to scroll past
       every gloss containing the word. */
    const starts: Row[] = [], contains: Row[] = [], viaGloss: Row[] = []
    for (const { r, t, g } of folded) {
      if (t.startsWith(s)) starts.push(r)
      else if (t.includes(s)) contains.push(r)
      else if (g.includes(s)) viaGloss.push(r)
    }
    /* Rank by CLOSENESS first, prominence second. Sorting on sūkta count
       alone put bhāratī above bharata for "bharat", and uṣāsānaktā above
       uṣas for "usas" — the longer compound simply heads more hymns. An
       exact match wins, then the shortest term (the least padding around
       what was typed), and only then prominence. */
    const by = (a: Row, b: Row) => {
      const ea = fold(a.term) === s ? 0 : 1
      const eb = fold(b.term) === s ? 0 : 1
      if (ea !== eb) return ea - eb
      if (a.term.length !== b.term.length) return a.term.length - b.term.length
      return (b.suktas - a.suktas) || (b.verses - a.verses)
    }
    return [...starts.sort(by), ...contains.sort(by), ...viaGloss.sort(by)].slice(0, 40)
  }, [q, folded])

  return (
    <>
      <div className="tp-search">
        <input
          className="tp-input"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="a term or its meaning — bharata, rta, soma, cow, river…"
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
                    <span className="vd-index-title" lang="sa">{label(r)}</span>
                    {r.gloss ? <span className="vd-index-sub">{r.gloss.slice(0, 110)}</span> : null}
                  </span>
                  <span className="vd-index-meta">
                    {r.kind === 'rsi' ? `ṛṣi of ${r.suktas}` : r.suktas ? `devatā of ${r.suktas}` : `${r.verses} verses`}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="tp-note">
              Terms are indexed by <strong>lemma</strong>. Diacritics are optional —
              &ldquo;rta&rdquo; finds <span lang="sa">ṛta</span>, &ldquo;usas&rdquo; finds{' '}
              <span lang="sa">uṣas</span>. Try{' '}
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
                <span className="tp-pick-term" lang="sa">{label(r)}</span>
                <span className="tp-pick-hook">{r.hook}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
