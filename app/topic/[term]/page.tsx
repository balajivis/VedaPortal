import Link from 'next/link'
import { notFound } from 'next/navigation'
import { topic, topicList, topicNote } from '@/lib/anukramani'
import { Shell, Crumb } from '@/components/editorial/Shell'

/* =========================================================================
   TOPIC PAGE — every occurrence of a term across the Ṛgveda.

   Built on the LEMMA, not the surface string: `indrasya`, `indram` and
   `indra-śatruḥ` all land here, and a Devanāgarī substring search would have
   caught none of them. That is what the per-word morphology bought us.

   The page answers three questions a reader following a term actually has:
     · what does it mean, and how often does it occur
     · where is it CONCENTRATED — the maṇḍala distribution is itself a
       finding, and a flat count would hide it
     · which sūktas are addressed TO it, and which notes discuss it
   ========================================================================= */

export const dynamicParams = true

export async function generateStaticParams() {
  // Pre-render the ones a reader is most likely to reach for; the rest
  // render on demand.
  return topicList()
    .sort((a, b) => (b.devataOf.length - a.devataOf.length) || (b.verses - a.verses))
    .slice(0, 60)
    .map(t => ({ term: encodeURIComponent(t.term) }))
}

/* Same inline markup as the sūkta notes: **bold**, *term*, {{topic}},
   [[1.32]] and [text](/path). Kept in sync deliberately — a reader should
   not meet two different link conventions in one corpus. */
function inline(text: string, key = 'x'): React.ReactNode[] {
  /* Bold may CONTAIN other markup — `**[*dakṣa*](/topic/dakṣa) is …**` is a
     linked italic term inside a bold lead-in, and it is common. The old
     pattern was `\*\*[^*\n]+\*\*`, which forbade any `*` between the
     delimiters, so that construction never matched as bold; the stray
     asterisks then paired up wrongly and corrupted everything after them on
     the line. Bold now matches anything up to the next `**`. */
  const RE = /(\*\*(?:(?!\*\*)[^\n])+\*\*|\*[^*\n]+\*|\{\{[^}]+\}\}|\[\[[\d.]+\]\]|\[[^\]\n]+\]\([^)\s]+\))/g
  return text.split(RE).map((part, i) => {
    const k = `${key}-${i}`
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
      return <strong key={k}>{inline(part.slice(2, -2), k)}</strong>
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
      return <em key={k} lang="sa">{inline(part.slice(1, -1), k)}</em>
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const x = part.slice(2, -2).trim()
      return <Link key={k} href={`/topic/${encodeURIComponent(x)}`} className="vd-topic" lang="sa">{x}</Link>
    }
    const md = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
    if (md) return <Link key={k} href={md[2]} className="vd-xref">{inline(md[1], k)}</Link>
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const r = part.slice(2, -2)
      return <Link key={k} href={`/text/rv/${r}`} className="vd-xref">RV {r}</Link>
    }
    return <span key={k}>{part}</span>
  })
}

function Bars({ byMandala }: { byMandala: Record<string, number> }) {
  const max = Math.max(1, ...Object.values(byMandala))
  return (
    <div className="tp-bars">
      {Array.from({ length: 10 }, (_, i) => {
        const m = i + 1
        const n = byMandala[String(m)] ?? 0
        return (
          <Link key={m} href={`/text/rv/${m}`} className="tp-bar-col" title={`Maṇḍala ${m} — ${n} verses`}>
            <span className="tp-bar-track">
              <span className="tp-bar-fill" style={{ height: `${Math.round((n / max) * 100)}%` }} />
            </span>
            <span className="tp-bar-n">{n || '·'}</span>
            <span className="tp-bar-m">{m}</span>
          </Link>
        )
      })}
    </div>
  )
}

/* A ṛṣi is a person and the tradition does not name one without his title.
   The index key is the bare Anukramaṇī stem (`madhucchandā`, visarga
   stripped for matching); what a reader sees is *Madhucchandas Ṛṣi*. */
function displayName(t: { term: string; kind: string }) {
  if (t.kind !== 'rsi') return t.term
  const stem = t.term.replace(/ā$/, 'as').replace(/ḥ$/, '')
  return `${stem.charAt(0).toUpperCase()}${stem.slice(1)} Ṛṣi`
}

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params
  const t = topic(decodeURIComponent(term))
  if (!t) notFound()
  const analysis = topicNote(t.term)

  /* Group the devatā sūktas by maṇḍala so a run like "M9 has 114 of them"
     is visible rather than buried in a flat list of 273 links. */
  const byM = new Map<number, string[]>()
  for (const ref of t.devataOf) {
    const m = Number(ref.split('.')[0])
    if (!byM.has(m)) byM.set(m, [])
    byM.get(m)!.push(ref)
  }

  /* Verse occurrences, grouped the same way. For a CONCEPT this is the
     whole point of the page — ṛta has no sūkta addressed to it, so its
     417 verses are the only backlinks it has. */
  const versesByM = new Map<number, string[]>()
  for (const ref of t.refs) {
    const m = Number(ref.split('.')[0])
    if (!versesByM.has(m)) versesByM.set(m, [])
    versesByM.get(m)!.push(ref)
  }

  return (
    <Shell crumb={<Crumb parts={[
      { label: 'Ṛgveda', href: '/text/rv' },
      { label: 'topics', href: '/topic' },
      { label: displayName(t) },
    ]} />}>
        <header className="vd-masthead">
          <div className="vd-masthead-ref">{t.kind === 'rsi' ? 'ṛṣi' : t.kind === 'devata' ? 'devatā' : 'topic'}</div>
          <h1 className="vd-masthead-title" lang="sa">{displayName(t)}</h1>
          {t.gloss ? <p className="tp-gloss">{t.gloss}</p> : null}
          <div className="vd-masthead-meta">
            {t.verses > 0 ? <span><em>{t.verses.toLocaleString()} verses</em></span> : null}
            {t.rsiOf?.length ? (
              <>
                <span className="vd-masthead-dot">·</span>
                <span><em>ṛṣi of {t.rsiOf.length} sūktas</em></span>
              </>
            ) : null}
            {t.devataOf.length ? (
              <>
                <span className="vd-masthead-dot">·</span>
                <span><em>devatā of {t.devataOf.length} sūktas</em></span>
              </>
            ) : null}
            {t.incoming.length ? (
              <>
                <span className="vd-masthead-dot">·</span>
                <span><em>{t.incoming.length} notes</em></span>
              </>
            ) : null}
          </div>
        </header>

        {t.verses === 0 && t.devataOf.length ? (
          <p className="tp-note tp-note-lead" style={{ maxWidth: '62ch', margin: '0 auto 30px' }}>
            ⚠ No verse count here, and that is a property of the apparatus rather than of the
            text. The Anukramaṇī names <span lang="sa">{t.term}</span> as devatā of{' '}
            {t.devataOf.length} sūktas, but the per-word morphology splits the compound into
            its parts, so no single lemma matches. The sūkta list below is complete; the
            verse-level index is not available for this term.
          </p>
        ) : null}

        {t.verses > 0 ? (
        <section className="tp-section">
          <div className="vd-app-label">where it occurs</div>
          <Bars byMandala={t.byMandala} />
          <p className="tp-note">
            Counted on the <strong>lemma</strong>, not the written word — every inflected
            form and compound counts once per verse. A search over the Devanāgarī would
            miss most of these.
          </p>
        </section>
        ) : null}

        {analysis ? (
          <section className="tp-section tp-analysis">
            <div className="vd-app-label">
              what the word carries
              <span className={analysis.kind === 'edited' ? 'tp-edited' : 'tp-machine'}>
                {analysis.kind === 'edited' ? 'edited & reviewed' : 'machine-written'}
              </span>
            </div>
            {analysis.text.split('\n\n').filter(Boolean).map((p, i) => (
              <p key={i}>{inline(p, `a${i}`)}</p>
            ))}
            <p className="tp-prov">
              {analysis.kind === 'edited'
                ? <>Read against the sources and revised by hand — reviewed by {analysis.editor}
                    {analysis.reviewed ? <>, {analysis.reviewed}</> : null}.
                    {analysis.sources?.length ? <> Drawn from {analysis.sources.join('; ')}.</> : null}</>
                : <>Written from the counted distribution and the apparatus; not yet read
                    against the sources by hand.</>}
            </p>
          </section>
        ) : null}

        {t.rsiOf?.length ? (
          <section className="tp-section">
            <div className="vd-app-label">
              sūktas composed by this ṛṣi
              {t.rsiNames?.length ? (
                <span className="tp-fullname"> — {t.rsiNames.join(' · ')}</span>
              ) : null}
            </div>
            {(() => {
              const g = new Map<number, string[]>()
              for (const r of t.rsiOf) {
                const mm = Number(r.split('.')[0])
                if (!g.has(mm)) g.set(mm, [])
                g.get(mm)!.push(r)
              }
              return [...g.entries()].sort((a, b) => a[0] - b[0]).map(([mm, refs]) => (
                <div key={mm} className="tp-mrow">
                  <span className="tp-mlabel">maṇḍala {mm} <span className="tp-mcount">{refs.length}</span></span>
                  <span className="tp-reflist">
                    {refs.map(r => <Link key={r} href={`/text/rv/${r}`} className="tp-ref">{r}</Link>)}
                  </span>
                </div>
              ))
            })()}
          </section>
        ) : null}

        {t.devataOf.length ? (
          <section className="tp-section">
            <div className="vd-app-label">sūktas addressed to it</div>
            {[...byM.entries()].sort((a, b) => a[0] - b[0]).map(([m, refs]) => (
              <div key={m} className="tp-mrow">
                <span className="tp-mlabel">maṇḍala {m}</span>
                <span className="tp-reflist">
                  {refs.map(r => (
                    <Link key={r} href={`/text/rv/${r}`} className="tp-ref">{r}</Link>
                  ))}
                </span>
              </div>
            ))}
          </section>
        ) : null}

        {t.incoming.length ? (
          <section className="tp-section">
            <div className="vd-app-label">discussed in these notes</div>
            <div className="vd-index">
              {t.incoming.map(x => (
                <Link key={x.ref} href={`/text/rv/${x.ref}`} className="vd-index-row">
                  <span className="vd-index-num">{x.ref}</span>
                  <span className="vd-index-main">
                    <span className="vd-index-title">{x.title ?? '—'}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {t.refs.length ? (
        <section className="tp-section">
          <div className="vd-app-label">every verse it occurs in</div>
          {t.kind === 'concept' ? (
            <p className="tp-note tp-note-lead">
              No sūkta is addressed to <span lang="sa">{t.term}</span> — it is a concept,
              not a deity, so these occurrences <em>are</em> its backlinks. Every one is
              listed; nothing is sampled.
            </p>
          ) : null}
          {[...versesByM.entries()].sort((a, b) => a[0] - b[0]).map(([m, refs]) => (
            <div key={m} className="tp-mrow">
              <span className="tp-mlabel">maṇḍala {m} <span className="tp-mcount">{refs.length}</span></span>
              <span className="tp-reflist tp-verses">
                {refs.map(r => (
                  <Link key={r} href={`/text/rv/${r}`} className="tp-ref">{r}</Link>
                ))}
              </span>
            </div>
          ))}
        </section>
        ) : null}
    </Shell>
  )
}
