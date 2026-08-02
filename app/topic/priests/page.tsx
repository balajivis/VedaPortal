import Link from 'next/link'
import { Shell, Crumb } from '@/components/editorial/Shell'

/* =========================================================================
   THE SIXTEEN ṚTVIKS.

   ⚠ FRAMING. The sixteen belong to the Veda, not to one portion of it. The
   saṃhitā is the mantra portion and the brāhmaṇa the manual portion of the
   SAME Veda, so an office named in one is not thereby absent from the other
   or later than it. This page reports WHERE each office is named — a fact
   about which portion carries it — never a claim about development in time.

   Every attestation was counted from the padapāṭha of all ten maṇḍalas.
   Counts are verses; the reference is the first occurrence in order.

   ⚠ Typography: group headings are SERIF, not the mono eyebrow used
   elsewhere. Uppercased mono mangles Ṛ — "hotṛ group" rendered as "hotR
   GROUP" — and these are Sanskrit words that have to stay legible.
   ========================================================================= */

type Row = { name: string; gloss: string; verses: number; first?: string; topic?: string }
type Group = { chief: string; veda: string; heading: string; note: string; rows: Row[] }

const GROUPS: Group[] = [
  {
    chief: 'hotṛ', veda: 'Ṛgveda',
    heading: 'The hotṛ and his three',
    note: 'The hotṛ calls the gods to the offering and pours it. The verses he recites are the Ṛgveda — which is why this group is the most fully named in it, and why the opening line of the collection names his office.',
    rows: [
      { name: 'hotṛ', gloss: 'calls the gods, pours the offering', verses: 248, first: '1.1.1', topic: 'hotṛ' },
      { name: 'maitrāvaruṇa', gloss: 'directs the recitation; also called praśāstṛ', verses: 1, first: '7.33.11' },
      { name: 'acchāvāka', gloss: 'the one who calls toward the rite', verses: 0 },
      { name: 'grāvastut', gloss: 'praises the pressing-stones', verses: 0 },
    ],
  },
  {
    chief: 'adhvaryu', veda: 'Yajurveda',
    heading: 'The adhvaryu and his three',
    note: 'The adhvaryu does the physical work of the yajña — measuring the ground, handling the vessels, making the offering — murmuring the yajus as he goes. Those formulae are the Yajurveda.',
    rows: [
      { name: 'adhvaryu', gloss: 'performs the acts of the yajña', verses: 57, first: '1.135.3', topic: 'adhvaryu' },
      { name: 'pratiprasthātṛ', gloss: 'stands opposite him and assists', verses: 0 },
      { name: 'neṣṭṛ', gloss: 'leads the patnī forward', verses: 7, first: '1.15.3' },
      { name: 'unnetṛ', gloss: 'draws up the soma', verses: 0 },
    ],
  },
  {
    chief: 'udgātṛ', veda: 'Sāmaveda',
    heading: 'The udgātṛ and his three',
    note: 'The udgātṛ sings. His melodies are the Sāmaveda, and that is why he is named once in the Ṛgveda — not because the office was unknown. Each Veda names its own officiant most.',
    rows: [
      { name: 'udgātṛ', gloss: 'sings the sāman', verses: 1, first: '2.43.2' },
      { name: 'prastotṛ', gloss: 'begins the chant', verses: 0 },
      { name: 'pratihartṛ', gloss: 'takes up the response', verses: 0 },
      { name: 'subrahmaṇya', gloss: 'makes the summoning call', verses: 1, first: '10.62.4' },
    ],
  },
  {
    chief: 'brahman', veda: 'Atharvaveda',
    heading: 'The brahman and his three',
    note: 'The brahman watches the whole rite in silence and speaks only to repair what has gone wrong. He is the one who must know all of it, since he may be called on to correct any of it.',
    rows: [
      { name: 'brahman', gloss: 'oversees the rite and repairs it', verses: 32, first: '1.80.1', topic: 'brahman' },
      { name: 'brāhmaṇācchaṃsin', gloss: 'recites at the brahman’s side', verses: 0 },
      { name: 'agnīdh', gloss: 'kindles and tends the fire', verses: 1, first: '10.41.3' },
      { name: 'potṛ', gloss: 'the purifier', verses: 5, first: '1.94.6' },
    ],
  },
]

const namedIn = (g: Group) => g.rows.filter(r => r.verses > 0).length

export default async function Page() {
  const named = GROUPS.flatMap(g => g.rows).filter(r => r.verses > 0).length

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
          <span><em>four chief priests, three assistants each</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>one group for each Veda</em></span>
        </div>
      </header>

      <p className="pr-prov">
        <span className="tp-edited">edited &amp; reviewed</span>{' '}
        Reviewed by Balaji Viswanathan, 2026-08-02. Attestations counted from the padapāṭha of
        all ten maṇḍalas; the sixteen-fold arrangement is the śrauta one. Where an office is
        not named in the Ṛgveda Saṃhitā it is named in the brāhmaṇa portion of the same Veda —
        this page reports which portion carries it, and makes no claim about age.
      </p>

      <p className="pr-lede">
        A full śrauta yajña is served by sixteen officiants. They are named across the Veda as
        a whole: the <strong>saṃhitā</strong> is its mantra portion and the{' '}
        <strong>brāhmaṇa</strong> its manual portion, and an office named in one is not absent
        from the other. Of the sixteen, <strong>{named} are named in the Ṛgveda Saṃhitā</strong>{' '}
        and the rest in its brāhmaṇa, where the procedure they serve is set out.
      </p>

      <div className="pr-tablewrap">
        <table className="pr-table">
          <thead>
            <tr>
              <th>chief priest</th>
              <th>his Veda</th>
              <th>his work</th>
              <th className="pr-num">named in the Saṃhitā</th>
            </tr>
          </thead>
          <tbody>
            {GROUPS.map(g => (
              <tr key={g.chief}>
                <td className="pr-chief" lang="sa">{g.chief}</td>
                <td>{g.veda}</td>
                <td className="pr-work">{g.rows[0].gloss}</td>
                <td className="pr-num">{namedIn(g)} of 4</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pr-note">
        The distribution follows the work, not the age of the office. The Ṛgveda is the hotṛ’s
        book, so the hotṛ is named in 248 verses while the udgātṛ — whose melodies are the
        Sāmaveda — is named once. Counts are verses, taken from the padapāṭha of all ten
        maṇḍalas.
      </p>

      {GROUPS.map(g => (
        <section key={g.chief} className="pr-section">
          <h2 className="pr-heading">
            <span lang="sa">{g.heading}</span>
            <span className="pr-veda">{g.veda}</span>
          </h2>
          <p className="pr-note pr-note-tight">{g.note}</p>
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

      <section className="pr-section">
        <h2 className="pr-heading"><span>Where a reader meets them first</span></h2>
        <p className="pr-note pr-note-tight">
          The opening line of the collection places Agni in the rite at three levels at once —
          and only one of the three is among the sixteen.{' '}
          <Link href="/text/rv/1.1.1" className="vd-xref">RV 1.1.1</Link> calls him{' '}
          <em lang="sa">ṛtvijam</em>, which is the general word for an officiant and covers
          all sixteen; <em lang="sa">hotāram</em>, which is a particular office among them;
          and <em lang="sa">purohitam</em>, placed in front — a position of precedence rather
          than a seventeenth office, the chaplain who stands at the head of a household&rsquo;s
          or a king&rsquo;s rites. And{' '}
          <Link href="/text/rv/2.5" className="vd-xref">RV 2.5</Link> gives Agni the offices in
          turn — <em lang="sa">potā</em>, <em lang="sa">neṣṭā</em>, <em lang="sa">ṛtvij</em> —
          so a single hymn holds much of what the Saṃhitā names.
        </p>
      </section>
    </Shell>
  )
}
