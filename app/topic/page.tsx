import Link from 'next/link'
import { topicList } from '@/lib/anukramani'
import { Shell, Crumb } from '@/components/editorial/Shell'

/* The index of topics. Split by KIND, because the two answer different
   questions: a deity page asks "which hymns are addressed to this", a
   concept page asks "everywhere this idea appears". Lumping them together
   would bury the concepts under 213 deity names. */
export default async function Page() {
  const all = topicList()
  const deities = all.filter(t => t.kind === 'devata').sort((a, b) => b.devataOf.length - a.devataOf.length)
  const concepts = all.filter(t => t.kind === 'concept').sort((a, b) => b.verses - a.verses).slice(0, 180)

  return (
    <Shell crumb={<Crumb parts={[{ label: 'Ṛgveda', href: '/text/rv' }, { label: 'topics' }]} />}>
      <header className="vd-masthead">
        <div className="vd-masthead-ref">index</div>
        <h1 className="vd-masthead-title">Follow a word through the whole Ṛgveda</h1>
        <div className="vd-masthead-meta">
          <span><em>{deities.length} deities and persons</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>{all.length - deities.length} concepts</em></span>
        </div>
      </header>

      <p className="tp-note tp-note-lead" style={{ maxWidth: '62ch', margin: '0 auto 40px' }}>
        Every entry is built from the <strong>per-word morphology</strong>, so it indexes the
        lemma rather than the written form: <span lang="sa">indrasya</span>,{' '}
        <span lang="sa">indram</span> and <span lang="sa">indra-śatruḥ</span> all count as{' '}
        <span lang="sa">indra</span>. A search over the Devanāgarī would find none of them.
      </p>

      <section className="tp-section">
        <div className="vd-app-label">deities and persons — by sūktas addressed to them</div>
        <div className="tp-cloud">
          {deities.map(t => (
            <Link key={t.term} href={`/topic/${encodeURIComponent(t.term)}`} className="tp-chip">
              <span lang="sa">{t.term}</span>
              <span className="tp-chip-n">{t.devataOf.length}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="tp-section">
        <div className="vd-app-label">concepts — by verses they occur in</div>
        <div className="tp-cloud">
          {concepts.map(t => (
            <Link key={t.term} href={`/topic/${encodeURIComponent(t.term)}`} className="tp-chip">
              <span lang="sa">{t.term}</span>
              <span className="tp-chip-n">{t.verses}</span>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}
