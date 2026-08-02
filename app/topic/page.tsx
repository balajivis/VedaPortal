import { topicList } from '@/lib/anukramani'
import { Shell, Crumb } from '@/components/editorial/Shell'
import { TopicSearch, type Row } from './TopicSearch'

const MAND = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/* A one-line reason to open a term, COMPUTED from the distribution rather
   than written by hand. The useful signal is concentration: a word spread
   evenly across ten maṇḍalas tells you little, while one that puts 60% of
   itself in a single book is telling you something about that book. */
function hookFor(t: ReturnType<typeof topicList>[number]): string | null {
  if (t.kind === 'rsi') {
    const n = t.rsiOf?.length ?? 0
    if (!n) return null
    const books = new Set((t.rsiOf ?? []).map(r => r.split('.')[0]))
    if (n >= 40) return `composed ${n} sūktas — one of the largest bodies in the collection`
    if (books.size > 1) return `${n} sūktas across ${books.size} maṇḍalas`
    return `composed ${n} sūktas, all in maṇḍala ${[...books][0]}`
  }
  const total = t.verses
  if (t.devataOf.length >= 25) {
    return `devatā of ${t.devataOf.length} sūktas — one of the most addressed in the corpus`
  }
  if (t.devataOf.length === 1) {
    return `addressed in exactly one sūkta of 1,028 — RV ${t.devataOf[0]}`
  }
  if (total >= 40) {
    const entries = Object.entries(t.byMandala).sort((a, b) => b[1] - a[1])
    const [top, n] = entries[0]
    const share = n / total
    if (share >= 0.45) {
      return `${Math.round(share * 100)}% of its ${total} verses fall in maṇḍala ${MAND[Number(top)]} alone`
    }
    const absent = Array.from({ length: 10 }, (_, i) => i + 1).filter(m => !t.byMandala[String(m)])
    if (absent.length >= 3 && total >= 60) {
      return `${total} verses, yet absent from maṇḍalas ${absent.map(m => MAND[m]).join(', ')}`
    }
  }
  if (t.devataOf.length >= 2 && t.devataOf.length <= 4) {
    return `only ${t.devataOf.length} sūktas are addressed to it`
  }
  if (total >= 300) return `${total} verses — a word the collection cannot do without`
  return null
}

export default async function Page() {
  const all = topicList()
  const rows: Row[] = all
    .map(t => ({
      term: t.term,
      kind: t.kind,
      verses: t.verses,
      suktas: t.kind === 'rsi' ? (t.rsiOf?.length ?? 0) : t.devataOf.length,
      gloss: t.gloss,
      hook: hookFor(t),
    }))
    .sort((a, b) => (b.suktas - a.suktas) || (b.verses - a.verses))

  const deities = rows.filter(r => r.kind === 'devata').length
  const rsis = rows.filter(r => r.kind === 'rsi').length

  return (
    <Shell crumb={<Crumb parts={[{ label: 'Ṛgveda', href: '/text/rv' }, { label: 'topics' }]} />}>
      <header className="vd-masthead">
        <div className="vd-masthead-ref">index</div>
        <h1 className="vd-masthead-title">Follow a word through the whole Ṛgveda</h1>
        <div className="vd-masthead-meta">
          <span><em>{deities} deities and persons</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>{rsis} ṛṣis</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>{rows.length - deities - rsis} concepts</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>90,536 references</em></span>
        </div>
      </header>

      <p className="tp-note tp-note-lead" style={{ maxWidth: '60ch', margin: '0 auto 26px', textAlign: 'center' }}>
        Indexed by <strong>lemma</strong>, so <span lang="sa">indrasya</span>,{' '}
        <span lang="sa">indram</span> and <span lang="sa">indra-śatruḥ</span> all count as{' '}
        <span lang="sa">indra</span> — a search over the Devanāgarī would find none of them.
      </p>

      <TopicSearch rows={rows} />
    </Shell>
  )
}
