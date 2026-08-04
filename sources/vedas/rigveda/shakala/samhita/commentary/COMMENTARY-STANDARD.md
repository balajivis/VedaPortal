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

## ⭐⭐ THE THREE LENSES — the architecture everything else serves

A sūkta page is **three lenses on one hymn, stacked top to bottom, written for three
different readers.** This is the governing structure. A sentence in the wrong lens is a
defect even when it is true, well written and correctly attributed.

| | lens | the reader | register |
|---|---|---|---|
| **top** | masthead + `synthesis` | **the curious learner**, who may know very little about the Vedas | gentle and contextual. Somewhat neutral, but conveying the grandeur of what this is. Terms are introduced, never assumed. |
| **middle** | `practice` — *where it lives* | **the practitioner**, often orthodox, who seeks connection and authentic guidance and looks to the Ṛgveda for it | strongly Hindu vocabulary, deeply connective to observance. Names the sampradāyas. |
| **bottom** | `disagreements` — *how it has been read* | **the analytical reader** — linguistic, historical, comparative | analytical, not religious. Dry, and allowed to be slightly irreverent. |

### What each lens must NOT contain

- **Lens 1 carries no grammatical apparatus.** No case names, no verbal roots, no
  "subjunctive", no discussion of which reading the accusative permits. This is the most
  frequent failure and it is seductive, because the grammar is often where the best finding
  is. The finding still belongs — in lens 3. Lens 1 says what the hymn *says*.
- **Lens 2 carries no Western scholarship.** Not Wilson, not Griffith, not Eggeling, not
  Geldner, not an SBE volume number. A practitioner reading for guidance is stopped cold by a
  nineteenth-century translator's name in the middle of a paragraph about sandhyāvandana.
  Where a source we hold is in fact an English rendering, **say so in lens 3** — the caveat is
  owed, but it is owed there.
- **Lens 3 is the only place any of that appears**, and the only place the grammar is worked.
  Scholarly vocabulary that is banned above — strata, redaction, relative dating, and the
  outside categories — is permitted here **as the scholars' own**, attributed, not adopted.

### What lens 2 SHOULD reach for

The whole dharmic corpus, wherever it speaks to the sūkta at hand: the Brāhmaṇas and
Upaniṣads, the **Bhagavad Gītā**, the dharmaśāstra, the sampradāyas — **Mīmāṃsā**,
**Vedānta**, **Ārya Samāj**, the devotional lineages — and living observance: the
pañca-mahāyajñas, sandhyāvandana, the saṃskāras, agnihotra and havan, the āśramas.

Cite them for **where they stand on a question, never as a development of it** — the
no-chronology rule is not suspended because the text is post-saṃhitā. And **where the wider
tradition presses back, say so.** RV 1.1 asks for wealth, and the Gītā calls a yajña offered
with an eye on its fruit *rājasa* (17.11–12). A practitioner has met that objection already;
answering it honestly is the service, and hiding it is what makes a manual untrustworthy.

## ⭐ We give voice to many traditions and adjudicate between none

The Ṛgveda is read by several living traditions and by scholars who disagree with all
of them. **All of them get a voice here. None of them gets the verdict.** This is not
neutrality for its own sake — it is the only honest way to make one manual serve
practitioners who do not read alike.

| tradition | reads the Veda as | how it enters the notes |
|---|---|---|
| **Mīmāṃsā** | injunction — a mantra means what it does in the yajña | chiefly through Sāyaṇa, whose bhāṣya is written from inside it; his ritual detail, derivations and Brāhmaṇa citations are first-rate material |
| **Vedānta** | knowledge — the saṃhitā read toward the upaniṣads | named and attributed, never adopted; the schools differ sharply among themselves and that is left standing |
| **Devotional** | address — someone is being spoken to, by name | this is the register of the primary text. The hymn says what it says, with nothing interposed |
| **Academic, insider** | Aurobindo's psychological reading, Dayānanda, Kapālī Śāstrī, modern Indian scholarship | a reading among readings — not privileged for being traditional, not discounted for it |
| **Academic, outsider** | philology and the European translations; strata, redaction, dating | two translations held verse by verse; chronological argument goes under `disagreements`, named |

Practical consequences, all of which are already rules below: **zero names in the
primary fields** and all attribution in `disagreements`; a genuine ambiguity is kept
rather than resolved; and where two witnesses diverge, that divergence is usually the
most informative thing available. Out of scope by decision: adjudicating the
civilizational and origins debate, or producing legitimacy for any camp in it.

The reader-facing statement of all this is `app/standards/page.tsx`, served at
`/standards`. **The two must not drift.** Change one, change the other.

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

**This rule holds across all three lenses; what varies is intensity, not stance.** Lens 1 is
welcoming rather than devotional — it is opening a door for someone who may know nothing, and
grandeur is conveyed by what the collection *is*, not by adjectives. Lens 2 is where the
religious register properly belongs and should be unmistakable. Lens 3 may be dry and
slightly irreverent, but irreverence is aimed at **readings, editors and translators** — never
at the text, the devas or the people who recite them.

The tell is whether the sentence *describes a hymn* or *says what the hymn says*:

| ❌ outside, reporting on it | ✅ inside, saying it |
|---|---|
| "that is the premise the hymn opens on" | "Agni is asked to carry" |
| "the reason the collection begins here" | "the Ṛgveda begins where contact begins" |
| "the rite is not merely a symbol" | "what is poured into Agni reaches the gods" |
| "a strange hymn, unlike anything around it" | say what it does; let the reader find it strange |
| "the redactors placed this here" | (belongs in `disagreements`) |

#### Say dharma. Not religion, not mythology.

These are not neutral words. **Religion** imports a category built to describe something
else and makes the tradition one instance of a comparative genus. **Mythology** decides, in
the act of naming, that the accounts are not true. **Pantheon**, **cult**, **belief system**,
**the faith** carry the same freight. None of them belongs in a manual a practitioner reads.

| ❌ | ✅ |
|---|---|
| Vedic religion is chiefly otherworldly | the Veda's dharma is chiefly otherworldly |
| the household-scale religion of the Veda | the household-scale dharma of the Veda |
| reconstruct the myth from these clauses | reconstruct the account from these clauses |
| appears in the mythology as a Dānava | appears in the purāṇic accounts as a Dānava |
| not the picture of a tidy pantheon | not a tidy ordering of the gods |
| it does not need translating into religion | it does not need translating into doctrine |

**Not banned:** *dharma*, *yajña*, *saṃskāra*, *śraddhā*, and the tradition's own vocabulary
throughout; and naming a specific account as an account — "the account of Prajāpati and his
daughter" is fine, "the Prajāpati myth" is not. Reporting that an outside reader holds a view
is also fine, so long as it is attributed as such and not adopted.

**Nor is yajña "fire worship."** Agni bears the offering; he is not its object, and the sūktas
are explicit about it. "Fire worship" is how the tradition was described from outside in the
nineteenth century. Write *the yajña — the offering made through fire*.

#### No presupposed chronology. Anywhere in the primary fields.

Do not write that a deity, word or practice **becomes**, **develops into**, **gives rise
to**, or is a **precursor of** anything. Do not call one part of the corpus *earlier* or
*later* than another, and do not treat the Ṛgveda as the origin from which the rest grew.

**This includes the four Vedas themselves. The Ṛgveda is the FIRST of the four, not the
oldest of them.** "Oldest" smuggles in a chronological ordering that is unproven and that the
tradition does not hold — the four are not four dated documents. *First* is the tradition's
own ordering and is simply true. This was caught in the opening sentence of RV 1.1, written
the same day the rule above was codified, which is a fair measure of how easy it is to miss.

Where a claim of antiquity is genuinely wanted — and it is, because the standing of this text
is part of what a newcomer needs — make it about **continuous recitation**, where the claim
is strong and checkable, and make it flatly rather than hedging: *the oldest poem anywhere
still recited today from memory, in the same words*. Not "among the oldest". The hedge buys
nothing and reads as apology.
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

- **ZERO names in lens 1.** No "Sāyaṇa notes", no "Wilson has", no "Griffith gives".
  Every such attribution goes to lens 3. Name-dropping in the body is what makes a
  manual read like a seminar. *Check your draft: the words Sāyaṇa, Wilson and
  Griffith must not appear in `synthesis`.*
  **Lens 2 is different**, and this is the one place the rule relaxes: naming the
  **sampradāyas and their ācāryas** — Mīmāṃsā, Vedānta, Ārya Samāj, Svāmī Dayānanda —
  and citing the dharmic corpus by name and verse (Gītā 4.28, Taittirīya Up. 1.11) is
  exactly what a practitioner came for. It is *Western* scholarship that is barred
  there, not attribution as such.
- **Every verse carries.** The commonest failure is spending three paragraphs on
  verses 1 and 9 and disposing of 2–8 in a clause. If a hymn has 12 verses, a reader
  should finish knowing what each of the 12 did.
- **⭐ SANSKRIT FORWARD, and the link does the explaining.** In `verse_notes` especially,
  the Sanskrit term **leads** and the English is apposition behind it. The old shape put it
  the wrong way round and the punch drained out:

  | ❌ English leads, term in a parenthesis | ✅ term leads, English supports, link goes deeper |
  |---|---|
  | the chief priest set at the head of the yajña (*purohita*) | he is [*purohita*](/topic/purohita) of the yajña, the one placed in front |
  | with the mind held on you (*dhiyā*) | [*dhiyā*](/topic/dhī), with the mind held on you |
  | the greatest giver of life's treasures (*ratnadhātama*) | he is [*ratnadhātama*](/topic/ratna), greatest giver of *ratna* |

  **Never** *minister*, *oblation*, *sacrifice*, *god*, *fire-worship*, *the Lord* — these
  flatten a word the reader already owns into a word from somebody else's tradition. A core
  term most Hindus already carry stays in Sanskrit: *agni*, *deva*, *yajña*, *purohita*,
  *hotā*, *ṛtvij*, *ṛta*, *dhī*, *namas*, *rayi*, *poṣa*, *yaśas*, *ratna*, *svasti*,
  *pitṛ*, *adhvara*, *kavi*, *kratu*, *satya*, *śravas*, *vīra*.

  Gloss lightly **once**, in apposition, then use the term bare. And **link it** — the topic
  page carries every occurrence across all ten maṇḍalas, so a careful reader has somewhere
  to go and the note does not have to teach the word. Check the lemma exists in
  `apparatus/topics/topics.json` before linking; a link to a page that 404s is worse than
  no link.

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
- **Write *devas*, not *gods*.** The English word carries Greco-Roman freight the Sanskrit
  does not, and the same rule applies as to *Viśvedevāḥ*: do not translate away a word the
  reader already has. Nor *divinity* — *devān* is accusative **plural** and is the thing Agni
  carries; an abstract singular cannot be conveyed, and RV [[1.1]].5 sets *devo devebhiḥ*,
  singular beside plural, in one line. The tradition's own statement of the unity is
  *ekaṃ sad viprā bahudhā vadanti* at RV 1.164.46 — it belongs where the text makes it, not
  imported into verses that do not.
  Leave Wilson's and Griffith's wording alone inside quotations.
- **Do not gloss a proper noun.** Write *Agni*, not "Agni, the fire" or "Agni, god of
  fire". Write *Vāyu*, not "Vāyu, the wind"; *Uṣas*, not "Uṣas, the dawn". The reader
  knows who these are, and re-explaining a name every time it appears is the written
  equivalent of talking slowly. Unpack a name **only** where the etymology is itself
  the point being made — e.g. *ṛtvij* as *ṛtu* + √yaj, because the claim is about
  timeliness. Ordinary epithets (*hotā*, *purohita*, *citrabhānu*) are still glossed
  once, since those are descriptions rather than names.
- **⭐ Do not read intent into ordinary grammar.** Before claiming a poet *placed* a word,
  check where that word normally sits. RV 1.2.9 was written up as putting *naḥ* second "and
  making the two of them ours before it even gives their names" — but *naḥ* is an enclitic
  and stands in second position in **597 of the 1,906 verses that carry it (31.3%)**, its
  commonest slot by far. That is Wackernagel's law, not the ṛṣi. The claim was false, and
  the sentence had gone convoluted trying to carry it — which is the reliable tell. **A
  reader saying "I don't understand this part" is usually right about more than the
  wording.** Word order, sandhi and enclitic placement all need a corpus count before they
  can bear an interpretation; the tools are here, so run it.

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

## Provenance: `machine` and `edited`

Every record carries a `kind`, and the badge and footnote key off it. **A note must never
claim review it has not had.**

| `kind` | badge | means |
|---|---|---|
| `machine` | machine-written | drafted, unreviewed. The footnote says the model did not read the Sanskrit and no traditional scholar has seen it. |
| `edited` | edited & reviewed | a human has read it against the sources and revised it, **and is named** in `editor` with a `reviewed` date. |

Promote a record to `edited` only when that is true of *that record*. It is not a project-wide
status and does not travel to neighbouring sūktas.

**State the sources precisely.** Sāyaṇa is held here as an **English digest** of the
Ṛgveda-bhāṣya spliced into wisdomlib's Wilson text — not as his Sanskrit. A note that says
"drawn from Sāyaṇa's Sanskrit commentary" claims a source we do not have. List what was
actually used, in `sources`.

## Honesty rules — these are not negotiable

1. **AI generates, tradition verifies.** Nothing here is a verified reading. Never
   write as though it were.
2. **Never invent content to fill a node.** If the occasion of a hymn is unclear from
   the evidence, say it is unclear. "We do not know from this" is a correct answer.
3. Do not resolve a genuine ambiguity into a confident answer. Where Sāyaṇa offers
   two derivations, keep both.
4. If Wilson and Griffith diverge, that divergence is usually the most informative
   thing available — record it in `disagreements` with both readings named.
