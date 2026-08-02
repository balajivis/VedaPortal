import Link from 'next/link'
import { Shell, Crumb } from '@/components/editorial/Shell'

/* =========================================================================
   EDITORIAL STANDARDS — the public statement of how the notes are written.

   This page is the reader-facing face of
   `sources/vedas/rigveda/shakala/samhita/commentary/COMMENTARY-STANDARD.md`.
   The two must not drift: the internal file is the working law that agents
   and editors follow, this is what a reader is owed about it.

   ⚠ Every rule below was arrived at through a correction to real published
   text, not written in advance. Where a rule has a worked example on the
   site, link it — a standard nobody can check is a claim, not a standard.
   ========================================================================= */

type Voice = {
  name: string
  sanskrit?: string
  reads: string
  here: string
}

/* The four interpretive traditions this edition carries, plus the two
   academic registers. Ordered by how close each stands to the rite itself,
   NOT by age or authority — no ranking is intended and none should be
   inferred from the order. */
const VOICES: Voice[] = [
  {
    name: 'Mīmāṃsā', sanskrit: 'मीमांसा',
    reads: 'The Veda as injunction. A mantra means what it does in the yajña, and the rite is not a symbol of something else — it is the thing itself.',
    here: 'Carried chiefly through Sāyaṇa, whose bhāṣya is written from inside this reading. Where he gives a ritual detail, a derivation or a Brāhmaṇa citation, it is first-rate material and it is used.',
  },
  {
    name: 'Vedānta', sanskrit: 'वेदान्त',
    reads: 'The Veda as knowledge, the saṃhitā read toward what the upaniṣads state. The schools differ sharply among themselves and are not one voice.',
    here: 'Where a sūkta is read this way in the tradition, the reading is named and attributed rather than adopted — and the disagreement between the schools is left standing.',
  },
  {
    name: 'The devotional reading', sanskrit: 'भक्ति',
    reads: 'The hymn as address. Someone is being spoken to, by name, and the register of the reciter at sandhyā is not the register of a commentator at a desk.',
    here: 'This is the register of the second lens, where it belongs and where it should be unmistakable. The first lens stays welcoming rather than devotional — it is opening a door for someone who may know nothing yet.',
  },
  {
    name: 'Academic — insider',
    reads: 'Scholarship from within the tradition: Sri Aurobindo’s psychological reading, Dayānanda, Kapālī Śāstrī, and modern Indian Vedic scholarship.',
    here: 'Named as a reading among readings. A reading is not privileged for being traditional, and not discounted for it either.',
  },
  {
    name: 'Academic — outsider',
    reads: 'Comparative philology and the European translation tradition — Wilson, Griffith, Geldner, Jamison & Brereton — including questions of strata, redaction and relative dating.',
    here: 'Two full translations are held verse by verse, and where they disagree that disagreement is shown rather than resolved. Chronological argument is real scholarship and belongs on the page — under how it has been read, named to whoever holds it.',
  },
]

type Lens = {
  n: string
  label: string
  reader: string
  holds: string
  register: string
  never: string
}

/* The governing architecture. A sentence in the wrong lens is a defect even
   when it is true, well written and correctly attributed. */
const LENSES: Lens[] = [
  {
    n: 'first',
    label: 'the sūkta',
    reader: 'The curious learner, who may know very little about the Vedas and has come to find out what this is.',
    holds: 'The hymn end to end, verse by verse, with the Sanskrit beside the English — and the context needed to enter it: what a maṇḍala is, who the ṛṣi was, where the sūkta stands in the collection.',
    register: 'Gentle and contextual. Terms are introduced, never assumed. Somewhat neutral in stance, while conveying the grandeur of what this actually is.',
    never: 'No grammatical apparatus — no case names, no verbal roots, no “subjunctive”, no weighing of what an accusative permits. That is often where the best finding is, and the finding still belongs. It belongs in the third lens.',
  },
  {
    n: 'second',
    label: 'where it lives',
    reader: 'The practitioner, often orthodox, who seeks connection and authentic guidance and looks to the Ṛgveda and the other Vedas for it.',
    holds: 'How the sūkta bears on a life being lived now: the pañca-mahāyajñas, sandhyāvandana, the saṃskāras, agnihotra and havan, the āśramas — and the wider dharmic corpus wherever it speaks to the same question, the Brāhmaṇas and Upaniṣads, the Bhagavad Gītā, the dharmaśāstra.',
    register: 'Strongly Hindu vocabulary, deeply connective to practice. The sampradāyas are named — Mīmāṃsā, Vedānta, Ārya Samāj — and read side by side without one being made the answer.',
    never: 'No Western scholarship. Not Wilson, not Griffith, not Eggeling, not an SBE volume number. A reader following a paragraph on sandhyāvandana is stopped cold by a nineteenth-century translator’s name. Where a source we hold is in fact an English rendering, that caveat is owed — and it is owed in the third lens.',
  },
  {
    n: 'third',
    label: 'how it has been read',
    reader: 'The analytical reader — linguistic, historical, comparative — and anyone who wants to know how far the ground under the first two lenses actually holds.',
    holds: 'The grammar worked out; every divergence between the witnesses, quoted; comparative philology; what this edition actually holds versus what it would like to hold; strata, redaction and relative dating, named to whoever argues them.',
    register: 'Analytical, not religious. Dry, and allowed to be slightly irreverent — at readings, editors and translators. Never at the text, the devas, or the people who recite them.',
    never: 'Nothing is barred here. This is the only lens where Wilson, Griffith and Eggeling appear at all, and the only one where the grammar is worked.',
  },
]

const REGISTER: [string, string][] = [
  ['that is the premise the hymn opens on', 'Agni is asked to carry'],
  ['the rite is not merely a symbol', 'what is poured into Agni reaches the devas'],
  ['a strange hymn, unlike anything around it', 'say what it does; let the reader find it strange'],
  ['Vedic religion is chiefly otherworldly', 'the Veda’s dharma is chiefly otherworldly'],
  ['reconstruct the myth from these clauses', 'reconstruct the account from these clauses'],
  ['the fire is invoked first', 'Agni is invoked first'],
  ['the All-Gods', 'the Viśvedevāḥ'],
  ['the gods, or divinity', 'the devas'],
  ['Agni, the god of fire', 'Agni'],
  ['vaiśvāmitro madhucchandāḥ', 'Madhucchandas Ṛṣi, son of Viśvāmitra'],
  ['the oldest of the four Vedas', 'the first of the four Vedas'],
  ['among the oldest poems still recited', 'the oldest poem still recited'],
]

export default async function Page() {
  return (
    <Shell crumb={<Crumb parts={[
      { label: 'Ṛgveda', href: '/text/rv' },
      { label: 'editorial standards' },
    ]} />}>
      <header className="vd-masthead">
        <div className="vd-masthead-ref">the standard</div>
        <h1 className="vd-masthead-title">How These Notes Are Written</h1>
        <div className="vd-masthead-meta">
          <span><em>a living manual, not a seminar</em></span>
          <span className="vd-masthead-dot">·</span>
          <span><em>many traditions, none flattened</em></span>
        </div>
      </header>

      <p className="pr-lede">
        The Vedas are recited today with total fidelity and very little comprehension.
        Comprehension exists, partly, among people who cannot recite. Reattaching the two is
        the whole purpose of this edition — which means the notes here are written for a
        <strong> practitioner</strong>, to be used, and not for a reader who has come to look
        at the tradition from outside it.
      </p>

      <p className="pr-note">
        A note that reads like a seminar has failed even if every sentence in it is true.
        That single test produced most of the rules below, and each of them was arrived at by
        correcting text that had already been published here — not written in advance. The
        working version editors and agents follow is{' '}
        <code>COMMENTARY-STANDARD.md</code>; this page is what a reader is owed about it.
      </p>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span>Three lenses on one hymn</span>
          <span className="pr-veda">the governing structure</span>
        </h2>
        <p className="pr-note pr-note-tight">
          A sūkta page is three panels stacked top to bottom, and they are{' '}
          <strong>written for three different readers</strong>. This is the architecture
          everything else on this page serves. It is also the mechanism that lets one manual
          hold traditions that do not read alike — nobody is asked to read past material
          addressed to somebody else.
        </p>
        <p className="pr-note pr-note-tight">
          <strong>A sentence in the wrong lens is a defect even when it is true</strong>, well
          written and correctly attributed. That is the whole discipline, and it is broken
          constantly: philology drifts up into the first lens because that is where the best
          finding often is, and a translator’s name drifts into the second because the source
          had to be credited somewhere.
        </p>
        <div className="pr-tablewrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>lens</th>
                <th>written for</th>
                <th>what it holds</th>
                <th>register</th>
              </tr>
            </thead>
            <tbody>
              {LENSES.map(l => (
                <tr key={l.label}>
                  <td className="pr-chief">
                    {l.label}
                    <br />
                    <span style={{ fontWeight: 400, opacity: 0.6 }}>{l.n}</span>
                  </td>
                  <td className="pr-work">{l.reader}</td>
                  <td>{l.holds}</td>
                  <td>{l.register}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pr-grid" style={{ marginTop: 28 }}>
          {LENSES.map(l => (
            <div key={l.label} className="pr-row">
              <span className="pr-name">what {l.label} must not carry</span>
              <span className="pr-gloss" style={{ gridColumn: 'span 2' }}>{l.never}</span>
            </div>
          ))}
        </div>
        <p className="pr-note">
          The worked example is <Link href="/text/rv/1.1" className="vd-xref">RV 1.1</Link> —
          read it against this page. Where the two disagree, the page is wrong. And where the
          wider tradition presses back on a sūkta, the second lens says so rather than
          smoothing it: RV 1.1 asks for wealth, and the Gītā calls a yajña offered with an eye
          on its fruit <em lang="sa">rājasa</em>. A practitioner has met that objection
          already. Answering it honestly is the service; hiding it is what makes a manual
          untrustworthy.
        </p>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span>The voices this edition carries</span>
          <span className="pr-veda">and how they sit together</span>
        </h2>
        <p className="pr-note pr-note-tight">
          The Ṛgveda is read by several living traditions and by scholars who disagree with
          all of them, and it has been for a very long time. This edition <strong>gives voice
          to all of them and adjudicates between none</strong>. Where they part, both readings
          are named to whoever holds them and the reader decides — that is not neutrality for
          its own sake, it is the only honest way to make one manual serve practitioners who
          do not read alike.
        </p>
        <div className="pr-tablewrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>tradition</th>
                <th>what it reads the Veda as</th>
                <th>where it appears here</th>
              </tr>
            </thead>
            <tbody>
              {VOICES.map(v => (
                <tr key={v.name}>
                  <td className="pr-chief">
                    {v.name}
                    {v.sanskrit ? <><br /><span lang="sa" style={{ fontWeight: 400, opacity: 0.7 }}>{v.sanskrit}</span></> : null}
                  </td>
                  <td className="pr-work">{v.reads}</td>
                  <td>{v.here}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pr-note">
          What this edition does <strong>not</strong> do is adjudicate the civilizational and
          origins debate, or produce legitimacy for any camp in it. That is out of scope by
          decision, not by timidity. Named readings side by side is the answer here.
        </p>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span>Register</span>
          <span className="pr-veda">the rule that governs the rest</span>
        </h2>
        <p className="pr-note pr-note-tight">
          The Ṛgveda is scripture of a living faith <em>and</em> the oldest poem anywhere still
          recited today from memory, in the same words — and among the largest and
          best-preserved of the ancient world. The notes are written from inside that
          double standing: no fawning, no cosmic significance the text does not claim, and not
          the nineteenth-century outside lens either. The tell is whether a sentence
          <em> describes a hymn</em> or <em>says what the hymn says</em>.
        </p>
        <div className="pr-tablewrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>not this</th>
                <th>this</th>
              </tr>
            </thead>
            <tbody>
              {REGISTER.map(([bad, good]) => (
                <tr key={bad}>
                  <td className="pr-work" style={{ opacity: 0.72 }}>{bad}</td>
                  <td>{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pr-note">
          Behind those rows are four decisions worth stating plainly.{' '}
          <strong>Say dharma, not religion or mythology</strong> — <em>religion</em> makes the
          tradition one instance of a comparative genus built to describe something else, and{' '}
          <em>mythology</em> decides in the act of naming that the accounts are not true.{' '}
          <strong>Write devas, not gods</strong>, and not <em>divinity</em> either: an abstract
          singular cannot carry <em lang="sa">devān</em>, which is plural and is the thing Agni
          is asked to bring.{' '}
          <strong>Name the deity rather than describing him</strong> — Agni, not &ldquo;the
          fire&rdquo;; Uṣas, not &ldquo;the dawn goddess&rdquo;.{' '}
          <strong>And keep the Sanskrit a reader already has</strong> —{' '}
          <em lang="sa">yajña</em>, <em lang="sa">ṛta</em>, <em lang="sa">dhī</em>,{' '}
          <em lang="sa">rayi</em>, <em lang="sa">namas</em>. These are not glosses for a
          stranger; they are the words the reciter is already saying.
        </p>
        <p className="pr-note">
          <strong>Nor is the yajña &ldquo;fire worship.&rdquo;</strong> Agni bears the offering;
          he is not its object, and the sūktas are explicit about it. Two things are
          <em> not</em> banned: describing what a hymn asks for — these hymns ask for cattle,
          sons and victory, and saying so plainly is accurate rather than reductive — and
          recording that a reading is disputed. What is banned is the sneer, the flinch and
          the lecture.
        </p>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span>No presupposed chronology</span>
          <span className="pr-veda">anywhere in the primary text</span>
        </h2>
        <p className="pr-note pr-note-tight">
          Nothing here <em>becomes</em>, <em>develops into</em> or is a <em>precursor of</em>{' '}
          anything, and no part of the corpus is called earlier or later than another. The
          tradition does not hold the Vedas in chronological sequence, and a reader who does
          not either will find the framing not merely wrong but discourteous.
        </p>
        <p className="pr-note pr-note-tight">
          The failure is usually factual as well. &ldquo;For a deity who becomes Śiva, the
          Ṛgvedic base is very small&rdquo; was written here of Rudra and then removed. Rudra
          is sparse in the <strong>Ṛgveda Saṃhitā</strong> and abundant in the{' '}
          <strong>Yajurveda</strong>, where the Śatarudriya is among the largest single
          addresses to any deity in the Veda. The honest statement is about distribution
          across the corpus, not development in time — and where continuity is real it is
          shown in the words rather than asserted:{' '}
          <Link href="/text/rv/1.114.8" className="vd-xref">RV 1.114.8</Link> is carried in the
          Rudram, and anyone who has heard the Rudram has heard that verse. That is checkable,
          and it needs no theory of development to be worth saying.
        </p>
        <p className="pr-note">
          For the same reason the Saṃhitā is not divorced from its Brāhmaṇa. They are the
          mantra portion and the manual portion of one Veda, and when a page reports that an
          office or a fire is named in one and not the other — as{' '}
          <Link href="/topic/priests" className="vd-xref">the sixteen ṛtviks</Link> and{' '}
          <Link href="/topic/fires" className="vd-xref">the ritual fires</Link> both do — that
          is a statement about which portion carries it, never a claim about age.
        </p>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading">
          <span>What each note claims about itself</span>
          <span className="pr-veda">provenance</span>
        </h2>
        <p className="pr-note pr-note-tight">
          Most notes on this site are written by a language model and say so at the top, in a
          badge, before you read a word of them. <strong>A note must never claim review it has
          not had</strong>, and the honest default is the machine label.
        </p>
        <div className="pr-tablewrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>badge</th>
                <th>what it means</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-chief">machine-written</td>
                <td>Drafted from the two English translations and not reviewed. The model did
                  not read the Sanskrit, and no traditional scholar has seen it. Orientation,
                  not a reading.</td>
              </tr>
              <tr>
                <td className="pr-chief">edited &amp; reviewed</td>
                <td>A named human has read it against the sources — padapāṭha, morphology,
                  Sāyaṇa, both translations — and revised it, on a stated date, with the
                  sources listed. It is promoted one record at a time and the status does not
                  travel to neighbouring sūktas.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="pr-note">
          Sources are stated precisely, including where they are thin: Sāyaṇa is held here as
          an <strong>English digest</strong> of the Ṛgveda-bhāṣya, not as his Sanskrit, and no
          note may claim otherwise. Defects in the witnesses we hold are recorded in the
          affected note rather than smoothed over, so that nobody compares two translations by
          verse number where one of them has dropped a verse.
        </p>
      </section>

      <section className="pr-section">
        <h2 className="pr-heading"><span>The four that are not negotiable</span></h2>
        <div className="pr-grid">
          <div className="pr-row">
            <span className="pr-name">AI generates, tradition verifies</span>
            <span className="pr-gloss">Nothing here is a verified reading. &ldquo;Correct&rdquo; is
              defined by traditional scholars, not by a model.</span>
            <span className="pr-att" />
          </div>
          <div className="pr-row">
            <span className="pr-name">Never invent to fill a node</span>
            <span className="pr-gloss">Where the evidence does not settle a question, the note
              says so. Empty and honest beats confident and hollow.</span>
            <span className="pr-att" />
          </div>
          <div className="pr-row">
            <span className="pr-name">Every reading ships with its receipts</span>
            <span className="pr-gloss">Occurrences, sources, and where the evidence
              underdetermines the answer. Counts are counted, not estimated.</span>
            <span className="pr-att" />
          </div>
          <div className="pr-row">
            <span className="pr-name">Contested is earned</span>
            <span className="pr-gloss">A genuine dispute is a finding and is marked. It is never
              a way of avoiding the work.</span>
            <span className="pr-att" />
          </div>
        </div>
      </section>

      <p className="pr-prov" style={{ marginTop: 56 }}>
        <span className="tp-edited">edited &amp; reviewed</span>{' '}
        Reviewed by Balaji Viswanathan, 2026-08-02. This page states the standard as it
        currently stands; it has been revised roughly a dozen times and will be revised again.
        Where a note on this site breaks a rule stated here, the note is wrong and the rule
        stands — corrections are welcome and are how nearly every line above came to exist.
      </p>
    </Shell>
  )
}
