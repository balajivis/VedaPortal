'use client'

/* =========================================================================
   Depth 2 — the anchored source. RV 3.53.12.

   The project's worked anchor: Visvamitra's hymn, the Bharata people verse.
   Chosen because "The Land — Reading Layer Template" already builds A1 in
   full, so this page is composition, not research.

   Everything on this page is either OBS from the source docs or explicitly
   tagged. Nothing is invented to fill a field.
   ========================================================================= */

import { useState } from 'react'
import { type Script } from '@/components/editorial/vedic-fonts'
import {
  Mantra, Apparatus, Occurrences, Enumerated, Badge,
  type Token, type ApparatusRow,
} from '@/components/editorial/vedic-blocks'

/* RV 3.53.12 — sasvara. Tokenised on the padapatha, which for the Rgveda
   Sakala genuinely survives (GRETIL) — so machineSplit is false throughout.
   That is the whole point of the flag: here we are entitled to it. */
const TOKENS: Token[] = [
  { text: 'वि॒श्वामि॑त्रस्य', lemma: 'viśvāmitra', morph: 'gen. sg. m.' },
  { text: 'र॑क्षति',          lemma: 'rakṣ',        morph: '3 sg. pres. act.' },
  { text: 'ब्रह्मे॒दं',        lemma: 'brahman',     morph: 'nom. sg. n. + idam' },
  { text: 'भार॑तं',           lemma: 'bhārata',     morph: 'acc. sg. m. — ETHNONYM, not the Agni-appellative' },
  { text: 'जन॑म्',             lemma: 'jana',        morph: 'acc. sg. m. — folk/people, NOT "race"' },
]

const APPARATUS: ApparatusRow[] = [
  {
    label: 'padapāṭha',
    era: 'traditional · sandhi resolved',
    provenance: 'emic_intext',
    body: (
      <p className="deva" lang="sa">
        वि॒श्वामि॑त्रस्य । र॑क्षति । ब्रह्म॑ । इ॒दम् । भार॑तम् । जन॑म् ॥
      </p>
    ),
  },
  {
    label: 'what it says',
    era: '[OBS]',
    provenance: 'modern_etic',
    lead: true,
    body: (
      <p>
        “This prayer / <em>brahman</em> of Viśvāmitra protects the Bharata <em>people</em>.”
        The referent is the load-bearing question, and here it is the tribe — a
        proper-noun ethnonym.
      </p>
    ),
  },
  {
    label: 'Sāyaṇa',
    era: '[TRAD-14c · ritual lens]',
    provenance: 'native_posthoc',
    contested: true,
    body: (
      <p>
        Reads the verse as Viśvāmitra’s prayer protecting the Bharata “race”. On the
        following verse he imports the <em>epic</em> genealogy — Bharata son of Śakuntalā,
        Vasiṣṭha as Bharata priest, the Pāñcāla expulsion. A later frame read back into
        the Ṛgveda, and weakest exactly on historical-narrative content.
      </p>
    ),
  },
  {
    label: 'Mīmāṃsā posture',
    era: '[TRAD · vidhi/arthavāda]',
    provenance: 'native_posthoc',
    contested: true,
    body: (
      <p>
        A praise-hymn like this is <em>arthavāda</em> — subordinate to the ritual
        injunction — so the Mīmāṃsaka reads it ritual-functionally and would not treat{' '}
        <em>bhāratam janam</em> as an ethnographic datum at all. The same verse, put to
        epistemically opposite uses. <em>That tension is the instructive part.</em>
      </p>
    ),
  },
  {
    label: 'Griffith',
    era: '[MOD-1896 · Victorian]',
    provenance: 'modern_etic',
    body: (
      <p>
        Renders <em>janam</em> as “race”. A Victorian overlay: <em>jana</em> is
        folk/people. Griffith is the default English Ṛgveda because its copyright
        expired, not because it is good.
      </p>
    ),
  },
  {
    label: 'machine',
    era: '[MT · pending]',
    provenance: 'machine',
    body: (
      <p>
        No machine reading has been generated for this verse. The disagreement map is
        Stage 4 and runs only after the apparatus above is complete — the first cut
        ships as a confidence map, not as an answer.
      </p>
    ),
  },
]

const OCCURRENCES = [
  { addr: { corpus: 'RV', ref: '3.23.2', recension: 'Śākala' }, gloss: 'Devaśravas & Devavāta Bhārata kindle Agni on the Āpayā, Sarasvatī, Dṛṣadvatī' },
  { addr: { corpus: 'RV', ref: '3.33',   recension: 'Śākala' }, gloss: 'the tribe crosses Vipāś and Śutudrī with chariots and wagons' },
  { addr: { corpus: 'RV', ref: '3.53.24', recension: 'Śākala' }, gloss: 'same hymn, closing imprecations' },
  { addr: { corpus: 'RV', ref: '7.18',   recension: 'Śākala' }, gloss: 'dāśarājña — the winning side' },
  { addr: { corpus: 'RV', ref: '7.33.6', recension: 'Śākala' }, gloss: 'Tṛtsu–Bharata' },
]

export default function RV_3_53_12({ nav }: { nav?: React.ReactNode }) {
  const [script, setScript] = useState<Script>('devanagari')
  const [active, setActive] = useState<number | null>(3) // bhāratam — the finding

  return (
    <>
      <div>
        <main>
          <div className="vd-eyebrow">
            ṛṣi Viśvāmitra Gāthina · deity Indra, Parvata, etc. · Triṣṭubh
          </div>
          <h1 className="vd-title">The Bharata <em>people.</em></h1>
          <p className="vd-page-lede">
            A composite hymn at the tail of the Indra block, in the family book of the
            purohita who served Sudās. Its true thematic sibling is 3.33, twenty hymns
            away — the Saṃhitā is arranged by deity, not by theme, which is exactly why
            the reading layer exists.
          </p>

          <Mantra
            tokens={TOKENS}
            addr={{ corpus: 'RV', ref: '3.53.12', recension: 'Śākala' }}
            script={script}
            availableScripts={['devanagari', 'iast']}
            onScriptChange={setScript}
            tier="multi_traditional"
            mantraType="semantic"
            status="structured"
            activeToken={active}
            onTokenClick={(i) => setActive(i === active ? null : i)}
          />

          <Apparatus rows={APPARATUS} />

          <Occurrences
            word="भारत"
            items={OCCURRENCES}
            total={8}
          />

          <p className="vd-note">
            ⭐ <strong>The finding.</strong> ~15 raw string matches for <em>bhārata</em> in the
            Ṛgveda, but only <strong>~8 are the tribe</strong> — the rest are Agni called{' '}
            <em>bhārata</em> (“the maintained one”), the Maruts, Rudra, or the goddess
            Bhāratī of the Āprī hymns. A naive search <strong>triples</strong> the tribe’s
            footprint. The referent column is not optional; it is the difference between
            15 and 8.
          </p>

          <Enumerated
            claim={<>The Aitareya Brāhmaṇa’s treatment of this hymn has not been read into the portal.</>}
            note={
              <>
                The text is sourced — TITUS/Aufrecht 1879, 285 khaṇḍas — but not yet
                structured to khaṇḍa level, and no cross-reference to RV 3.53 has been
                established. We know it exists. That is the entire claim.
              </>
            }
          />

          <div className="vd-legend">
            <div className="vd-legend-label">Badge legend — tier · status · mantra type</div>
            <div className="vd-legend-row">
              <Badge tier="contested">contested</Badge>
              <Badge tier="multi_traditional">multiple readings</Badge>
              <Badge tier="settled">settled</Badge>
              <Badge status="enumerated">enumerated</Badge>
              <Badge status="sourced">sourced</Badge>
              <Badge status="structured">structured</Badge>
              <Badge status="voiced">voiced</Badge>
              <Badge mantraType="opaque">opaque</Badge>
            </div>
          </div>
          {nav}
        </main>
      </div>
    </>
  )
}
