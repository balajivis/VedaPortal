import { Fragment } from 'react'
/* =========================================================================
   Rgveda reading routes. One catch-all serves three depths:

     /text/rv            -> the ten mandalas
     /text/rv/3          -> mandala 3, all 62 hymns
     /text/rv/3.53       -> hymn 3.53, all 24 verses
     /text/rv/3.53.12    -> the verse

   Structure comes from the mirrored Anukramani, so EVERY hymn of the
   Rgveda is navigable today — 1028 of them — whether or not we hold its
   text. Where we do not, the verse renders `enumerated`, which on a spiral
   is content, not a placeholder.
   ========================================================================= */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { vedicFontsClass } from '@/components/editorial/vedic-fonts'
import { Enumerated, Badge, CanonicalAddress, Mantra, Apparatus } from '@/components/editorial/vedic-blocks'
import {
  allHymns, mandala, hymn, neighbours, verseNeighbours,
  names, spans, shifts, FAMILY, CANONICAL, verseText, hymnText, displayTokens, translations, padapatha, metre, padas, canonMetre, wilson, grammar, suktaNote,
  type SuktaNote,
} from '@/lib/anukramani'
import RV_3_53_12 from '@/lib/rv-3-53-12'

export const dynamicParams = true

function Shell({ crumb, children }: { crumb: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={vedicFontsClass}>
      <div className="ed-root vd-root">
        <div className="ed-runhead">
          <Link href="/" className="ed-crest ed-crest-link">Veda Portal</Link>
          <div className="ed-crumb">{crumb}</div>
          <div className="ed-meta-row">Ṛgveda · Śākala · Saṃhitā</div>
        </div>
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 56px 96px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

function Crumb({ parts }: { parts: { label: string; href?: string }[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 ? <span className="sep">·</span> : null}
          {p.href ? <Link href={p.href} className="ed-crumb-link">{p.label}</Link> : <span>{p.label}</span>}
        </span>
      ))}
    </>
  )
}

/** Prev / next, always across the whole corpus so nothing dead-ends. */
function PrevNext({ prev, next }: { prev: { href: string; label: string } | null; next: { href: string; label: string } | null }) {
  return (
    <nav className="vd-prevnext">
      <div>
        {prev ? (
          <Link href={prev.href} className="vd-pn">
            <span className="vd-pn-dir">← previous</span>
            <span className="vd-pn-label">{prev.label}</span>
          </Link>
        ) : null}
      </div>
      <div style={{ textAlign: 'right' }}>
        {next ? (
          <Link href={next.href} className="vd-pn">
            <span className="vd-pn-dir">next →</span>
            <span className="vd-pn-label">{next.label}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  )
}

/* The only model-written prose a reader sees. Rendered set apart, labelled
   at the TOP (not in a footer nobody reads), and stating in the body what
   the model could not see. Project rule: AI generates, tradition verifies. */
/* Sanskrit terms are written *term* in the note source. Render them as
   emphasis rather than leaking asterisks into the page. */
function emph(text: string) {
  return text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2
      ? <em key={i} lang="sa">{part.slice(1, -1)}</em>
      : <Fragment key={i}>{part}</Fragment>
  )
}

function SuktaNoteBlock({ note }: { note: SuktaNote | null }) {
  if (!note) return null
  return (
    <section className="vd-machine">
      <div className="vd-machine-head">
        <span className="vd-machine-tag">machine-written</span>
        <span className="vd-machine-meta">
          {note.model} · {note.generated} · from Wilson + Griffith
        </span>
      </div>
      <div className="vd-machine-body">
        {(note.synthesis ?? note.text ?? '').split(/\n{2,}/)
          .filter(Boolean).map((para, i) => <p key={i}>{emph(para)}</p>)}
      </div>
      {note.practice ? (
        <div className="vd-machine-living">
          <div className="vd-app-label">where it lives</div>
          {note.practice.split(/\n{2,}/).filter(Boolean)
            .map((para, i) => <p key={i}>{emph(para)}</p>)}
        </div>
      ) : null}

      {note.disagreements ? (
        <div className="vd-machine-split">
          <div className="vd-app-label">how it has been read</div>
          {note.disagreements.split(/\n{2,}/).filter(Boolean)
            .map((para, i) => <p key={i}>{emph(para)}</p>)}
        </div>
      ) : null}
      <p className="vd-machine-foot">
        Written from the two English translations only — this model did not read the
        Sanskrit, and no traditional scholar has reviewed it. Treat it as orientation,
        not as a reading.
      </p>
    </section>
  )
}

export default async function Page({ params }: { params: Promise<{ ref?: string[] }> }) {
  const { ref } = await params
  const raw = (ref ?? []).join('/')
  const seg = raw ? raw.split('.').map(Number) : []
  if (seg.some(n => !Number.isFinite(n))) notFound()

  /* ---------------------------------------------------------- /text/rv */
  if (seg.length === 0) {
    const all = allHymns()
    return (
      <Shell crumb={<Crumb parts={[{ label: 'Ṛgveda' }]} />}>
        <div className="vd-eyebrow">Śākala śākhā · saṃhitā · 1,028 hymns · 10,552 ṛcs</div>
        <h1 className="vd-title">The <em>Ṛgveda.</em></h1>
        <p className="vd-page-lede">
          Ten maṇḍalas. Books 2–7 are the family books — one ṛṣi lineage each, the oldest
          core. Books 1 and 10 are the late outer envelope. Book 9 differs on a different
          axis entirely: it is filed by <em>deity</em>, pulled from all families into one
          liturgical unit for the soma-pressing — a re-filing, not necessarily a later layer.
        </p>
        <div className="vd-index">
          {CANONICAL.map((count, i) => {
            const m = i + 1
            const verses = mandala(m).reduce((a, h) => a + h.verses, 0)
            return (
              <Link key={m} href={`/text/rv/${m}`} className="vd-index-row">
                <span className="vd-index-num">{m}</span>
                <span className="vd-index-main">
                  <span className="vd-index-title">Maṇḍala {m}</span>
                  <span className="vd-index-sub">{FAMILY[m]}</span>
                </span>
                <span className="vd-index-meta">{count} hymns · {verses} ṛcs</span>
              </Link>
            )
          })}
        </div>
        <p className="vd-note">
          Structure is from the Anukramaṇī — the tradition’s own index, giving ṛṣi, devatā and
          chandas for every hymn. The accented Saṃhitā text is held in full:{' '}
          <strong>all {all.length.toLocaleString()} hymns, 10,552 ṛcs</strong>, verified
          hymn-by-hymn against the Anukramaṇī’s own verse counts. The apparatus — padapāṭha,
          morphology, commentary, translation — is <strong>not</strong>, and each verse says so.
        </p>
      </Shell>
    )
  }

  /* -------------------------------------------------------- /text/rv/3 */
  if (seg.length === 1) {
    const m = seg[0]
    const hymns = mandala(m)
    if (!hymns.length) notFound()
    return (
      <Shell crumb={<Crumb parts={[{ label: 'Ṛgveda', href: '/text/rv' }, { label: `Maṇḍala ${m}` }]} />}>
        <div className="vd-eyebrow">{FAMILY[m]}</div>
        <h1 className="vd-title">Maṇḍala <em>{m}.</em></h1>
        <p className="vd-page-lede">
          {hymns.length} hymns · {hymns.reduce((a, h) => a + h.verses, 0)} ṛcs.
          Each row carries the Anukramaṇī’s own ascription. Where a deity or metre
          <em> shifts mid-hymn</em>, that is marked — the tradition recorded the verse ranges,
          and flattening them to one label would lose the finding.
        </p>
        <div className="vd-index">
          {hymns.map(h => (
            <Link key={h.ref} href={`/text/rv/${h.ref}`} className="vd-index-row">
              <span className="vd-index-num">{h.sukta}</span>
              <span className="vd-index-main">
                <span className="vd-index-title">
                  {names(h.devataRaw)[0] ?? '—'}
                  {shifts(h.devataRaw) ? <span className="vd-shift"> +{names(h.devataRaw).length - 1} more</span> : null}
                </span>
                <span className="vd-index-sub">
                  {h.rishi || <em>ṛṣi not recorded in the source</em>} · {names(h.chandasRaw).join(', ')}
                </span>
              </span>
              <span className="vd-index-meta">{h.verses} ṛcs</span>
            </Link>
          ))}
        </div>
        <PrevNext
          prev={m > 1 ? { href: `/text/rv/${m - 1}`, label: `Maṇḍala ${m - 1}` } : null}
          next={m < 10 ? { href: `/text/rv/${m + 1}`, label: `Maṇḍala ${m + 1}` } : null}
        />
      </Shell>
    )
  }

  /* ----------------------------------------------------- /text/rv/3.53 */
  if (seg.length === 2) {
    const [m, s] = seg
    const h = hymn(m, s)
    if (!h) notFound()
    const { prev, next } = neighbours(m, s)
    const dv = spans(h.devataRaw)
    const ch = spans(h.chandasRaw)
    return (
      <Shell crumb={<Crumb parts={[
        { label: 'Ṛgveda', href: '/text/rv' },
        { label: `Maṇḍala ${m}`, href: `/text/rv/${m}` },
        { label: `Sūkta ${s}` },
      ]} />}>
        <div className="vd-eyebrow">
          ṛṣi {h.rishi || '— not recorded'} · {h.verses} ṛcs
        </div>
        <h1 className="vd-title">RV <em>{h.ref}.</em></h1>

        <div className="vd-ascription">
          <div>
            <div className="vd-app-label">devatā{dv.length > 1 ? <span className="era">shifts mid-hymn</span> : null}</div>
            <ul className="vd-spanlist">
              {dv.map((d, i) => <li key={i}><span className="vd-range">{d.range ?? 'all'}</span> {d.name}</li>)}
            </ul>
          </div>
          <div>
            <div className="vd-app-label">chandas{ch.length > 1 ? <span className="era">shifts mid-hymn</span> : null}</div>
            <ul className="vd-spanlist">
              {ch.map((c, i) => <li key={i}><span className="vd-range">{c.range ?? 'all'}</span> {c.name}</li>)}
            </ul>
          </div>
        </div>

        <SuktaNoteBlock note={suktaNote(m, s)} />

        <div className="vd-index">
          {hymnText(m, s).map((text, i) => (
            <Link key={i} href={`/text/rv/${h.ref}.${i + 1}`} className="vd-index-row vd-verse-row">
              <span className="vd-index-num">{i + 1}</span>
              <span className="vd-index-main">
                <span className="vd-verse-line" lang="sa">{text}</span>
              </span>
              <span className="vd-index-meta">
                {ch.find(c => !c.range || inRange(c.range, i + 1))?.name ?? ''}
              </span>
            </Link>
          ))}
        </div>

        <PrevNext
          prev={prev ? { href: `/text/rv/${prev.ref}`, label: `RV ${prev.ref}` } : null}
          next={next ? { href: `/text/rv/${next.ref}`, label: `RV ${next.ref}` } : null}
        />
      </Shell>
    )
  }

  /* -------------------------------------------------- /text/rv/3.53.12 */
  const [m, s, v] = seg
  const h = hymn(m, s)
  if (!h || v < 1 || v > h.verses) notFound()
  const vn = verseNeighbours(m, s, v)
  const key = `${m}.${s}.${v}`
  const nav = (
    <PrevNext
      prev={vn.prev ? { href: `/text/rv/${vn.prev}`, label: `RV ${vn.prev}` } : null}
      next={vn.next ? { href: `/text/rv/${vn.next}`, label: `RV ${vn.next}` } : null}
    />
  )

  const crumb = <Crumb parts={[
    { label: 'Ṛgveda', href: '/text/rv' },
    { label: `Maṇḍala ${m}`, href: `/text/rv/${m}` },
    { label: `Sūkta ${s}`, href: `/text/rv/${m}.${s}` },
    { label: `ṛc ${v}` },
  ]} />

  if (key === '3.53.12') {
    return <Shell crumb={crumb}><RV_3_53_12 nav={nav} /></Shell>
  }

  const dv = spans(h.devataRaw).find(d => !d.range || inRange(d.range, v))
  const ch = spans(h.chandasRaw).find(c => !c.range || inRange(c.range, v))
  const text = verseText(m, s, v)
  const trs = translations(m, s, v)
  const pada = padapatha(m, s, v)
  const met = metre(m, s, v)
  const wil = wilson(m, s, v)
  const gram = grammar(m, s, v)
  // Metrical lineation: break by pada where the verse actually scans.
  // Where it does not, fall back to danda hemistichs rather than forcing a
  // shape the text does not have.
  const padaLines = met && text ? padas(text, met.padaLengths) : null

  return (
    <Shell crumb={crumb}>
      <div className="vd-eyebrow">
        ṛṣi {h.rishi || '— not recorded'} · devatā {dv?.name ?? '—'} · {ch?.name ?? '—'}
      </div>
      <h1 className="vd-title">RV <em>{key}.</em></h1>

      {text ? (
        <Mantra
          tokens={
            padaLines
              ? padaLines.flatMap((line, li) => {
                  const toks = displayTokens(line)
                  // Pada structure SUPERSEDES the danda. Clear every break the
                  // tokeniser set, then break once at the end of each pada —
                  // otherwise a danda sitting on a pada boundary breaks twice
                  // and lands on a line of its own.
                  for (const t of toks) delete t.breakAfter
                  const last = toks[toks.length - 1]
                  if (last && li < padaLines.length - 1) last.breakAfter = true
                  return toks
                })
              : displayTokens(text)
          }
          addr={{ corpus: 'RV', ref: key, recension: 'Śākala' }}
          mantraType="semantic"
          status="sourced"
        />
      ) : (
        <Enumerated claim={<>We hold no text for this ṛc.</>} />
      )}

      <Apparatus rows={[
        ...(met ? [{
          label: 'chandas',
          era: met.stated ? `[TRAD · Anukramaṇī: ${met.stated}]` : undefined,
          provenance: 'emic_intext' as const,
          contested: !!(met.stated && (canonMetre(met.stated) !== met.computed || met.delta !== 0)),
          body: (
            <>
              {/* Two different claims, from two different sources. Never render them as one
                  line: the count is ours and measured, the shape is the tradition's and
                  canonical. Showing "23 syllables · 8+8+8" states a contradiction as a fact. */}
              <p>
                <strong>{met.syllables} akṣaras</strong> counted in the saṃhitā-pāṭha
                {padaLines ? <> · displayed by pāda</> : null}
              </p>
              {met.padaLengths ? (
                <p style={{ marginTop: 4 }}>
                  <em>{canonMetre(met.stated)}</em> wants {met.padaLengths.join('+')} ={' '}
                  {met.padaLengths.reduce((a, b) => a + b, 0)}
                </p>
              ) : null}
              {met.delta !== 0 || canonMetre(met.stated) !== met.computed ? (
                <p style={{ marginTop: 8 }}>
                  {canonMetre(met.stated) !== met.computed ? (
                    <>The Anukramaṇī states <em>{met.stated}</em>; the count is nearest{' '}
                    <em>{met.computed}</em>. </>
                  ) : null}
                  {met.delta !== 0 ? (
                    <>Short by {Math.abs(met.delta)} {Math.abs(met.delta) === 1 ? 'syllable' : 'syllables'}
                    {met.delta > 0 ? ' (long, in fact)' : ''}. </>
                  ) : null}
                  <strong>This is expected, and it is not an error in the text.</strong> Vedic
                  metre cannot be counted from the saṃhitā-pāṭha: sandhi contracts vowels the
                  metre requires separate — <em>viśvāni abhi</em> is written{' '}
                  <em>viśvāny abhi</em> and loses a syllable. Measured corpus-wide, only 29.9% of
                  ṛcs scan from the saṃhitā-pāṭha and 32.5% from the padapāṭha, so neither
                  transmitted text yields the metre. That is what a metrically restored edition
                  (van Nooten &amp; Holland) is for, and we do not yet hold one.
                  <strong> Recorded as a disagreement, not resolved.</strong>
                </p>
              ) : null}
            </>
          ),
        }] : []),
        ...(pada ? [{
          label: 'padapāṭha',
          era: '[TRAD · sandhi resolved]',
          provenance: 'emic_intext' as const,
          body: (
            <>
              <p style={{ fontStyle: 'italic' }}>{pada}</p>
              <p style={{ fontSize: 13.5, color: 'var(--ed-muted)', marginTop: 8 }}>
                The tradition’s own word division — sandhi resolved ~2,500 years ago.
                GRETIL’s witness is IAST and <strong>unaccented</strong>, so it gives the
                boundaries but not each word’s independent accent.
              </p>
            </>
          ),
        }] : []),
      ]} />

      {wil ? (
        <Apparatus rows={[{
          label: 'Wilson',
          era: '[MOD-1866 · follows Sāyaṇa]',
          provenance: 'native_posthoc' as const,
          lead: true,
          body: (
            <>
              <p>{wil}</p>
              <p style={{ fontSize: 13.5, color: 'var(--ed-muted)', marginTop: 8 }}>
                Wilson translates <strong>following Sāyaṇa throughout</strong> — so this is the
                traditional 14th-century reading rendered into English, not an independent
                Victorian one. Set it against Griffith below.
              </p>
            </>
          ),
        }]} />
      ) : null}

      {gram ? (
        <Apparatus rows={[{
          label: 'word by word',
          era: `[${gram.length} words]`,
          provenance: 'modern_etic' as const,
          body: (
            <div className="vd-grammar">
              <div className="vd-gram-head">
                <span>form</span><span>lemma</span><span>morphology</span><span>sense</span>
              </div>
              {gram.map((w, i) => (
                <div key={i} className="vd-gram-row">
                  <span className="vd-gram-surface" lang="sa">{w.surface}</span>
                  <span className="vd-gram-lemma" lang="sa">{w.lemma ?? '—'}</span>
                  <span className="vd-gram-morph">{w.morph ?? ''}</span>
                  <span className="vd-gram-gloss">{w.gloss ?? ''}</span>
                </div>
              ))}
            </div>
          ),
        }]} />
      ) : null}

      {trs.length ? (
        <Apparatus rows={trs.map(t => ({
          label: t.label,
          era: t.era,
          provenance: 'modern_etic' as const,
          body: (
            <>
              <p>{t.text}</p>
              {t.divergentDivision ? (
                <p style={{ fontSize: 14, color: 'var(--ed-muted)', fontStyle: 'italic', marginTop: 8 }}>
                  ⚠ This translator divides the hymn differently from the Anukramaṇī, so the
                  verse-to-verse join is approximate here. Recorded, not smoothed.
                </p>
              ) : null}
            </>
          ),
        }))} />
      ) : null}

      <Enumerated
        status="sourced"
        claim={<>The Sanskrit and an English rendering are here. The rest of the apparatus is not.</>}
        note={
          <>
            No padapāṭha join, no morphology, no Sāyaṇa, no Wilson yet — so
            the word divisions above are <strong>whitespace segmentation of the saṃhitā-pāṭha</strong>,
            marked machine-split, not the tradition&rsquo;s own padapāṭha. GRETIL&rsquo;s Ṛgveda
            padapāṭha is complete for Śākala and is the next join.
            {' '}<Link href="/text/rv/3.53.12" className="ed-crumb-link">RV 3.53.12</Link> shows
            what a fully worked anchor looks like.
          </>
        }
      />
      {nav}
    </Shell>
  )
}

/** "1-9,11,14-15" contains v? */
function inRange(range: string, v: number): boolean {
  return range.split(',').some(part => {
    const [a, b] = part.split('-').map(Number)
    return b === undefined ? a === v : v >= a && v <= b
  })
}
