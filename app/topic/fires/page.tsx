import Link from 'next/link'
import { Shell, Crumb } from '@/components/editorial/Shell'

/* =========================================================================
   THE RITUAL FIRES.

   ⚠ Same framing as /topic/priests. The arrangement belongs to the Veda as
   a whole: the saṃhitā is its mantra portion and the brāhmaṇa its manual
   portion, and a fire named in one is not absent from or later than the
   other. This page reports WHERE each is named.

   Attestations counted from the padapāṭha of all ten maṇḍalas. The result
   is stark and is the point: of the fires Sāyaṇa names at RV 1.1.4, only
   GĀRHAPATYA is named in the Ṛgveda, twice. The arrangement is set out in
   the manual portion; the saṃhitā recites into it.
   ========================================================================= */

type Fire = {
  name: string
  where: string
  shape: string
  work: string
  verses: number
  refs?: string[]
}

const HOUSEHOLD: Fire[] = [
  { name: 'gārhapatya', where: 'west', shape: 'round', work: 'the householder’s own fire, kept alight; every other fire is taken from it', verses: 2, refs: ['1.15.12', '6.15.19'] },
  { name: 'āhavanīya', where: 'east', shape: 'square', work: 'the fire the offering is poured into', verses: 0 },
  { name: 'dakṣiṇāgni', where: 'south', shape: 'semicircular', work: 'also anvāhāryapacana — receives the offerings to the ancestors', verses: 0 },
]

const SOMA: Fire[] = [
  { name: 'āgnīdhrīya', where: 'the agnīdh’s hearth', shape: '—', work: 'tended by the agnīdh, who kindles', verses: 0 },
  { name: 'mārjālīya', where: 'south of the vedi', shape: '—', work: 'where the vessels are cleansed', verses: 0 },
  { name: 'dhiṣṇya', where: 'the hearths generally', shape: '—', work: 'the collective term for the soma-ground hearths, one to each officiant', verses: 15, refs: ['1.117.19', '1.181.3', '1.182.1'] },
]

function Row({ f }: { f: Fire }) {
  return (
    <div className={`pr-row ${f.verses ? '' : 'pr-unnamed'}`}>
      <span className="pr-name" lang="sa">{f.name}</span>
      <span className="pr-gloss">
        {f.work}
        {f.where !== '—' && f.shape !== '—' ? (
          <span className="fi-place"> · {f.where}, {f.shape}</span>
        ) : f.where !== '—' ? <span className="fi-place"> · {f.where}</span> : null}
      </span>
      <span className="pr-att">
        {f.verses ? (
          <>
            <strong>{f.verses}</strong> {f.verses === 1 ? 'verse' : 'verses'}
            {f.refs?.length ? (
              <> · {f.refs.slice(0, 2).map((r, i) => (
                <span key={r}>{i > 0 ? ', ' : ''}<Link href={`/text/rv/${r}`} className="vd-xref">{r}</Link></span>
              ))}</>
            ) : null}
          </>
        ) : <em>named in the brāhmaṇa</em>}
      </span>
    </div>
  )
}

export default async function Page() {
  return (
    <Shell crumb={<Crumb parts={[
      { label: 'Ṛgveda', href: '/text/rv' },
      { label: 'topics', href: '/topic' },
      { label: 'the ritual fires' },
    ]} />}>
      <header className="vd-masthead">
        <div className="vd-masthead-ref">reference</div>
        <h1 className="vd-masthead-title">The Ritual Fires</h1>
        <div className="vd-masthead-meta">
          <span><em>three for the household</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>more for the soma ground</em></span>
        </div>
      </header>

      <p className="pr-lede">
        A śrauta offering is made not into one fire but into an arrangement of them, set at
        fixed points around the ground. The fires are named across the Veda as a whole — the
        <strong> saṃhitā</strong> is its mantra portion and the <strong>brāhmaṇa</strong> its
        manual portion, and the arrangement is set out in the manual while the mantras are
        recited into it.
      </p>

      <p className="pr-note">
        The Ṛgveda names very little of it directly, and that is worth seeing plainly rather
        than smoothing over. Of the fires named in the commentary on{' '}
        <Link href="/text/rv/1.1.4" className="vd-xref">RV 1.1.4</Link>, only{' '}
        <em lang="sa">gārhapatya</em> occurs in the Saṃhitā, twice. What the Saṃhitā does carry
        is <em lang="sa">dhiṣṇya</em>, the collective word for the hearths, in fifteen verses.
        Counts are from the padapāṭha of all ten maṇḍalas.
      </p>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span lang="sa">The three fires of the household</span>
          <span className="pr-veda">gṛhya &amp; śrauta</span>
        </h2>
        <p className="pr-note pr-note-tight">
          The gārhapatya is the one that is kept — established at marriage and not allowed to
          go out. The other two are taken from it, so the offering fire and the ancestors&rsquo;
          fire are both, in the end, the household&rsquo;s own fire carried to another place.
        </p>
        <div className="pr-grid">{HOUSEHOLD.map(f => <Row key={f.name} f={f} />)}</div>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span lang="sa">The hearths of the soma ground</span>
          <span className="pr-veda">dhiṣṇya</span>
        </h2>
        <p className="pr-note pr-note-tight">
          A soma offering adds hearths, one to each officiant, and these are what the
          commentary on RV 1.1.4 has in view when it reads <em lang="sa">viśvataḥ</em> — on
          every side — as a description of the ground rather than a figure of speech. Agni
          does not surround the offering metaphorically; the fires stand around it.
        </p>
        <div className="pr-grid">{SOMA.map(f => <Row key={f.name} f={f} />)}</div>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading"><span>Why it matters at RV 1.1.4</span></h2>
        <p className="pr-note pr-note-tight">
          <Link href="/text/rv/1.1.4" className="vd-xref">RV 1.1.4</Link> says the yajña Agni
          encompasses <em lang="sa">viśvataḥ</em>, on every side, reaches the devas — and calls
          that offering <Link href="/topic/adhvara" className="vd-xref">adhvara</Link>, the rite
          nothing breaks into. Read against the arrangement, the two words are one statement:
          the offering is whole because it is enclosed, and what encloses it is fire on every
          side. That is why the sūkta asks for protection of the adhvara rather than of the
          yajña.
        </p>
      </section>
    </Shell>
  )
}
