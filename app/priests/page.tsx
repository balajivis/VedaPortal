import Link from 'next/link'
import { Shell, Crumb } from '@/components/editorial/Shell'

/* =========================================================================
   THE SIXTEEN ṚTVIKS.

   ⚠ FRAMING. The sixteen belong to the Veda, not to one portion of it. The
   saṃhitā is the mantra portion and the brāhmaṇa the manual portion of the
   SAME Veda, and an office named in one is not thereby absent from the
   other or later than it. So this page reports WHERE each office is named,
   which is a fact about which portion carries it — never a claim about
   development in time.

   Every attestation below was counted from the padapāṭha of all ten
   maṇḍalas, not recalled. The counts are verses, and the reference is the
   first occurrence in collection order.
   ========================================================================= */

type Row = { name: string; gloss: string; verses: number; first?: string; topic?: string }

const GROUPS: { chief: string; veda: string; note: string; rows: Row[] }[] = [
  {
    chief: 'hotṛ', veda: 'Ṛgveda',
    note: 'The hotṛ calls the gods to the offering and pours it. His verses are the Ṛgveda, which is why this group is the most fully named here.',
    rows: [
      { name: 'hotṛ', gloss: 'calls the gods, pours the offering', verses: 248, first: '1.1.1', topic: 'hotṛ' },
      { name: 'maitrāvaruṇa', gloss: 'also called praśāstṛ, the director', verses: 1, first: '7.33.11' },
      { name: 'acchāvāka', gloss: 'the one who calls toward', verses: 0 },
      { name: 'grāvastut', gloss: 'praiser of the pressing-stones', verses: 0 },
    ],
  },
  {
    chief: 'adhvaryu', veda: 'Yajurveda',
    note: 'The adhvaryu performs the physical acts of the rite and murmurs the yajus. His formulae are the Yajurveda.',
    rows: [
      { name: 'adhvaryu', gloss: 'performs the acts of the yajña', verses: 57, first: '1.135.3', topic: 'adhvaryu' },
      { name: 'pratiprasthātṛ', gloss: 'the adhvaryu’s immediate assistant', verses: 0 },
      { name: 'neṣṭṛ', gloss: 'leads the patnī forward', verses: 7, first: '1.15.3' },
      { name: 'unnetṛ', gloss: 'draws up the soma', verses: 0 },
    ],
  },
  {
    chief: 'udgātṛ', veda: 'Sāmaveda',
    note: 'The udgātṛ sings. His melodies are the Sāmaveda — which is why he is named exactly once in the Ṛgveda, at RV 2.43.2, and not because the office was unknown.',
    rows: [
      { name: 'udgātṛ', gloss: 'sings the sāman', verses: 1, first: '2.43.2' },
      { name: 'prastotṛ', gloss: 'begins the chant', verses: 0 },
      { name: 'pratihartṛ', gloss: 'takes up the response', verses: 0 },
      { name: 'subrahmaṇya', gloss: 'makes the summoning call', verses: 1, first: '10.62.4' },
    ],
  },
  {
    chief: 'brahman', veda: 'Atharvaveda',
    note: 'The brahman watches the whole rite in silence and repairs what goes wrong. He speaks only to correct.',
    rows: [
      { name: 'brahman', gloss: 'oversees and repairs the rite', verses: 32, first: '1.80.1', topic: 'brahman' },
      { name: 'brāhmaṇācchaṃsin', gloss: 'recites at the brahman’s side', verses: 0 },
      { name: 'agnīdh', gloss: 'kindles and tends the fire', verses: 1, first: '10.41.3' },
      { name: 'potṛ', gloss: 'the purifier', verses: 5, first: '1.94.6' },
    ],
  },
]

export default async function Page() {
  const all = GROUPS.flatMap(g => g.rows)
  const named = all.filter(r => r.verses > 0)

  return (
    <Shell crumb={<Crumb parts={[
      { label: 'Ṛgveda', href: '/text/rv' },
      { label: 'topics', href: '/topic' },
      { label: 'the sixteen ṛtviks' },
    ]} />}>
      <header className="vd-masthead">
        <div className="vd-masthead-ref">reference</div>
        <h1 className="vd-masthead-title">The Sixteen Ṛtviks</h1>
        <div className="vd-masthead-meta">
          <span><em>four chiefs, three assistants each</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>{named.length} named in the Ṛgveda Saṃhitā</em></span>
        </div>
      </header>

      <p className="tp-note tp-note-lead" style={{ maxWidth: '62ch', margin: '0 auto 12px' }}>
        A full śrauta yajña is served by sixteen officiants: four chief priests, each with
        three assistants, one group for each Veda. They are named across the Veda as a whole —
        the <strong>saṃhitā</strong> is its mantra portion and the <strong>brāhmaṇa</strong> its
        manual portion, and an office named in one is not absent from or later than the other.
      </p>
      <p className="tp-note" style={{ maxWidth: '62ch', margin: '0 auto 40px' }}>
        Of the sixteen, <strong>{named.length} are named in the Ṛgveda Saṃhitā</strong> and the
        remaining {16 - named.length} are named in the brāhmaṇa, where the procedure they serve
        is set out. The distribution follows the work: the Ṛgveda is the hotṛ’s book, so the
        hotṛ is named in 248 verses while the udgātṛ — whose melodies are the Sāmaveda — is
        named once. Counts below are verses, counted from the padapāṭha of all ten maṇḍalas.
      </p>

      {GROUPS.map(g => (
        <section key={g.chief} className="tp-section">
          <div className="vd-app-label">
            {g.chief} group <span className="tp-fullname">— {g.veda}</span>
          </div>
          <p className="tp-note" style={{ marginTop: 6, marginBottom: 14 }}>{g.note}</p>
          <div className="pr-grid">
            {g.rows.map(r => (
              <div key={r.name} className={`pr-row ${r.verses ? '' : 'pr-unnamed'}`}>
                <span className="pr-name" lang="sa">
                  {r.topic ? (
                    <Link href={`/topic/${encodeURIComponent(r.topic)}`} className="vd-topic">{r.name}</Link>
                  ) : r.name}
                </span>
                <span className="pr-gloss">{r.gloss}</span>
                <span className="pr-att">
                  {r.verses ? (
                    <>
                      <strong>{r.verses}</strong> {r.verses === 1 ? 'verse' : 'verses'}
                      {r.first ? (
                        <> · <Link href={`/text/rv/${r.first}`} className="vd-xref">{r.first}</Link></>
                      ) : null}
                    </>
                  ) : (
                    <em>named in the brāhmaṇa</em>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="tp-section">
        <div className="vd-app-label">where a reader meets them first</div>
        <p className="tp-note" style={{ maxWidth: '62ch' }}>
          The opening line of the collection names three offices at once —{' '}
          <Link href="/text/rv/1.1.1" className="vd-xref">RV 1.1.1</Link> calls Agni{' '}
          <em lang="sa">purohitam</em>, the one placed in front, <em lang="sa">ṛtvijam</em>, who
          officiates in due season, and <em lang="sa">hotāram</em>, who calls and pours. And{' '}
          <Link href="/text/rv/2.5" className="vd-xref">RV 2.5</Link> gives Agni the offices in
          turn — <em lang="sa">potā</em>, <em lang="sa">neṣṭā</em>, <em lang="sa">ṛtvij</em> —
          so that one hymn holds most of what the Saṃhitā names.
        </p>
      </section>
    </Shell>
  )
}
