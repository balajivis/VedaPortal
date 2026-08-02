# Sūkta commentary — the standard

RV 1.1, 1.2 and 1.3 are the worked examples. Read all three in
`commentary-mandala-1.json` before writing anything. This file exists because that
standard was arrived at through a dozen corrections, and each rule below is one of
them.

## The goal, which governs every rule here

This is **a living manual a Hindu refers to for guidance and inspiration** — not a
philology paper and not a linguistic curiosity. The reader is an educated Hindu who
may already recite some of this and wants to understand what they are saying and why
it bears on their life. Scholarship is here to make the notes *trustworthy*, never to
be the point.

A note that reads like a seminar has failed even if every sentence in it is true.

## Record shape

```json
"<sūkta>": {
  "title": "…",
  "synthesis": "…",
  "practice": "…",
  "disagreements": "…",
  "cross_refs": ["3.59"],
  "kind": "machine",
  "model": "claude-opus-5",
  "generated": "2026-08-01",
  "witnesses": ["wilson-1866", "griffith-1896", "sayana-via-wilson"],
  "saw_sanskrit": true,
  "weighted": "wilson",
  "title_kind": "machine-suggested"
}
```

Paragraphs are separated by `\n\n`. `*term*` renders as italic Sanskrit.
`[[3.59]]` renders as a link to that sūkta — use it whenever you name another hymn.
`{{soma}}` renders as a link to that **topic page**, which lists every occurrence of
the term across all ten maṇḍalas plus every note that mentions it. Mark a term this
way the FIRST time it appears in each field, when it is a thing a reader would want
to follow up: deities (`{{agni}}`, `{{sarasvatī}}`), peoples and persons
(`{{bharata}}`, `{{pūru}}`, `{{dasyu}}`), rivers (`{{sindhu}}`), substances
(`{{soma}}`), and load-bearing concepts (`{{ṛta}}`, `{{dhī}}`, `{{yajña}}`,
`{{brahman}}`, `{{vāja}}`). Use the bare lemma, lowercase, in IAST — the same form
the morphology files use. Do not mark every occurrence; once per field is enough.

## ⭐ Use Sāyaṇa's own gloss, not only Wilson

`samhita/commentary/sayana/sayana-mandala-N.json` holds **4,122 verse-addressed
glosses** of the Ṛgveda-bhāṣya. Read them for every verse that has one. Wilson is a
19th-century Englishman's rendering *of* Sāyaṇa; where the gloss itself exists, that
is the tradition's own voice and it is closer to the source than the translation.

- Where Sāyaṇa gives a derivation, a ritual detail, a citation of the Nirukta or a
  Brāhmaṇa, or names a legend — that is first-rate material. Use it.
- Where Sāyaṇa and Wilson diverge (it happens — Wilson compresses, and occasionally
  mis-renders), **follow Sāyaṇa** and record the divergence in `disagreements`.
- Coverage is uneven: maṇḍala 1 has a gloss on 933 of 2,006 verses. Absence means
  *not in this witness*, never *Sāyaṇa was silent*. Do not say he was silent.
- His positions still belong in `disagreements`, not in `synthesis` — the zero-names
  rule is unchanged. What changes is that the *substance* of the synthesis should be
  informed by him rather than by Wilson alone.

## The four fields

### `title`
What **this** sūkta does, stated so it lands. Under ~52 characters where possible.

- ❌ `The Fire That Carries` — could head any of the 236 Agni hymns. A title that
  fits two hundred sūktas is not doing its job.
- ❌ `The Cup Goes Round Until Ṛta Is Named` — invented a cup passed round a circle.
  **The text has no such image.** Strength must come from accuracy, never from
  imagery the hymn does not supply.
- ❌ `Agni Named Four Times for His Office, Then Asked to Come Close as a Father` —
  accurate but reads like a museum label.
- ❌ `Fire Given Every Title…` / `Four Guests Called, and a River…` — the first
  describes Agni instead of naming him; the second leaves the four guests unnamed
  when naming them is exactly what tells a reader whether this hymn concerns them.
- ✅ `Agni Given Every Title, Then Asked to Be a Father`
- ✅ `Come and Drink — Vāyu, Indra, and the Keepers of Ṛta`
- ✅ `Welcoming Four Guests — Aśvins, Indra, Viśvedevāḥ, Sarasvatī`

**Name the deities in the title.** A reader scanning 191 rows is looking for who a
hymn is to. Titles carrying the names are how the index becomes usable.

### `synthesis` — 450–650 words
The hymn in **its own voice**, narrative, verse by verse.

#### ⭐ REGISTER — the rule that governs the rest

The Ṛgveda is scripture of a living faith **and** one of the oldest, largest and
best-preserved poems of the ancient world. Write from inside that double standing. Do not
fawn, do not invent cosmic significance the text does not claim — and do not adopt the
Victorian outside lens either.

The tell is whether the sentence *describes a hymn* or *says what the hymn says*:

| ❌ outside, reporting on it | ✅ inside, saying it |
|---|---|
| "that is the premise the hymn opens on" | "Agni is asked to carry" |
| "the reason the collection begins here" | "the Ṛgveda begins where contact begins" |
| "the rite is not merely a symbol" | "what is poured into Agni reaches the gods" |
| "a strange hymn, unlike anything around it" | say what it does; let the reader find it strange |
| "the redactors placed this here" | (belongs in `disagreements`) |

#### No presupposed chronology. Anywhere in the primary fields.

Do not write that a deity, word or practice **becomes**, **develops into**, **gives rise
to**, or is a **precursor of** anything. Do not call one part of the corpus *earlier* or
*later* than another, and do not treat the Ṛgveda as the origin from which the rest grew.
The tradition does not hold the Vedas in chronological sequence, and a reader who does not
either will find the framing not merely wrong but discourteous.

The failure is usually also a factual one. "For a deity who becomes Śiva, the Ṛgvedic base
is very small" was written of Rudra — but Rudra is sparse in the **Ṛgveda Saṃhitā** and
abundant in the **Yajurveda**, where the Śatarudriya is among the largest single addresses
to any deity in the Veda. The honest statement is about **distribution across the corpus**,
not development in time:

> ❌ For a deity who becomes Śiva, the Ṛgvedic base is very small.
> ✅ Rudra is addressed by three sūktas in the whole Ṛgveda. That says something about the
>   Ṛgveda's distribution, not about Rudra: the Yajurveda gives him the Śatarudriya, recited
>   daily as the Rudram. Where a deity stands in one saṃhitā is not the measure of where he
>   stands in the Veda.

Where continuity is real, **show it in the words** rather than asserting a line of descent:
RV 1.114.8 *mā nas toke tanaye…* is carried in the Rudram, and anyone who has heard the
Rudram has heard that verse. That is a fact about recitation, checkable, and it needs no
theory of development to be worth saying.

Academic chronology — strata, redaction, relative dating — is a real body of scholarship and
the reader deserves it. It goes under **`disagreements`**, named to whoever holds it.

**Banned from the primary fields, allowed in `disagreements`:** *transactional*, *bargain*
(except glossing *paṇi*), *cult*, *tribal*, *primitive*, *mythology*, *superstition*,
*merely*, *nothing more than*, *naive*, *curious*, and every claim about dating, strata,
redaction or "later addition". Those are real scholarly questions and the reader deserves
them — **below**, under *how it has been read*, named to whoever holds them. They do not
belong in the text a reciter reads first.

Two things are NOT banned: **describing what a hymn asks for** — the hymns ask for cattle,
sons, and victory, and saying so plainly is accurate, not reductive; and **recording that a
reading is disputed**. What is banned is the sneer, the flinch, and the lecture.

### `title`
Titles obey the same rule. A title should sound like the hymn, not like a catalogue entry:

- ❌ `Agni Given Every Title, Then Asked to Be a Father` — describes a hymn from outside
- ✅ `Agni, Lord of the Yajña — Be to Us as a Father to His Son`

Use the tradition's vocabulary (*yajña*, not "sacrifice"; *ṛta*, not "cosmic law"), and where
the hymn ends on a request, let the title carry it.

- **ZERO names.** No "Sāyaṇa notes", no "Wilson has", no "Griffith gives". Every
  attribution goes in `disagreements`. Name-dropping in the body is what makes a
  manual read like a seminar. *Check your draft: the words Sāyaṇa, Wilson and
  Griffith must not appear.*
- **Every verse carries.** The commonest failure is spending three paragraphs on
  verses 1 and 9 and disposing of 2–8 in a clause. If a hymn has 12 verses, a reader
  should finish knowing what each of the 12 did.
- **Keep the Sanskrit** where a Hindu reader already has the vocabulary — *purohita*,
  *hotā*, *ṛtvij*, *yajña*, *ṛta*, *dhī*, *namas*, *kratu*, *dakṣa*, *rayi*, *vāja*,
  *barhis*, *svasti*. These are not glosses for a stranger; they are the words the
  reciter is already saying. Give the sense once, in apposition, then use the term.
- **Never a translator's calque.** Write *Viśvedevāḥ*, never "All-Gods". *Aśvinau*,
  *mitrāvaruṇau*, *maruts*, *ādityas* — use what the tradition uses.
- **Name the deity, do not describe him.** Write **Agni**, not "the fire" / "the
  flame" / "the god of fire". Agni is a name a Hindu reader has; "the fire" turns a
  person into an object and reads as though the tradition needs explaining from
  outside. Same for **Sūrya** not "the sun god", **Vāyu** not "the wind", **Uṣas**
  not "the dawn goddess", **Soma**, **Indra**, **Varuṇa**. Use "the fire" only where
  the hymn genuinely means the physical fire on the hearth rather than the god — and
  even then prefer *the āhavanīya*, *the hearth fire*, or simply Agni.
- **An inflected form links from itself.** `{{dhī}}` prints the lemma — so a sentence that
  says *dhiyā* would show "dhī" instead. Where the text carries an inflected or compound
  form, link it and keep the surface shape: `[*dhiyā*](/topic/dhī)`,
  `[*namo bharantaḥ*](/topic/namas)`, `[*svastaye*](/topic/svasti)`. `{{term}}` is for the
  bare lemma only.
- **Link a ṛṣi from his own name, not from a parenthesis.** The `{{term}}` mark prints the
  index KEY, which for a ṛṣi is the bare Anukramaṇī stem (`madhucchandā`) and not what a
  reader should see. Writing "Madhucchandas Ṛṣi ({{madhucchandā}})" leaves the machinery
  showing. Use a link instead — `[Madhucchandas Ṛṣi](/topic/madhucchandā)` — so the name
  itself is the door. `{{term}}` stays right for deities and concepts, where the key and the
  display name are the same word.
- **A ṛṣi is named with his title and his name capitalised.** Write **Madhucchandas Ṛṣi**,
  **Viśvāmitra Ṛṣi**, **Dīrghatamas Ṛṣi** — not "madhucchandas", not "the seer
  Madhucchandas", not the bare Anukramaṇī string. These are persons, and the tradition does
  not refer to them without the title. Where the patronymic matters, give it in prose —
  *Madhucchandas Ṛṣi, son of Viśvāmitra* — rather than transliterating
  `vaiśvāmitro madhucchandāḥ` at the reader.
- **Do not gloss a proper noun.** Write *Agni*, not "Agni, the fire" or "Agni, god of
  fire". Write *Vāyu*, not "Vāyu, the wind"; *Uṣas*, not "Uṣas, the dawn". The reader
  knows who these are, and re-explaining a name every time it appears is the written
  equivalent of talking slowly. Unpack a name **only** where the etymology is itself
  the point being made — e.g. *ṛtvij* as *ṛtu* + √yaj, because the claim is about
  timeliness. Ordinary epithets (*hotā*, *purohita*, *citrabhānu*) are still glossed
  once, since those are descriptions rather than names.
- **Look for the spine.** The best notes find the thing running underneath: *dhī*
  threading RV 1.3 from v2 to v12; `indra ā yāhi` opening three consecutive verses;
  *ṛta* three times in one line of 1.2.8. Read the padapāṭha to find these — they are
  invisible in the English.

### `practice` — "where it lives", 200–450 words
Why this hymn bears on a life now. This is what the reader came for.

Legitimate material: the deity's place in living observance (saṃskāras, sandhyā,
pūjā, festivals); what the hymn says about its **own** use; vocabulary the reader
meets elsewhere (*ṛtu* in the saṅkalpa, *dhī* behind *dhyāna*); and **counted facts
from the corpus itself** — these are the strongest thing available:

> 36 sūktas are ascribed to *mitrāvaruṇau*; exactly one, [[3.59]], to Mitra alone.
> Agni opens eight of the ten maṇḍalas. Sarasvatī has 16 sūktas against 69 for the
> Aśvins.

Count such things yourself from `apparatus/anukramani/Mandala_*.txt`. Do not assert
frequency without counting.

**Do not invent ritual claims.** Agni as witness of the saṃskāras is fact; a specific
liturgical sequence you are unsure of is not. No devotional register, no debunking
register — describe.

### `disagreements` — "how it has been read", 120–250 words
All attribution lives here: Sāyaṇa's positions **and** the translators'. Quote
briefly so the reader sees the difference rather than taking your word for it. Sāyaṇa
belongs here too — gathered, not sprinkled through the body.

## Sources, and the order to read them

| | |
|---|---|
| `samhita/text/mandala-1.json` | accented Devanāgarī |
| `apparatus/padapatha/padapatha-mandala-1.json` | word division, sandhi resolved — **read this** |
| `apparatus/grammar/grammar-mandala-1.json` | per-word lemma + morphology |
| `samhita/translations/wilson-mandala-1.json` | Wilson 1866 — follows Sāyaṇa, weight toward it |
| `samhita/translations/griffith-mandala-1.json` | Griffith 1896 — independent, Victorian |
| `samhita/commentary/sayana/sayana-mandala-1.json` | Sāyaṇa's bhāṣya, verse-addressed |
| `apparatus/anukramani/Mandala_1.txt` | `sūkta.verses.ṛṣi.devatā.chandas` |

**Verify before you claim.** Repetitions, word-threads and shared epithets must be
checked in the padapāṭha, not inferred from the English. Two real traps already hit:
a regex missed `ṛtāvṛdhau` because of the macron, and `dadhiṣva` was nearly counted
as a *dhī* form when it is from √dhā. When a claim rests on a form, look at it.

## Honesty rules — these are not negotiable

1. **AI generates, tradition verifies.** Nothing here is a verified reading. Never
   write as though it were.
2. **Never invent content to fill a node.** If the occasion of a hymn is unclear from
   the evidence, say it is unclear. "We do not know from this" is a correct answer.
3. Do not resolve a genuine ambiguity into a confident answer. Where Sāyaṇa offers
   two derivations, keep both.
4. If Wilson and Griffith diverge, that divergence is usually the most informative
   thing available — record it in `disagreements` with both readings named.
